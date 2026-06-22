const express = require("express");
const controller = require("../../inventoryModule/products/product.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("inventory", "products", "add"),
    controller.createProduct
);

router.get(
    "/list",
    permissionMiddleware("inventory", "products", "read"),
    controller.getProducts
);

router.get(
    "/:id",
    permissionMiddleware("inventory", "products", "read"),
    controller.getProductById
);

router.patch(
    "/update/:id",
    permissionMiddleware("inventory", "products", "edit"),
    controller.updateProduct
);

router.delete(
    "/delete/:id",
    permissionMiddleware("inventory", "products", "delete"),
    controller.deleteProduct
);

module.exports = router;
