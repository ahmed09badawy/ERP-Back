const router = require("express").Router();
const controller = require("./dashboard.controller");

router.get("/", controller.getFleetDashboard);

module.exports = router;
