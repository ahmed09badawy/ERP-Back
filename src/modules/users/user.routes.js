const express = require("express");
const userController = require("./user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("user_management", "users", "add"),
    userController.createUser
);

router.get(
    "/list",
    permissionMiddleware("user_management", "users", "read"),
    userController.getUsers
);

router.get(
    "/:id",
    permissionMiddleware("user_management", "users", "read"),
    userController.getUserById
);

router.patch(
    "/update/:id",
    permissionMiddleware("user_management", "users", "edit"),
    userController.updateUser
);

router.patch(
    "/update/:id/state",
    permissionMiddleware("user_management", "users", "edit"),
    userController.updateUserState
);

router.delete(
    "/delete/:id",
    permissionMiddleware("user_management", "users", "delete"),
    userController.deleteUser
);

module.exports = router;
