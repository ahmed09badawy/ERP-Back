const router = require("express").Router();
const controller = require("./hiring.controller");

router.get("/list", controller.getHiringReport);

module.exports = router;
