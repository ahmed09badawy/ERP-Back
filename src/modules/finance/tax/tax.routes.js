const express = require("express");
const controller = require("./tax.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("finance", "taxes", "add"),
    controller.createTax
);

router.get(
    "/list",
    permissionMiddleware("finance", "taxes", "read"),
    controller.getAllTaxes
);

router.get(
    "/:id",
    permissionMiddleware("finance", "taxes", "read"),
    controller.getTaxById
);

router.patch(
    "/update/:id",
    permissionMiddleware("finance", "taxes", "edit"),
    controller.updateTax
);

router.delete(
    "/delete/:id",
    permissionMiddleware("finance", "taxes", "delete"),
    controller.deleteTax
);

module.exports = router;
