const express = require("express");
const controller = require("./bill-of-materials.controller");

const router = express.Router();

router.post("/create", controller.createBillOfMaterials);
router.get("/list", controller.getAllBillOfMaterials);
router.get("/:id", controller.getBillOfMaterialsById);
router.patch("/update/:id", controller.updateBillOfMaterials);
router.delete("/delete/:id", controller.deleteBillOfMaterials);

module.exports = router;
