const router = require("express").Router();
const controller = require("./accountReceivablePayments.controller");

router.post("/create", controller.createARPayment);
router.get("/list", controller.getAllARPayments);
router.get("/:id", controller.getARPaymentById);
router.patch("/update/:id", controller.updateARPayment);
router.delete("/delete/:id", controller.deleteARPayment);

module.exports = router;
