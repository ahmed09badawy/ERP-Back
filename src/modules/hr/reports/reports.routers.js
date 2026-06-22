const express = require("express")
const router = express.Router();


const documentsExpiryRoutes = require("./documentExpiryReport/documentExpiryReport.routes");
const contractsExpiryRoutes = require("./contractExpiryReport/contractExpiryReport.routes");
const employeeSummaryRoutes = require("./employeeSummaryReports/employeeSummaryReport.routes");
const monthlyPayrollRoutes = require("./monthlyPayrollReport/monthlyPayrollReport.routes");
const attendanceRoutes = require("./attendanceReport/attendanceReport.routes");
const leaveRoutes = require("./leaveReport/leaveReport.routes");
const annualPayrollRoutes = require("./annualPayrollCostReport/annualPayrollCostReport.routes");
const gosiRoutes = require("./gosiContributionReport/gosiContributionReport.routes");
const turnoverRoutes = require("./turnoverReport/turnoverReport.routes");
const headcountGrowthRoutes = require("./headcountGrowth/headcountGrowth.routes");
const salaryTrendRoutes = require("./salaryTrend/salaryTrend.routes");
const departmentCostRoutes = require("./departmentCost/departmentCost.routes");
const leaveBalanceRoutes = require("./leaveBalance/leaveBalance.routes");
const payrollVarianceRoutes = require("./payrollVariance/payrollVariance.routes");
const promotionHistoryRoutes = require("./promotionHistory/promotionHistory.routes");
const hiringRoutes = require("./hiring/hiring.routes");
const performanceReportRoutes = require("./performanceReport/performanceReport.routes");
const overtimeReportRoutes = require("./overtimeReport/overtimeReport.routes");

router.use("/contracts-expiry", contractsExpiryRoutes);
router.use("/documents-expiry", documentsExpiryRoutes);
router.use("/employee-summary", employeeSummaryRoutes);
router.use("/monthly-payroll", monthlyPayrollRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/leave", leaveRoutes);
router.use("/annual-payroll-cost", annualPayrollRoutes);
router.use("/gosi", gosiRoutes);
router.use("/turnover", turnoverRoutes);
router.use("/headcount-growth", headcountGrowthRoutes);
router.use("/salary-trend", salaryTrendRoutes);
router.use("/department-cost", departmentCostRoutes);
router.use("/leave-balance", leaveBalanceRoutes);
router.use("/payroll-variance", payrollVarianceRoutes);
router.use("/promotion-history", promotionHistoryRoutes);
router.use("/hiring", hiringRoutes);
router.use("/performance", performanceReportRoutes);
router.use("/overtime", overtimeReportRoutes);



module.exports = router;
