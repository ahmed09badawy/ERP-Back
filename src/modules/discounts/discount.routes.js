const express = require("express");
const controller = require("./discount.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("sales", "discounts", "add"),
    controller.createDiscount
);

router.get(
    "/list",
    permissionMiddleware("sales", "discounts", "read"),
    controller.getDiscounts
);

router.get(
    "/:id",
    permissionMiddleware("sales", "discounts", "read"),
    controller.getDiscountById
);

router.patch(
    "/update/:id",
    permissionMiddleware("sales", "discounts", "edit"),
    controller.updateDiscount
);

router.delete(
    "/delete/:id",
    permissionMiddleware("sales", "discounts", "delete"),
    controller.deleteDiscount
);

module.exports = router;
