require("dotenv").config(); // MUST be first — loads env vars before any other module reads them

const dns = require('dns');
if (process.env.VERCEL !== '1') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (err) {
    console.warn("Failed to set DNS servers locally:", err.message);
  }
}
require("express-async-errors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
// dotenv already configured at top of file
const corsConfig = require("./config/cors");
const { registerIntegrationHandlers } = require("./common/integrations/registerHandlers");

registerIntegrationHandlers();


const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const roleRoutes = require("./modules/roles/role.routes");
const permissionRoutes = require("./modules/permissions/permission.routes");
const companyRoutes = require("./modules/companies/company.routes");
const branchRoutes = require("./modules/branches/branch.routes");
const setupRoutes = require("./modules/setup/setup.routes");
const customerRoutes = require("./modules/customers/customer.routes");
const supplierRoutes = require("./modules/suppliers/supplier.routes");
const productRoutes = require("./modules/products/product.routes");
const warehouseRoutes = require("./modules/warehouses/warehouse.routes");
const stockRoutes = require("./modules/stock/stock.routes");
const purchaseRequestRoutes = require("./modules/purchaseRequests/purchaseRequest.routes");
const purchaseOrderRoutes = require("./modules/purchaseOrders/purchaseOrder.routes");
const supplierRatingRoutes = require("./modules/supplierRating/supplierRating.routes");
const goodsReceiptRoutes = require("./modules/goodsReceipts/goodsReceipts.routes");
const purchaseInvoiceRoutes = require("./modules/purchaseInvoices/purchaseInvoice.routes");
const purchaseReturnRoutes = require("./modules/purchaseReturns/purchaseReturn.routes");
const purchaseRatingRoutes = require("./modules/supplierRating/supplierRating.routes.js")
const salesSettingsRoutes = require("./modules/salesSettings/salesSettings.routes.js")
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const salesOrderRoutes = require("./modules/salesOrders/salesOrders.routes");
const quotationRoutes = require("./modules/quotations/quotations.routes");
const salesInvoiceRoutes = require("./modules/salesInvoices/salesInvoices.routes");
const salesReturnRoutes = require("./modules/salesReturns/salesReturn.routes");
const pricingRoutes = require("./modules/pricingRules/pricingRules.routes");
const discountRoutes = require("./modules/discounts/discount.routes");
const promotionRoutes = require("./modules/promotions/promotion.routes")
const departmentRoutes = require("./modules/hr/department/department.routes");
const jobRoutes = require("./modules/hr/job/job.routes");
const responseRoutes = require("./modules/hr/responses/response.routes");
const employeeRoutes = require("./modules/hr/employee/employee.routes");
const deductionRoutes = require("./modules/hr/deductions/deductions.routes");
const attendanceRoutes = require("./modules/hr/attendance/attendance.routes");
const payslipRoutes = require("./modules/hr/payslip/payslip.routes");
const leaveRoutes = require("./modules/hr/leaves/leave.routes");
const payrollRoutes = require("./modules/hr/payroll/payroll.routes");
const requestRoutes = require("./modules/hr/requests/request.routes");
const payrollFileLogs = require("./modules/hr/payrollFileLogs/payrollFileLog.routes")
const penaltyRoutes = require("./modules/hr/penalties/penalty.routes");
const rewardRoutes = require("./modules/hr/rewards/reward.routes");
const insurancePolicyRoutes = require("./modules/hr/insurancePolicy/insurancePolicy.routes");
const onboardingRoutes = require("./modules/hr/onboarding/onboarding.routes");
const loanRoutes = require("./modules/hr/loans/loan.routes");
const contractRoutes = require("./modules/hr/contracts/contracts.routes");
const endOfServiceRoutes = require("./modules/hr/endOfService/endOfService.routes");
const reportOverTime = require("./modules/hr/reports/overtimeReport/overtimeReport.routes")
const performanceRoutes = require("./modules/hr/performance/performance.routes")
const performanceReportRoutes = require("./modules/hr/reports/performanceReport/performanceReport.routes");
const reportRoutes = require("./modules/hr/reports/reports.routers")
const careerHistoryRoutes = require("./modules/hr/careerHistory/careerHistory.routes")
const candidatesRoutes = require("./modules/hr/recruitment/candidate/candidate.routes")
const interviewsRoutes = require("./modules/hr/recruitment/interview/interview.routes")
const offersRoutes = require("./modules/hr/recruitment/offer/offer.routes")
const hiresRoutes = require("./modules/hr/recruitment/hire/hire.routes")
const financeRoutes = require("./modules/finance/finance.routes");
const salesReportRoutes = require("./modules/reports/sales/salesReport.routes.js");
const inventoryCategoryRoutes = require("./modules/inventoryModule/category/category.routes");
const inventoryProductListRoutes = require("./modules/inventoryModule/products/product.routes.js")
const inventoryUnitRoutes = require("./modules/inventoryModule/unit/unit.routes.js")
const journalRoutes = require("./modules/finance/journal/journal.routes");
const assetsRoutes = require("./modules/assets/assets.routes")
const customerReportRoutes = require("./modules/reports/customer/customerReport.routes.js")
const inventoryReportRoutes = require("./modules/reports/inventory/inventoryReport.routes.js")
const purchaseReportRoutes = require("./modules/reports/purchase/purchaseReport.routes.js")
const fleetRoutes = require("./modules/fleet/fleet.routes.js")
const manufacturingRoutes = require("./modules/manufacturing/manufacturing.routes");
const crmRoutes = require("./modules/crm/crm.routes");
const posRoutes = require("./modules/pos/pos.routes");
const { getHomeMessage } = require("./modules/home/home.controller");



const app = express();
app.use(corsConfig);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Database connection middleware for Vercel/serverless environments
app.use(async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await connectDB();
        }
        next();
    } catch (err) {
        console.error("Database connection failed:", err.message);
        return res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: err.message
        });
    }
});


