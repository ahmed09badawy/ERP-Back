const express = require("express");
const controller = require("./response.controller");

const router = express.Router();

router.get("/list", controller.getResponses);
router.get("/:module/:id", controller.getResponseDetails);

module.exports = router;
