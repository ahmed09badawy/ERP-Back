const express = require("express");
const controller = require("./purchaseInvoice.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("purchases", "purchase_invoices", "add"),
    controller.createPurchaseInvoice
);

router.get(
    "/list",
    permissionMiddleware("purchases", "purchase_invoices", "read"),
    controller.getPurchaseInvoices
);

router.get(
    "/:id",
    permissionMiddleware("purchases", "purchase_invoices", "read"),
    controller.getPurchaseInvoiceById
);

router.patch(
    "/update/:id",
    permissionMiddleware("purchases", "purchase_invoices", "edit"),
    controller.updatePurchaseInvoice
);

router.delete(
    "/delete/:id",
    permissionMiddleware("purchases", "purchase_invoices", "delete"),
    controller.deletePurchaseInvoice
);

module.exports = router;
