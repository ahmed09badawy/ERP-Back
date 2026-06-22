const express = require("express");
const warehouseController = require("./warehouse.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("inventory", "warehouses", "add"),
    warehouseController.createWarehouse
);

router.get(
    "/list",
    permissionMiddleware("inventory", "warehouses", "read"),
    warehouseController.getWarehouses
);

router.get(
    "/:id",
    permissionMiddleware("inventory", "warehouses", "read"),
    warehouseController.getWarehouseById
);

router.patch(
    "/update/:id",
    permissionMiddleware("inventory", "warehouses", "edit"),
    warehouseController.updateWarehouse
);

router.patch(
    "/update/:id/state",
    permissionMiddleware("inventory", "warehouses", "edit"),
    warehouseController.updateWarehouseState
);

router.delete(
    "/delete/:id",
    permissionMiddleware("inventory", "warehouses", "delete"),
    warehouseController.deleteWarehouse
);

module.exports = router;
