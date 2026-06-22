const router = require("express").Router();
const controller = require("./promotionHistory.controller");

router.get("/list", controller.getPromotionHistoryReport);

module.exports = router;
