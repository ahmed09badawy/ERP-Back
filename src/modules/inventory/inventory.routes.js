const express = require("express");
const inventoryController = require("./inventory.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("inventory", "stock", "add"),
    inventoryController.createInventory
);

router.get(
    "/list",
    permissionMiddleware("inventory", "stock", "read"),
    inventoryController.getInventories
);

router.get(
    "/:id",
    permissionMiddleware("inventory", "stock", "read"),
    inventoryController.getInventoryById
);

router.patch(
    "/update/:id",
    permissionMiddleware("inventory", "stock", "edit"),
    inventoryController.updateInventory
);

router.delete(
    "/delete/:id",
    permissionMiddleware("inventory", "stock", "delete"),
    inventoryController.deleteInventory
);

module.exports = router;
