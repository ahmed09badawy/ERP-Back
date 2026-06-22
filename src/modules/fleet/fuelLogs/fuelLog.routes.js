const router = require("express").Router();
const controller = require("./fuelLog.controller");

router.post("/create", controller.createFuelLog);
router.get("/list", controller.getAllFuelLogs);
router.get("/:id", controller.getFuelLogById);
router.patch("/update/:id", controller.updateFuelLog);
router.delete("/delete/:id", controller.deleteFuelLog);

module.exports = router;
