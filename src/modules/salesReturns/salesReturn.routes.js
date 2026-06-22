const express = require("express");
const controller = require("./salesReturn.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("sales", "sales_returns", "add"),
    controller.createSalesReturn
);

router.get(
    "/list",
    permissionMiddleware("sales", "sales_returns", "read"),
    controller.getSalesReturns
);

router.get(
    "/:id",
    permissionMiddleware("sales", "sales_returns", "read"),
    controller.getSalesReturnById
);

router.patch(
    "/update/:id",
    permissionMiddleware("sales", "sales_returns", "edit"),
    controller.updateSalesReturn
);

router.delete(
    "/delete/:id",
    permissionMiddleware("sales", "sales_returns", "delete"),
    controller.deleteSalesReturn
);

module.exports = router;
