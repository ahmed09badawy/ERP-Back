const express = require("express");
const companyController = require("./company.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", permissionMiddleware("user_management", "companies", "add"), companyController.createCompany);
router.get("/list", permissionMiddleware("user_management", "companies", "read"), companyController.getCompanies);
router.get("/:id", permissionMiddleware("user_management", "companies", "read"), companyController.getCompanyById);
router.patch("/update/:id", permissionMiddleware("user_management", "companies", "edit"), companyController.updateCompany);
router.delete("/delete/:id", permissionMiddleware("user_management", "companies", "delete"), companyController.deleteCompany);

module.exports = router;
