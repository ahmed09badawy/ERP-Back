const express = require("express");
const controller = require("./income.controller");

const router = express.Router();

router.post("/create", controller.createIncome);
router.get("/list", controller.getAllIncome);
router.get("/:id", controller.getIncomeById);
router.patch("/update/:id", controller.updateIncome);
router.delete("/delete/:id", controller.deleteIncome);

module.exports = router;
