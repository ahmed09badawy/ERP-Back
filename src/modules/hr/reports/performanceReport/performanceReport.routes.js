const router = require("express").Router();
const controller = require("./performanceReport.controller");

router.get("/list", controller.getPerformanceReport);

module.exports = router;
