const express = require("express");
const controller = require("./exchangeRate.controller");

const router = express.Router();

router.post("/create", controller.createRate);
router.get("/list", controller.getRates);

module.exports = router;
