const router = require("express").Router();
const controller = require("./employeeSummaryReport.controller");

router.get("/list", controller.getEmployeeSummaryReport);

module.exports = router;
