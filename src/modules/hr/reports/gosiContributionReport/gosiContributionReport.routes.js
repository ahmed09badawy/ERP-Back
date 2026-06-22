const router = require("express").Router();
const controller = require("./gosiContributionReport.controller");

router.get("/list", controller.getGosiContributionReport);

module.exports = router;
