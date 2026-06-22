const express = require("express");
const controller = require("./coa.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("finance", "coa", "add"),
    controller.createCoa
);

router.get(
    "/list",
    permissionMiddleware("finance", "coa", "read"),
    controller.getAllCoa
);

router.get(
    "/:id",
    permissionMiddleware("finance", "coa", "read"),
    controller.getCoaById
);

router.patch(
    "/update/:id",
    permissionMiddleware("finance", "coa", "edit"),
    controller.updateCoa
);

router.delete(
    "/delete/:id",
    permissionMiddleware("finance", "coa", "delete"),
    controller.deleteCoa
);

module.exports = router;
