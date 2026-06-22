const express = require("express");
const controller = require("./purchaseReport.controller");

const router = express.Router();

router.get("/list", controller.getPurchaseReport);

module.exports = router;
