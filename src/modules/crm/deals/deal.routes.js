const express = require("express");
const controller = require("./deal.controller");

const router = express.Router();

router.post("/create", controller.createDeal);
router.get("/list", controller.getAllDeals);
router.get("/:id", controller.getDealById);
router.patch("/update/:id", controller.updateDeal);
router.delete("/delete/:id", controller.deleteDeal);

module.exports = router;
