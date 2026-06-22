const express = require("express");
const controller = require("./journal.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const permissionMiddleware = require("../../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/create",
    permissionMiddleware("finance", "journal", "add"),
    controller.createJournal
);

router.get(
    "/list",
    permissionMiddleware("finance", "journal", "read"),
    controller.getAllJournal
);

router.get(
    "/:id",
    permissionMiddleware("finance", "journal", "read"),
    controller.getJournalById
);

router.patch(
    "/update/:id",
    permissionMiddleware("finance", "journal", "edit"),
    controller.updateJournal
);

router.delete(
    "/delete/:id",
    permissionMiddleware("finance", "journal", "delete"),
    controller.deleteJournal
);

module.exports = router;
