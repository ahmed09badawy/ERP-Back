const express = require("express");
const controller = require("./work-in-progress.controller");

const router = express.Router();

router.post("/create", controller.createWip);
router.get("/list", controller.getAllWip);
router.get("/:id", controller.getWipById);
router.patch("/update/:id", controller.updateWip);
router.delete("/delete/:id", controller.deleteWip);

module.exports = router;
