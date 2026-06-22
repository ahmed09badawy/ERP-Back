const router = require("express").Router();
const controller = require("./balanceSheet.controller");

router.get("/", controller.getBalanceSheet);

module.exports = router;
