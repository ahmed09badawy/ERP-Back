const router = require("express").Router();
const controller = require("./kpi.controller");

router.get("/", controller.getFleetKPIs);

module.exports = router;
