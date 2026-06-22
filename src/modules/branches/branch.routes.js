const express = require("express");
const branchController = require("./branch.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", permissionMiddleware("user_management", "branches", "add"), branchController.createBranch);
router.get("/list", permissionMiddleware("user_management", "branches", "read"), branchController.getBranches);
router.get("/:id", permissionMiddleware("user_management", "branches", "read"), branchController.getBranchById);
router.patch("/update/:id", permissionMiddleware("user_management", "branches", "edit"), branchController.updateBranch);
router.patch("/:id/state", permissionMiddleware("user_management", "branches", "edit"), branchController.updateBranchState);
router.delete("/delete/:id", permissionMiddleware("user_management", "branches", "delete"), branchController.deleteBranch);

module.exports = router;