app.get("/", getHomeMessage);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes)

app.use("/api/warehouses", warehouseRoutes)
app.use("/api/stock", stockRoutes);
app.use("/api/purchase-requests", purchaseRequestRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/goods-receipts", goodsReceiptRoutes);
app.use("/api/purchase-invoice", purchaseInvoiceRoutes)
app.use("/api/purchase-returns", purchaseReturnRoutes)
app.use("/api/supplier-ratings", supplierRatingRoutes)
app.use("/api/inventory/unit", inventoryUnitRoutes)
app.use("/api/inventory/category", inventoryCategoryRoutes)
app.use("/api/sales-orders", salesOrderRoutes);
app.use("/api/inventory/product-list", inventoryProductListRoutes)
app.use("/api/quotations", quotationRoutes);
app.use("/api/sales-invoices", salesInvoiceRoutes);
app.use("/api/sales-returns", salesReturnRoutes);
app.use("/api/sales-settings", salesSettingsRoutes)
app.use("/api/sales/reports", salesReportRoutes)
app.use("/api/purchase/reports", purchaseReportRoutes)
app.use("/api/inventory/reports", inventoryReportRoutes)
app.use("/api/customer/reports", customerReportRoutes)
app.use("/api/pricing-rules", pricingRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payrolls", payrollRoutes);
app.use("/api/hr-requests", requestRoutes);
app.use("/api/hr/penalties", penaltyRoutes);
app.use("/api/hr/rewards", rewardRoutes);
app.use("/api/hr/insurance-policy", insurancePolicyRoutes);
app.use("/api/hr/onboarding", onboardingRoutes);
app.use("/api/hr/contracts", contractRoutes);
app.use("/api/hr/loans", loanRoutes);
app.use("/api/hr/end-of-service", endOfServiceRoutes);
app.use("/api/payroll-file-logs", payrollFileLogs);
app.use("/api/hr/responses", responseRoutes);
app.use("/api/hr/performance", performanceRoutes)
app.use("/api/hr/reports/overtime-report", reportOverTime);
app.use("/api/hr/reports/performance-report", performanceReportRoutes);
app.use("/api/hr/deductions", deductionRoutes);
app.use("/api/hr/payslips", payslipRoutes);
app.use("/api/hr/reports", reportRoutes);
app.use("/api/hr/careerHistory", careerHistoryRoutes)
app.use("/api/hr/candidates", candidatesRoutes)
app.use("/api/hr/interviews", interviewsRoutes)
app.use("/api/hr/offers", offersRoutes)
app.use("/api/hr/hires", hiresRoutes)
app.use("/api/finance", financeRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/assets", assetsRoutes)
app.use("/api/fleet", fleetRoutes);
app.use("/api/manufacturing", manufacturingRoutes);
app.use("/api/crm", crmRoutes);
app.use("/api/pos", posRoutes);


app.use(notFoundMiddleware);
app.use(errorMiddleware);
module.exports = app;
