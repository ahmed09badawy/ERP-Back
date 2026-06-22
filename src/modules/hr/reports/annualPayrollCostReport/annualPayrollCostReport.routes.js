const router = require("express").Router();
const controller = require("./annualPayrollCostReport.controller");

router.get("/list", controller.getAnnualPayrollCostReport);

module.exports = router;
