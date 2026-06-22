const express = require("express");
const controller = require("./bankAccount.controller");

const router = express.Router();

router.post("/create", controller.createBankAccount);
router.get("/list", controller.getAllBankAccounts);
router.get("/:id", controller.getBankById);
router.patch("/update/:id", controller.updateBankAccount);
router.delete("/delete/:id", controller.deleteBankAccount);

module.exports = router;
