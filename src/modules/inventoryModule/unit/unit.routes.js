const express = require("express");
const controller = require("./unit.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("inventory", "units", "add"),
    controller.createUnit
);

router.get(
    "/list",
    permissionMiddleware("inventory", "units", "read"),
    controller.getUnits
);

router.get(
    "/:id",
    permissionMiddleware("inventory", "units", "read"),
    controller.getUnitById
);

router.patch(
    "/update/:id",
    permissionMiddleware("inventory", "units", "edit"),
    controller.updateUnit
);

router.delete(
    "/delete/:id",
    permissionMiddleware("inventory", "units", "delete"),
    controller.deleteUnit
);

module.exports = router;
