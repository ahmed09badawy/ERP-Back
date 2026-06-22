const express = require("express");
const controller = require("./deductions.controller");

const router = express.Router();

router.post("/create", controller.createDeduction);
router.get("/list", controller.getAllDeductions);
router.get("/:id", controller.getDeductionById);
router.patch("/update/:id", controller.updateDeduction);
router.delete("/delete/:id", controller.deleteDeduction);

module.exports = router;
