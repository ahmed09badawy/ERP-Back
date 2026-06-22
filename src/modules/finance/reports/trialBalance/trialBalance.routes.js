const router = require("express").Router();
const controller = require("./trialBalance.controller");

router.get("/", controller.getTrialBalance);

module.exports = router;
