const router = require("express").Router();
const controller = require("./profitAndloss.controller");

router.get("/", controller.getProfitAndLoss);

module.exports = router;
