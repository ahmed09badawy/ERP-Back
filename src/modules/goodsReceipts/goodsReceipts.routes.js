const express = require("express");
const controller = require("./goodsReceipts.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("purchases", "goods_receipts", "add"),
    controller.createGoodsReceipt
);

router.get(
    "/list",
    permissionMiddleware("purchases", "goods_receipts", "read"),
    controller.getGoodsReceipts
);

router.get(
    "/:id",
    permissionMiddleware("purchases", "goods_receipts", "read"),
    controller.getGoodsReceiptById
);

router.patch(
    "/update/:id",
    permissionMiddleware("purchases", "goods_receipts", "edit"),
    controller.updateGoodsReceipt
);

router.delete(
    "/delete/:id",
    permissionMiddleware("purchases", "goods_receipts", "delete"),
    controller.deleteGoodsReceipt
);

module.exports = router;
