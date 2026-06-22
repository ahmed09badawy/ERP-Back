const express = require("express");
const controller = require("./salesInvoice.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("sales", "invoices", "add"),
    controller.createSalesInvoice
);

router.get(
    "/list",
    permissionMiddleware("sales", "invoices", "read"),
    controller.getSalesInvoices
);

router.get(
    "/:id",
    permissionMiddleware("sales", "invoices", "read"),
    controller.getSalesInvoiceById
);

router.patch(
    "/update/:id",
    permissionMiddleware("sales", "invoices", "edit"),
    controller.updateSalesInvoice
);

router.delete(
    "/delete/:id",
    permissionMiddleware("sales", "invoices", "delete"),
    controller.deleteSalesInvoice
);

module.exports = router;
