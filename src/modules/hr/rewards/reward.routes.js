const express = require("express");
const controller = require("./reward.controller");

const router = express.Router();

router.post("/create", controller.createReward);
router.get("/list", controller.getAllRewards);
router.get("/:id", controller.getRewardById);
router.patch("/update/:id", controller.updateReward);
router.delete("/delete/:id", controller.deleteReward);

module.exports = router;
