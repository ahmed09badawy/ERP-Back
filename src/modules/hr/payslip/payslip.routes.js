const express = require("express");
const controller = require("./payslip.controller");

const router = express.Router();

router.post("/create", controller.createPayslip);
router.get("/list", controller.getAllPayslips);
router.get("/:id", controller.getPayslipById);
router.patch("/update/:id", controller.updatePayslip);
router.delete("/delete/:id", controller.deletePayslip);

module.exports = router;
