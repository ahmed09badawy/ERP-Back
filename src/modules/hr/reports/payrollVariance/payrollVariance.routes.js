const router = require("express").Router();
const controller = require("./payrollVariance.controller");

router.get("/list", controller.getPayrollVarianceReport);

module.exports = router;
