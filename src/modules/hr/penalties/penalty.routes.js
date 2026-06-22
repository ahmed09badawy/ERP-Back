const express = require("express");
const controller = require("./penalty.controller");

const router = express.Router();

router.post("/create", controller.createPenalty);
router.get("/list", controller.getAllPenalties);
router.get("/:id", controller.getPenaltyById);
router.patch("/update/:id", controller.updatePenalty);
router.delete("/delete/:id", controller.deletePenalty);

module.exports = router;
