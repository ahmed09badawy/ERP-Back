const express = require("express");
const controller = require("./initial-training.controller");

const router = express.Router();

router.post("/create", controller.createInitialTraining);
router.get("/list", controller.getAllInitialTrainings);
router.get("/:id", controller.getInitialTrainingById);
router.patch("/update/:id", controller.updateInitialTraining);
router.delete("/delete/:id", controller.deleteInitialTraining);

module.exports = router;
