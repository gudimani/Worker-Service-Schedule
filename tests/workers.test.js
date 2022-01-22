const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const knex = require("../models/db");
chai.use(chaiHttp);

describe("GET /shifts/:id", () => {
  before(() =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .catch((error) => console.log(error))
  );

  after(() => knex.migrate.rollback().catch((error) => console.log(error)));

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
      .get("/shifts/480808")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("/shifts/:id should fail with status 400 Bad Request", (done) => {
    chai
      .request(server)
      .get("/shifts/abc")
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("GET /workers", () => {
  before(() =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .catch((error) => console.log(error))
  );

  after(() => knex.migrate.rollback().catch((error) => console.log(error)));

  it("/workers should be successfull with 200 OK", (done) => {
    chai
      .request(server)
      .get("/workers")
      .end((err, res) => {
        should.not.exist(err);
        const resObj = [
          {
            firstname: "Pavitra",
            lastname: "LG",
            id: 1,
          },
          {
            firstname: "John",
            lastname: "Milo",
            id: 2,
          },
          {
            firstname: "Michael",
            lastname: "Kors",
            id: 3,
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
  before(() =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .catch((error) => console.log(error))
  );

  after(() => knex.migrate.rollback().catch((error) => console.log(error)));

  it("/update/id should be successful with status 201 created", (done) => {
    chai
      .request(server)
      .patch("/update/1")
      .send({ date: "2022-01-21", shift: "Night" })
      .end((err, res) => {
        should.not.exist(err);
        const resObj = {
          shift: "Night",
          worker_id: 1,
        };
        res.should.have.status(201);
        res.body.should.be.eql(resObj);
        done();
      });
  });

  it("/update/id should fail with status 404 Not found", (done) => {
    chai
      .request(server)
      .patch("/update/8809")
      .send({ date: "2022-01-21", shift: "Night" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("/update/id should fail with 400 Bad Request", (done) => {
    chai
      .request(server)
      .patch("/update/abc")
      .send({ date: "2022-01-21", shift: "Night" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("/update/id should fail with 400 Bad Request", (done) => {
    chai
      .request(server)
      .patch("/update/2")
      .send({ date: "2022-01", shift: "Morning" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("/update/id should fail with 400 Bad Request", (done) => {
    chai
      .request(server)
      .patch("/update/2")
      .send({ date: "2022-01-21", shift: "xyz" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("/update/id should fail with 400 Bad Request", (done) => {
    chai
      .request(server)
      .patch("/update/2")
      .send({ date: "2022-01", shift: "xyz" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("GET /timesheet/:date", () => {
  before(() =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .catch((error) => console.log(error))
  );

  after(() => knex.migrate.rollback().catch((error) => console.log(error)));

  it("/timesheet/:date should be successful with status 200 OK", (done) => {
    chai
      .request(server)
      .get("/timesheet/2022-01-17")
      .end((err, res) => {
        should.not.exist(err);
        const resObj = [
          {
            id: 1,
            firstname: "Pavitra",
            lastname: "LG",
            shift: "Morning",
            date: "2022-01-20T23:00:00.000Z",
          },
          {
            id: 1,
            firstname: "Pavitra",
            lastname: "LG",
            shift: "Morning",
            date: "2022-01-19T23:00:00.000Z",
          },
          {
            id: 1,
            firstname: "Pavitra",
            lastname: "LG",
            shift: "Morning",
            date: "2022-01-18T23:00:00.000Z",
          },
          {
            id: 1,
            firstname: "Pavitra",
            lastname: "LG",
            shift: "Morning",
            date: "2022-01-17T23:00:00.000Z",
          },
          {
            id: 1,
            firstname: "Pavitra",
            lastname: "LG",
            shift: "Morning",
            date: "2022-01-16T23:00:00.000Z",
          },
          {
            id: 2,
            firstname: "John",
            lastname: "Milo",
            shift: "Afternoon",
            date: "2022-01-20T23:00:00.000Z",
          },
          {
            id: 2,
            firstname: "John",
            lastname: "Milo",
            shift: "Afternoon",
            date: "2022-01-19T23:00:00.000Z",
          },
          {
            id: 2,
            firstname: "John",
            lastname: "Milo",
            shift: "Afternoon",
            date: "2022-01-18T23:00:00.000Z",
          },
          {
            id: 2,
            firstname: "John",
            lastname: "Milo",
            shift: "Afternoon",
            date: "2022-01-17T23:00:00.000Z",
          },
          {
            id: 2,
            firstname: "John",
            lastname: "Milo",
            shift: "Afternoon",
            date: "2022-01-16T23:00:00.000Z",
          },
          {
            id: 3,
            firstname: "Michael",
            lastname: "Kors",
            shift: "Night",
            date: "2022-01-20T23:00:00.000Z",
          },
          {
            id: 3,
            firstname: "Michael",
            lastname: "Kors",
            shift: "Night",
            date: "2022-01-19T23:00:00.000Z",
          },
          {
            id: 3,
            firstname: "Michael",
            lastname: "Kors",
            shift: "Night",
            date: "2022-01-18T23:00:00.000Z",
          },
          {
            id: 3,
            firstname: "Michael",
            lastname: "Kors",
            shift: "Night",
            date: "2022-01-17T23:00:00.000Z",
          },
          {
            id: 3,
            firstname: "Michael",
            lastname: "Kors",
            shift: "Night",
            date: "2022-01-16T23:00:00.000Z",
          },
        ];
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.should.be.eql(resObj);
        done();
      });
  });
  it("/timesheet/:date should fail with 400 Bad Request", (done) => {
    chai
      .request(server)
      .get("/timesheet/2022-01-")
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("POST /schedule", () => {
  before(() =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .catch((error) => console.log(error))
  );

  after(() => knex.migrate.rollback().catch((error) => console.log(error)));

  it("/schedule should fail with status 400 bad request", (done) => {
    chai
      .request(server)
      .post("/schedule")
      .send([
        {
          date: "2022-01",
          worker_id: 2,
          shift: "Morning",
        },
      ])
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("/schedule should fail with status 400 bad request", (done) => {
    chai
      .request(server)
      .post("/schedule")
      .send([
        {
          date: "2022-01-21",
          worker_id: 134,
          shift: "Morning",
        },
      ])
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("/schedule should fail with status 400 bad request", (done) => {
    chai
      .request(server)
      .post("/schedule")
      .send([
        {
          date: "2022-01-21",
          worker_id: 2,
          shift: "yz",
        },
      ])
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("/schedule should fail with status 500 Server error", (done) => {
    chai
      .request(server)
      .post("/schedule")
      .send([
        {
          date: "2022-01",
          worker_id: "abc",
          shift: "Mor",
        },
      ])
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
  it("/schedule should be successful with status 201 created", (done) => {
    chai
      .request(server)
      .post("/schedule")
      .send([
        {
          date: "2022-01-25",
          worker_id: 3,
          shift: "Absent",
        },
      ])
      .end((err, res) => {
        should.not.exist(err);
        const resObj = [
          {
            worker_id: 3,
          },
        ];
        res.should.have.status(201);
        res.body.should.be.eql(resObj);
        done();
      });
  });

  it("/schedule should fail with status 500 Server error", (done) => {
    chai
      .request(server)
      .post("/schedule")
      .send([
        {
          date: "2022-01-25",
          worker_id: 3,
          shift: "Night",
        },
        {
          date: "2022-01-25",
          worker_id: 3,
          shift: "Morning",
        },
      ])
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});
