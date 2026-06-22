const express = require("express");
const controller = require("./operation.controller");

const router = express.Router();

router.post("/create", controller.createOperation);
router.get("/list", controller.getAllOperations);
router.get("/:id", controller.getOperationById);
router.patch("/update/:id", controller.updateOperation);
router.delete("/delete/:id", controller.deleteOperation);

module.exports = router;
