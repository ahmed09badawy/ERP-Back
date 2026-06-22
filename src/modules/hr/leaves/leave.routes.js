const express = require("express");
const controller = require("./leave.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", controller.createLeave);
router.get("/list", controller.getLeaves);
router.get("/:id", controller.getLeaveById);
router.patch("/update/:id", controller.updateLeave);
router.delete("/delete/:id", controller.deleteLeave);

module.exports = router;
