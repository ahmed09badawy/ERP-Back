const express = require("express");
const controller = require("./promotion.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("sales", "promotions", "add"),
    controller.createPromotion
);

router.get(
    "/list",
    permissionMiddleware("sales", "promotions", "read"),
    controller.getPromotions
);

router.get(
    "/:id",
    permissionMiddleware("sales", "promotions", "read"),
    controller.getPromotionById
);

router.patch(
    "/update/:id",
    permissionMiddleware("sales", "promotions", "edit"),
    controller.updatePromotion
);

router.delete(
    "/delete/:id",
    permissionMiddleware("sales", "promotions", "delete"),
    controller.deletePromotion
);

module.exports = router;
