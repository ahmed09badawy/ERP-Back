const express = require("express");
const router = express.Router();
const {
  createPayrollLog,
  getAllPayrollLogs
} = require("../../hr/payrollFileLogs/payrollFileLog.controller");

router.post("/create", createPayrollLog);
router.get("/list", getAllPayrollLogs);

module.exports = router;
