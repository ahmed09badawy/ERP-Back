const router = require("express").Router();
const controller = require("./turnoverReport.controller");

router.get("/list", controller.getTurnoverReport);

module.exports = router;
