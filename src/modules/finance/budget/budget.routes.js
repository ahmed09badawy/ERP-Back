const express = require("express");
const controller = require("./budget.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("finance", "budgets", "add"),
    controller.createBudget
);

router.get(
    "/list",
    permissionMiddleware("finance", "budgets", "read"),
    controller.getAllBudgets
);

router.get(
    "/:id",
    permissionMiddleware("finance", "budgets", "read"),
    controller.getBudgetById
);

router.patch(
    "/update/:id",
    permissionMiddleware("finance", "budgets", "edit"),
    controller.updateBudget
);

router.delete(
    "/delete/:id",
    permissionMiddleware("finance", "budgets", "delete"),
    controller.deleteBudget
);

module.exports = router;
