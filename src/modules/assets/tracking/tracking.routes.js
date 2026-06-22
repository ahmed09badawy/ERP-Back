const express = require("express");
const router = express.Router();

const trackingController = require("./tracking.controller");

router.post("/create", trackingController.createTracking);
router.get("/list", trackingController.getAllTrackings);
router.get("/:id", trackingController.getTrackingById);
router.patch("/update/:id", trackingController.updateTracking);
router.delete("/delete/:id", trackingController.deleteTracking);

module.exports = router;
