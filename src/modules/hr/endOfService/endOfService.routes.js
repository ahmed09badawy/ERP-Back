const express = require("express");
const controller = require("./endOfService.controller");

const router = express.Router();

router.post("/create", controller.createEndOfService);
router.get("/list", controller.getAllEndOfServices);
router.get("/:id", controller.getEndOfServiceById);
router.patch("/update/:id", controller.updateEndOfService);
router.delete("/delete/:id", controller.deleteEndOfService);

module.exports = router;
