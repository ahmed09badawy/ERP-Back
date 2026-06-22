const router = require("express").Router();
const controller = require("./vehicle.controller");

router.post("/create", controller.createVehicle);

router.get("/list", controller.getAllVehicles);

router.get("/:id", controller.getVehicleById);

router.patch("/update/:id", controller.updateVehicle);

router.delete("/delete/:id", controller.deleteVehicle);

module.exports = router;
