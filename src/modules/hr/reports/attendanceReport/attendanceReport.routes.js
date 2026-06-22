const router = require("express").Router();
const controller = require("./attendanceReport.controller");

router.get("/list", controller.getAttendanceReport);

module.exports = router;
