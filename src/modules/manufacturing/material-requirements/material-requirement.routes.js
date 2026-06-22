const express = require("express");
const controller = require("./material-requirement.controller");

const router = express.Router();

router.post("/create", controller.createMaterialRequirement);
router.get("/list", controller.getAllMaterialRequirements);
router.get("/:id", controller.getMaterialRequirementById);
router.patch("/update/:id", controller.updateMaterialRequirement);
router.delete("/delete/:id", controller.deleteMaterialRequirement);

module.exports = router;
