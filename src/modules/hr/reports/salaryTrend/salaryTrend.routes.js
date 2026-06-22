const router = require("express").Router();
const controller = require("./salaryTrend.controller");

router.get("/list", controller.getSalaryTrendReport);

module.exports = router;
