const express = require("express");
const authController = require("./auth.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/register-admin", authController.registerAdmin);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.me);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
