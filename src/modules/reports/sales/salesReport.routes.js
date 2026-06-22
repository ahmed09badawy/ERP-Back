const express = require("express");
const controller = require("./salesReport.controller");

const router = express.Router();

router.get("/list", controller.getSalesReport);

module.exports = router;
