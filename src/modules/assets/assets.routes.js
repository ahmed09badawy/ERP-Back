const express = require("express");

const registerRoutes = require("./asset-register/asset.routes")
const maintenanceRoutes = require("./maintenance/maintenance.routes");
const depreciationRoutes = require("./depreciation/depreciation.routes");
const allocationRoutes = require("./allocation/allocation.routes");
const trackingRoutes = require("./tracking/tracking.routes");
const disposalRoutes = require("./disposal/disposal.routes");
const auditLogRoutes = require("./audit-log/audit-log.routes");

const router = express.Router();

router.use("/register",registerRoutes)
router.use("/maintenance", maintenanceRoutes);
router.use("/depreciation", depreciationRoutes);
router.use("/allocation", allocationRoutes);
router.use("/tracking", trackingRoutes);
router.use("/disposal", disposalRoutes);
router.use("/audit-log", auditLogRoutes);
module.exports = router;
