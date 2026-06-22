const router = require("express").Router();
const controller = require("./costCenter.controller");

router.post("/create", controller.createCostCenter);
router.get("/list", controller.getAllCostCenters);
router.get("/:id", controller.getCostCenterById);
router.patch("/update/:id", controller.updateCostCenter);
router.delete("/delete/:id", controller.deleteCostCenter);

module.exports = router;
