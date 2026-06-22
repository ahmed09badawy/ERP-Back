const express = require("express");
const controller = require("./department.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("hr", "departments", "add"),
    controller.createDepartment
);

router.get(
    "/list",
    permissionMiddleware("hr", "departments", "read"),
    controller.getDepartments
);

router.get(
    "/:id",
    permissionMiddleware("hr", "departments", "read"),
    controller.getDepartmentById
);

router.patch(
    "/update/:id",
    permissionMiddleware("hr", "departments", "edit"),
    controller.updateDepartment
);

router.delete(
    "/delete/:id",
    permissionMiddleware("hr", "departments", "delete"),
    controller.deleteDepartment
);

module.exports = router;
