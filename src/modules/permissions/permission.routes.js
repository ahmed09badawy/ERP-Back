const express = require("express");
const permissionController = require("./permission.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

// Get permissions for a role
router.get("/list/:roleId", permissionController.getRolePermissions);

// Set or update permission for a role
router.post("/create/:roleId", permissionController.setRolePermission);

// Delete a specific permission record
router.delete("/delete/:id", permissionController.deleteRolePermission);

module.exports = router;
