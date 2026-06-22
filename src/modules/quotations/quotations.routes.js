const express = require("express");
const controller = require("./quotations.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("sales", "quotations", "add"),
    controller.createQuotation
);

router.get(
    "/list",
    permissionMiddleware("sales", "quotations", "read"),
    controller.getQuotations
);

router.get(
    "/:id",
    permissionMiddleware("sales", "quotations", "read"),
    controller.getQuotationById
);

router.patch(
    "/update/:id",
    permissionMiddleware("sales", "quotations", "edit"),
    controller.updateQuotation
);

router.delete(
    "/delete/:id",
    permissionMiddleware("sales", "quotations", "delete"),
    controller.deleteQuotation
);

module.exports = router;
