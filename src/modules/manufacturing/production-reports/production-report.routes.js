const express = require("express");
const controller = require("./production-report.controller");

const router = express.Router();

router.get("/list", controller.getProductionReports);

module.exports = router;
