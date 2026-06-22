const express = require("express");
const controller = require("./salesSettings.controller");

const router = express.Router();

router.get("/list", controller.getSettings);
router.patch("/update", controller.updateSettings);

module.exports = router;
