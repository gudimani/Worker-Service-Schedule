const express = require("express");
const router = express.Router();
const {
  getWorkersList,
  getSingleWorkerShift,
  allocateShift,
  updateShift,
  getWeekSchedule,
} = require("../controllers/workers.controller");

router.route("/workers").get(getWorkersList);

router.route("/shifts/:id").get(getSingleWorkerShift);

router.route("/schedule").post(allocateShift);

router.route("/update/:id").patch(updateShift);

router.route("/timesheet/:date").get(getWeekSchedule);

module.exports = router;
