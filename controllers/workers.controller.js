const client = require("../connection");
const Joi = require("joi");

// All the workers list
const getWorkersList = async (req, res) => {
  try {
    const workers = await client.query("select * from workers");
    res.status(200).send(workers.rows);
  } catch (error) {
    res.send(error.message);
  }
};

//get single users shift details
const getSingleWorkerShift = async (req, res) => {
  const id = req.params.id;
  const schemaId = Joi.number().required();
  const schemaResults = schemaId.validate(id);
  if (schemaResults.error) {
    return res.status(400).send("Provide valid worker id");
  }
  try {
    const results = await client.query(
      "select exists (select * from schedule where worker_id = $1 limit 1)",
      [id]
    );
    if (!results.rows[0].exists) {
      throw new Error("No worker found with id: " + id);
    }

    const shiftResult = await client.query(
      "select * from schedule where worker_id =$1",
      [id]
    );
    res.status(200).send(shiftResult.rows);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

//allocate shift
const allocateShift = async (req, res) => {
  try {
    let result = [];
    for (i = 0; i < req.body.length; i++) {
      const date = req.body[i].date;
      const worker_id = req.body[i].worker_id;
      const shift = req.body[i].shift;

      const searchWorker = await client.query(
        "select exists (select 1 from workers where  id=$1 limit 1)",
        [worker_id]
      );
      if (!searchWorker.rows[0].exists) {
        return res.status(400).send("Worker is not in company");
      }
      const schema = Joi.object({
        date: Joi.string()
          .pattern(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
          .required(),
        worker_id: Joi.number().required(),
        shift: Joi.string()
          .valid("Morning", "Afternoon", "Night", "Absent")
          .required(),
      });
      const schemaResults = schema.validate({
        date: date,
        worker_id: worker_id,
        shift: shift,
      });
      if (schemaResults.error) {
        return res
          .status(400)
          .send("Provide valid date, worker_id and shift values");
      }
      const shiftExists = await client.query(
        "select exists (select 1 from schedule where date=$1 and worker_id =$2 limit 1)",
        [date, worker_id]
      );

      await client.query("BEGIN");
      if (!shiftExists.rows[0].exists) {
        const row = await client.query(
          `insert into schedule (date, shift, worker_id) values ($1, $2, $3) returning worker_id`,
          [date, shift, worker_id]
        );
        result.push(row.rows[0]);
      } else {
        throw new Error("Schedule already exists for " + worker_id);
      }
    }
    await client.query("COMMIT");

    res.status(201).send(result);
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).send(error.message);
  }
};

//update schedules
const updateShift = async (req, res) => {
  const id = req.params.id;
  const { date, shift } = req.body;
  const dateShiftSchema = Joi.object({
    date: Joi.string()
      .pattern(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
      .required(),
    shift: Joi.string()
      .valid("Morning", "Afternoon", "Night", "Absent")
      .required(),
    id: Joi.number().required(),
  });
  const schemaResults = dateShiftSchema.validate({
    date: date,
    shift: shift,
    id: id,
  });

  if (schemaResults.error) {
    return res.status(400).send("Provide valid id, date and shift values");
  }

  try {
    const results = await client.query(
      "select exists (select * from schedule where worker_id = $1 and date = $2 limit 1)",
      [id, date]
    );
    if (!results.rows[0].exists) {
      throw new Error(
        "No worker found with id: " + id + " scheduled on the date " + date
      );
    }

    const updatedResult = await client.query(
      "update schedule set shift = $1 where worker_id = $2 and date= $3 returning shift, worker_id",
      [shift, id, date]
    );
    res.status(201).send(updatedResult.rows[0]);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getWeekSchedule = async (req, res) => {
  const fromDate = req.params.date;
  console.log(typeof fromDate);
  const dateSchema = Joi.string()
    .pattern(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
    .required();

  const resultsOfDate = dateSchema.validate(fromDate);

  if (resultsOfDate.error) {
    return res.status(400).send("Invalid date");
  }

  try {
    const toDate = addDays(fromDate, 5);
    const weekShift = await client.query(
      `select "id", "firstname", "lastname", "shift", "date" from workers left join schedule on  id=worker_id where shift is not null and  (date >= $1 and date <=$2)`,
      [fromDate, toDate]
    );
    res.send(weekShift.rows);
  } catch (error) {
    res.send(error.message);
  }
};

function addDays(fromdate, days) {
  toDate = new Date(fromdate);
  toDate.setDate(toDate.getDate() + days);

  return toDate.toLocaleDateString();
}

module.exports = {
  getWorkersList,
  getSingleWorkerShift,
  allocateShift,
  updateShift,
  getWeekSchedule,
};
