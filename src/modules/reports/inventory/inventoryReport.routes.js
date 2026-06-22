const express = require("express");
const controller = require("./inventoryReport.controller");

const router = express.Router();

router.get("/list", controller.getInventoryReport);

module.exports = router;
