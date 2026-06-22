const express = require("express");
const router = express.Router();

const controller = require("./depreciation.controller");

router.post("/create", controller.createDepreciation);
router.get("/list", controller.getAllDepreciations);
router.get("/:id", controller.getDepreciationById);
router.patch("/update/:id", controller.updateDepreciation);
router.delete("/delete/:id", controller.deleteDepreciation);

module.exports = router;
