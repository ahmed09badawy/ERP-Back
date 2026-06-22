const express = require("express");
const router = express.Router();

const { getOvertimeReport } = require("../overtimeReport/overtimeReport.controller")

router.get("/list", getOvertimeReport);

module.exports = router

