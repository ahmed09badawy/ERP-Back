const router = require("express").Router();
const controller = require("./maintenance.controller");

router.post("/create", controller.createMaintenance);
router.get("/list", controller.getAllMaintenance);
router.get("/:id", controller.getMaintenanceById);
router.patch("/update/:id", controller.updateMaintenance);
router.delete("/delete/:id", controller.deleteMaintenance);

module.exports = router;
