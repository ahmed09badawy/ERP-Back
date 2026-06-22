const express = require("express");
const controller = require("./purchaseReturn.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("purchases", "returns_to_supplier", "add"),
    controller.createPurchaseReturn
);

router.get(
    "/list",
    permissionMiddleware("purchases", "returns_to_supplier", "read"),
    controller.getPurchaseReturns
);

router.get(
    "/:id",
    permissionMiddleware("purchases", "returns_to_supplier", "read"),
    controller.getPurchaseReturnById
);

router.patch(
    "/update/:id",
    permissionMiddleware("purchases", "returns_to_supplier", "edit"),
    controller.updatePurchaseReturn
);

router.delete(
    "/delete/:id",
    permissionMiddleware("purchases", "returns_to_supplier", "delete"),
    controller.deletePurchaseReturn
);

module.exports = router;
