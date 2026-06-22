const express = require("express");
const controller = require("./employee.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("hr", "employees", "add"),
    controller.createEmployee
);

router.get(
    "/list",
    permissionMiddleware("hr", "employees", "read"),
    controller.getEmployees
);

router.get(
    "/:id",
    permissionMiddleware("hr", "employees", "read"),
    controller.getEmployeeById
);

router.patch(
    "/update/:id",
    permissionMiddleware("hr", "employees", "edit"),
    controller.updateEmployee
);

router.delete(
    "/delete/:id",
    permissionMiddleware("hr", "employees", "delete"),
    controller.deleteEmployee
);

module.exports = router;
