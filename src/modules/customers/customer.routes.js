const express = require("express");
const customerController = require("./customer.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("sales", "customers", "add"),
    customerController.createCustomer
);

router.get(
    "/list",
    permissionMiddleware("sales", "customers", "read"),
    customerController.getCustomers
);

router.get(
    "/:id",
    permissionMiddleware("sales", "customers", "read"),
    customerController.getCustomerById
);

router.patch(
    "/update/:id",
    permissionMiddleware("sales", "customers", "edit"),
    customerController.updateCustomer
);

router.patch(
    "/status/:id",
    permissionMiddleware("sales", "customers", "edit"),
    customerController.updateCustomerStatus
);

router.delete(
    "/delete/:id",
    permissionMiddleware("sales", "customers", "delete"),
    customerController.deleteCustomer
);

module.exports = router;
