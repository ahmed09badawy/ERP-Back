const express = require("express");
const controller = require("./purchaseOrder.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("purchases", "purchase_orders", "add"),
    controller.createPurchaseOrder
);

router.get(
    "/list",
    permissionMiddleware("purchases", "purchase_orders", "read"),
    controller.getPurchaseOrders
);

router.get(
    "/:id",
    permissionMiddleware("purchases", "purchase_orders", "read"),
    controller.getPurchaseOrderById
);

router.patch(
    "/update/:id",
    permissionMiddleware("purchases", "purchase_orders", "edit"),
    controller.updatePurchaseOrder
);

router.delete(
    "/delete/:id",
    permissionMiddleware("purchases", "purchase_orders", "delete"),
    controller.deletePurchaseOrder
);

module.exports = router;
