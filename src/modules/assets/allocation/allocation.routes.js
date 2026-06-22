const express = require("express");
const router = express.Router();

const allocationController = require("./allocation.controller");

router.post("/create", allocationController.createAllocation);
router.get("/list", allocationController.getAllAllocations);
router.get("/:id", allocationController.getAllocationById);
router.patch("/update/:id", allocationController.updateAllocation);
router.delete("/delete/:id", allocationController.deleteAllocation);

module.exports = router;
