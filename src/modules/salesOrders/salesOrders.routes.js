const express = require("express");
const controller = require("./salesOrders.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("sales", "orders", "add"),
    controller.createSalesOrder
);

router.get(
    "/list",
    permissionMiddleware("sales", "orders", "read"),
    controller.getSalesOrders
);

router.get(
    "/:id",
    permissionMiddleware("sales", "orders", "read"),
    controller.getSalesOrderById
);

router.patch(
    "/update/:id",
    permissionMiddleware("sales", "orders", "edit"),
    controller.updateSalesOrder
);

router.delete(
    "/delete/:id",
    permissionMiddleware("sales", "orders", "delete"),
    controller.deleteSalesOrder
);

module.exports = router;
