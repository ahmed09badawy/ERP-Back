const router = require("express").Router();
const controller = require("./vehicleExpense.controller");

router.post("/create", controller.createVehicleExpense);
router.get("/list", controller.getAllVehicleExpenses);
router.get("/:id", controller.getVehicleExpenseById);
router.patch("/update/:id", controller.updateVehicleExpense);
router.delete("/delete/:id", controller.deleteVehicleExpense);

module.exports = router;
