const express = require("express");
const controller = require("./work-center.controller");

const router = express.Router();

router.post("/create", controller.createWorkCenter);
router.get("/list", controller.getAllWorkCenters);
// router.get("/stats", controller.getWorkCenterStats);
router.get("/:id", controller.getWorkCenterById);
router.patch("/update/:id", controller.updateWorkCenter);
router.delete("/delete/:id", controller.deleteWorkCenter);

module.exports = router;
