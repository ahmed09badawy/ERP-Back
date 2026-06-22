const express = require("express");
const controller = require("./payroll.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("hr", "payroll", "add"),
    controller.createPayroll
);

router.get(
    "/list",
    permissionMiddleware("hr", "payroll", "read"),
    controller.getPayrolls
);

router.get(
    "/:id",
    permissionMiddleware("hr", "payroll", "read"),
    controller.getPayrollById
);

router.patch(
    "/update/:id",
    permissionMiddleware("hr", "payroll", "edit"),
    controller.updatePayroll
);

router.delete(
    "/delete/:id",
    permissionMiddleware("hr", "payroll", "delete"),
    controller.deletePayroll
);

module.exports = router;
