const express = require("express");
const controller = require("./pipeline.controller");

const router = express.Router();

router.post("/create", controller.createPipeline);
router.get("/list", controller.getAllPipelines);
router.get("/:id", controller.getPipelineById);
router.patch("/update/:id", controller.updatePipeline);
router.delete("/delete/:id", controller.deletePipeline);

module.exports = router;
