const express = require("express");
const setupController = require("./setup.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const adminMiddleware = require("../../middlewares/admin.middleware");

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.post("/seeding", setupController.bootstrapSystem);

module.exports = router;
