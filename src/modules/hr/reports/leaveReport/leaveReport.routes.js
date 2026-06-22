const router = require("express").Router();
const controller = require("./leaveReport.controller");

router.get("/list", controller.getLeaveReport);

module.exports = router;
