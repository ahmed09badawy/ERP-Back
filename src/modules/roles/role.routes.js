const express = require("express");
const roleController = require("./role.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("user_management", "roles", "add"),
    roleController.createRole
);

router.get(
    "/list",
    permissionMiddleware("user_management", "roles", "read"),
    roleController.getRoles
);

router.get(
    "/:id",
    permissionMiddleware("user_management", "roles", "read"),
    roleController.getRoleById
);

router.patch(
    "/update/:id",
    permissionMiddleware("user_management", "roles", "edit"),
    roleController.updateRole
);

router.patch(
    "/update/:id/state",
    permissionMiddleware("user_management", "roles", "edit"),
    roleController.updateRoleState
);

router.delete(
    "/delete/:id",
    permissionMiddleware("user_management", "roles", "delete"),
    roleController.deleteRole
);

module.exports = router;
