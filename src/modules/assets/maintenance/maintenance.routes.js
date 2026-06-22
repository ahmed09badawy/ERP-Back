const express = require("express");
const router = express.Router();

const maintenanceController = require("./maintenance.controller");

router.post("/create", maintenanceController.createMaintenance);
router.get("/list", maintenanceController.getAllMaintenances);
router.get("/:id", maintenanceController.getMaintenanceById);
router.patch("/update/:id", maintenanceController.updateMaintenance);
router.delete("/delete/:id", maintenanceController.deleteMaintenance);

module.exports = router;
