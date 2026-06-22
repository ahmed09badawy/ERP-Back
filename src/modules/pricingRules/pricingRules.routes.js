const express = require("express");
const controller = require("./pricingRules.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", controller.createPricingRule);
router.get("/list", controller.getPricingRules);
router.get("/:id", controller.getPricingRuleById);
router.patch("/update/:id", controller.updatePricingRule);
router.delete("/delete/:id", controller.deletePricingRule);

module.exports = router;
