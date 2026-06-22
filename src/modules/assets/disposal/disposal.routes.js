const express = require("express");
const router = express.Router();

const disposalController = require("./disposal.controller");

router.post("/create", disposalController.createDisposal);
router.get("/list", disposalController.getAllDisposals);
router.get("/:id", disposalController.getDisposalById);
router.patch("/update/:id", disposalController.updateDisposal);
router.delete("/delete/:id", disposalController.deleteDisposal);

module.exports = router;
