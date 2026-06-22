const router = require("express").Router();
const controller = require("./generalLedger.controller");

router.get("/", controller.getGeneralLedger);

module.exports = router;
