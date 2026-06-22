const express = require("express");
const controller = require("./purchaseRequest.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("purchases", "purchase_requests", "add"),
    controller.createPurchaseRequest
);

router.get(
    "/list",
    permissionMiddleware("purchases", "purchase_requests", "read"),
    controller.getPurchaseRequests
);

router.get(
    "/:id",
    permissionMiddleware("purchases", "purchase_requests", "read"),
    controller.getPurchaseRequestById
);

router.patch(
    "/update/:id",
    permissionMiddleware("purchases", "purchase_requests", "edit"),
    controller.updatePurchaseRequest
);

router.delete(
    "/delete/:id",
    permissionMiddleware("purchases", "purchase_requests", "delete"),
    controller.deletePurchaseRequest
);

module.exports = router;
