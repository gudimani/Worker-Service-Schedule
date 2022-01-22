const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");

// router.route('/shifts').get(getShiftTable)
// router.route('/workers').get(getWorkerList)
// router.route('/shifts/:id').get(getSingleUserShift)
// router.route('/schedule').post(allocateShift)
// router.route('/update/:id').patch(updateShift)
// router.route('/timesheet/:date').get(getWeekShift)

chai.use(chaiHttp);

describe("GET /shifts", () => {
  it("/shifts/:id should be successfull with status 200 OK", (done) => {
    chai
      .request(server)
      .get("/shifts/1")
      .end((err, res) => {
        should.not.exist(err);
        const resObj = [
          {
            date: "2022-01-16T23:00:00.000Z",
            shift: "Morning",
            worker_id: 1,
          },
          {
            date: "2022-01-17T23:00:00.000Z",
            shift: "Morning",
            worker_id: 1,
          },
          {
            date: "2022-01-18T23:00:00.000Z",
            shift: "Morning",
            worker_id: 1,
          },
          {
            date: "2022-01-19T23:00:00.000Z",
            shift: "Morning",
            worker_id: 1,
          },
          {
            date: "2022-01-20T23:00:00.000Z",
            shift: "Morning",
            worker_id: 1,
          },
          {
            date: "2022-01-21T23:00:00.000Z",
            shift: "Morning",
            worker_id: 1,
          },
        ];
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.should.be.eql(resObj);
        done();
      });
  });
  it("/shifts/:id should fail with status 404 Not found", (done) => {
    chai
      .request(server)
      .get("/shift/480808")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe("GET /workers", () => {
  it("/workers should be successfull with 200 OK", (done) => {
    chai
      .request(server)
      .get("/workers")
      .end((err, res) => {
        should.not.exist(err);
        const resObj = [
          {
            firstname: "Pavitra",
            lastname: "PG",
            id: 1,
          },
          {
            firstname: "Lingaraj",
            lastname: "LG",
            id: 2,
          },
          {
            firstname: "John",
            lastname: "Milo",
            id: 3,
          },
          {
            firstname: "Sanjay",
            lastname: "Ravi",
            id: 4,
          },
          {
            firstname: "Chethan",
            lastname: "Ingo",
            id: 5,
          },
          {
            firstname: "Pooja",
            lastname: "Narayanaa",
            id: 6,
          },
          {
            firstname: "Anusha",
            lastname: "SD",
            id: 7,
          },
          {
            firstname: "Suji",
            lastname: "S",
            id: 8,
          },
          {
            firstname: "Mary",
            lastname: "John",
            id: 9,
          },
          {
            firstname: "Alex",
            lastname: "Kat",
            id: 10,
          },
        ];
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.should.be.eql(resObj);
        done();
      });
  });
});

describe("PATCH /update/:id", () => {
  it("/update/id should be successful with status 200 OK", (done) => {
    chai
      .request(server)
      .patch("/update/3")
      .send({ date: "2022-01-21", shift: "Morning" })
      .end((err, res) => {
        should.not.exist(err);
        const resObj = {
          shift: "Morning",
          worker_id: 3,
        };
        res.should.have.status(200);
        res.body.should.be.eql(resObj);
        done();
      });
  });

  it("/update/id should fail with status 404 Not found", (done) => {
    chai
      .request(server)
      .patch("/update/8809")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
