const express = require("express");
const controller = require("./category.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("inventory", "categories", "add"),
    controller.createCategory
);

router.get(
    "/list",
    permissionMiddleware("inventory", "categories", "read"),
    controller.getCategories
);

router.get(
    "/:id",
    permissionMiddleware("inventory", "categories", "read"),
    controller.getCategoryById
);

router.patch(
    "/update/:id",
    permissionMiddleware("inventory", "categories", "edit"),
    controller.updateCategory
);

router.delete(
    "/delete/:id",
    permissionMiddleware("inventory", "categories", "delete"),
    controller.deleteCategory
);

module.exports = router;
