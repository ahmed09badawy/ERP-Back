const express = require("express");
const controller = require("./expenses.controller");

const router = express.Router();

router.post("/create", controller.createExpense);
router.get("/list", controller.getAllExpenses);
router.get("/:id", controller.getExpenseById);
router.patch("/update/:id", controller.updateExpense);
router.delete("/delete/:id", controller.deleteExpense);

module.exports = router;
