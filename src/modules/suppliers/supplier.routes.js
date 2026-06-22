const express = require("express");
const supplierController = require("./supplier.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("purchases", "suppliers", "add"),
    supplierController.createSupplier
);

router.get(
    "/list",
    permissionMiddleware("purchases", "suppliers", "read"),
    supplierController.getSuppliers
);

router.get(
    "/:id",
    permissionMiddleware("purchases", "suppliers", "read"),
    supplierController.getSupplierById
);

router.patch(
    "/update/:id",
    permissionMiddleware("purchases", "suppliers", "edit"),
    supplierController.updateSupplier
);

router.patch(
    "/update/:id/status",
    permissionMiddleware("purchases", "suppliers", "edit"),
    supplierController.updateSupplierStatus
);

router.delete(
    "/delete/:id",
    permissionMiddleware("purchases", "suppliers", "delete"),
    supplierController.deleteSupplier
);

module.exports = router;
