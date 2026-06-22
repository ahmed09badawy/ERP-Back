const router = require("express").Router();
const controller = require("./documentExpiryReport.controller");

router.get("/list", controller.getDocumentsExpiryReport);

module.exports = router;
