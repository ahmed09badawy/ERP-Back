const express = require("express");
const controller = require("./pricelist.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("crm", "contacts", "add"),
    controller.createPricelist
);

router.get(
    "/list",
    permissionMiddleware("crm", "contacts", "read"),
    controller.getAllPricelists
);

router.get(
    "/:id",
    permissionMiddleware("crm", "contacts", "read"),
    controller.getPricelistById
);

router.patch(
    "/update/:id",
    permissionMiddleware("crm", "contacts", "edit"),
    controller.updatePricelist
);

router.delete(
    "/delete/:id",
    permissionMiddleware("crm", "contacts", "delete"),
    controller.deletePricelist
);

module.exports = router;
