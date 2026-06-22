const express = require("express");
const controller = require("./assign-device.controller");

const router = express.Router();

router.post("/create", controller.createAssignDevice);
router.get("/list", controller.getAllAssignDevices);
router.get("/:id", controller.getAssignDeviceById);
router.patch("/update/:id", controller.updateAssignDevice);
router.delete("/delete/:id", controller.deleteAssignDevice);

module.exports = router;
