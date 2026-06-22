const express = require("express");
const controller = require("./insurancePolicy.controller");

const router = express.Router();

router.post("/create", controller.createInsurancePolicy);
router.get("/list", controller.getAllInsurancePolicies);
router.get("/:id", controller.getInsurancePolicyById);
router.patch("/update/:id", controller.updateInsurancePolicy);
router.delete("/delete/:id", controller.deleteInsurancePolicy);

module.exports = router;
