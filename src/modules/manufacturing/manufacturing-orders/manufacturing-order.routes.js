const express = require("express");
const controller = require("./manufacturing-order.controller");

const router = express.Router();

router.post("/create", controller.createManufacturingOrder);
router.get("/list", controller.getAllManufacturingOrders);
router.get("/:id", controller.getManufacturingOrderById);
router.patch("/update/:id", controller.updateManufacturingOrder);
router.delete("/delete/:id", controller.deleteManufacturingOrder);

module.exports = router;
