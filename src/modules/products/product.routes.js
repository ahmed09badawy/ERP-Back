const express = require("express");
const productController = require("./product.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("inventory", "products", "add"),
    productController.createProduct
);

router.get(
    "/list",
    permissionMiddleware("inventory", "products", "read"),
    productController.getProducts
);

router.get(
    "/:id",
    permissionMiddleware("inventory", "products", "read"),
    productController.getProductById
);

router.patch(
    "/update/:id",
    permissionMiddleware("inventory", "products", "edit"),
    productController.updateProduct
);

router.patch(
    "/status/:id",
    permissionMiddleware("inventory", "products", "edit"),
    productController.updateProductStatus
);

router.delete(
    "/delete/:id",
    permissionMiddleware("inventory", "products", "delete"),
    productController.deleteProduct
);

module.exports = router;
