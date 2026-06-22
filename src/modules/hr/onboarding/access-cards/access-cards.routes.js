const express = require("express");
const controller = require("./access-cards.controller");

const router = express.Router();

router.post("/create", controller.createAccessCard);
router.get("/list", controller.getAllAccessCards);
router.get("/:id", controller.getAccessCardById);
router.patch("/update/:id", controller.updateAccessCard);
router.delete("/delete/:id", controller.deleteAccessCard);

module.exports = router;
