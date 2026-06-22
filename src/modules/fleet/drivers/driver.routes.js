const router = require("express").Router();
const controller = require("./driver.controller");

router.post("/create", controller.createDriver);

router.get("/list", controller.getAllDrivers);

router.get("/:id", controller.getDriverById);

router.patch("/update/:id", controller.updateDriver);

router.delete("/delete/:id", controller.deleteDriver);

module.exports = router;
