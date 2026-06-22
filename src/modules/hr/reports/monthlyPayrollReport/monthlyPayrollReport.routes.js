const router = require("express").Router();
const controller = require("./monthlyPayrollReport.controller");

router.get("/list", controller.getMonthlyPayrollReport);

module.exports = router;
