const express = require("express");
const router = express.Router();

const auditLogController = require("./audit-log.controller");

router.post("/create", auditLogController.createAuditLog);
router.get("/list", auditLogController.getAllAuditLogs);
router.get("/:id", auditLogController.getAuditLogById);
router.patch("/update/:id", auditLogController.updateAuditLog);
router.delete("/delete/:id", auditLogController.deleteAuditLog);

module.exports = router;
