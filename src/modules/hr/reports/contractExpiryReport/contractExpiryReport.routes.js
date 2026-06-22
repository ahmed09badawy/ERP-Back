const router = require("express").Router();
const controller = require("./contractExpiryReport.controller");

router.get("/list", controller.getContractsExpiryReport);

module.exports = router;
