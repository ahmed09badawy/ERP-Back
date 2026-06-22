const router = require("express").Router();
const controller = require("./headcountGrowth.controller");

router.get("/list", controller.getHeadcountGrowthReport);

module.exports = router;
