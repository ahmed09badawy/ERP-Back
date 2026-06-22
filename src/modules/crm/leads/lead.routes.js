const express = require("express");
const controller = require("./lead.controller");

const router = express.Router();

router.post("/create", controller.createLead);
router.get("/list", controller.getAllLeads);
router.get("/:id", controller.getLeadById);
router.patch("/update/:id", controller.updateLead);
router.delete("/delete/:id", controller.deleteLead);

module.exports = router;
