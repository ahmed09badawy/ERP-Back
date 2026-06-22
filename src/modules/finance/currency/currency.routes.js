const express = require("express");
const controller = require("./currency.controller");

const router = express.Router();

router.post("/create", controller.createCurrency);
router.get("/list", controller.getAllCurrencies);
router.get("/:id", controller.getCurrencyById);
router.patch("/update/:id", controller.updateCurrency);
router.delete("/delete/:id", controller.deleteCurrency);

module.exports = router;
