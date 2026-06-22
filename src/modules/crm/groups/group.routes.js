const express = require("express");
const controller = require("./group.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("crm", "contacts", "add"),
    controller.createGroup
);

router.get(
    "/list",
    permissionMiddleware("crm", "contacts", "read"),
    controller.getAllGroups
);

router.get(
    "/:id",
    permissionMiddleware("crm", "contacts", "read"),
    controller.getGroupById
);

router.patch(
    "/update/:id",
    permissionMiddleware("crm", "contacts", "edit"),
    controller.updateGroup
);

router.delete(
    "/delete/:id",
    permissionMiddleware("crm", "contacts", "delete"),
    controller.deleteGroup
);

module.exports = router;
