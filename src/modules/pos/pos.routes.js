const express = require("express");
const controller = require("./pos.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/orders",
    permissionMiddleware("sales", "pos", "add"),
    controller.createPosOrder
);

router.get(
    "/orders",
    permissionMiddleware("sales", "pos", "read"),
    controller.getPosOrders
);

router.get(
    "/orders/:id",
    permissionMiddleware("sales", "pos", "read"),
    controller.getPosOrderById
);

router.post(
    "/orders/:id/items",
    permissionMiddleware("sales", "pos", "edit"),
    controller.addItem
);

router.patch(
    "/orders/:id/items/:itemId",
    permissionMiddleware("sales", "pos", "edit"),
    controller.updateItemQty
);

router.delete(
    "/orders/:id/items/:itemId",
    permissionMiddleware("sales", "pos", "edit"),
    controller.removeItem
);

router.post(
    "/orders/:id/discount",
    permissionMiddleware("sales", "pos", "edit"),
    controller.setDiscount
);

router.post(
    "/orders/:id/tax",
    permissionMiddleware("sales", "pos", "edit"),
    controller.setTax
);

router.post(
    "/orders/:id/shipping",
    permissionMiddleware("sales", "pos", "edit"),
    controller.setShipping
);

router.post(
    "/orders/:id/hold",
    permissionMiddleware("sales", "pos", "edit"),
    controller.holdOrder
);

router.post(
    "/orders/:id/cancel",
    permissionMiddleware("sales", "pos", "delete"),
    controller.cancelOrder
);

router.post(
    "/orders/:id/pay",
    permissionMiddleware("sales", "pos", "edit"),
    controller.payOrder
);

router.get(
    "/orders/:id/receipt",
    permissionMiddleware("sales", "pos", "read"),
    controller.getReceipt
);

module.exports = router;

