const express = require("express");
const controller = require("./loan.controller");

const router = express.Router();

router.post("/create", controller.createLoan);
router.get("/list", controller.getAllLoans);
router.get("/:id", controller.getLoanById);
router.patch("/update/:id", controller.updateLoan);
router.delete("/delete/:id", controller.deleteLoan);

module.exports = router;
