const express = require("express");
const controller = require("./contracts.controller");

const router = express.Router();

router.post("/create", controller.createContract);
router.get("/list", controller.getAllContracts);
router.get("/:id", controller.getContractById);
router.patch("/update/:id", controller.updateContract);
router.delete("/delete/:id", controller.deleteContract);

module.exports = router;
