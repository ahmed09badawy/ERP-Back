const express = require("express");
const controller = require("./monthlyClosing.controller");

const router = express.Router();

router.post("/close", controller.closeMonth);
router.post("/reopen", controller.reopenMonth);
router.get("/list", controller.getAllClosings);

module.exports = router;
