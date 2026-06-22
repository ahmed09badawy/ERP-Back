const router = require("express").Router();
const controller = require("./accountPayablePayments.controller");

router.post("/create", controller.createAPPayment);
router.get("/list", controller.getAllAPPayments);
router.get("/:id", controller.getAPPaymentById);
router.patch("/update/:id", controller.updateAPPayment);
router.delete("/delete/:id", controller.deleteAPPayment);

module.exports = router;
