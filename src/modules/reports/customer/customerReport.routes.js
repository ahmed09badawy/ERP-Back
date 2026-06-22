const express = require("express");
const controller = require("./customerReport.controller");

const router = express.Router();

router.get("/list", controller.getCustomerReport);

module.exports = router;
