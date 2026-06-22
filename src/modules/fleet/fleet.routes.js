const router = require("express").Router();

const vehicleRoutes = require("./vehicles/vehicle.routes");
const driverRoutes = require("./drivers/driver.routes");
const tripRoutes = require("./trips/trip.routes");
const fuelRoutes = require("./fuelLogs/fuelLog.routes");
const maintenanceRoutes = require("./maintenance/maintenance.routes");
const accidentRoutes = require("./accidents/accident.routes");
const expenseRoutes = require("./vehicleExpenses/vehicleExpense.routes");
const bookingRoutes = require("./booking/booking.routes");
const kpiRoutes = require("./reports/kpis/kpi.routes");
const costCenterRoutes = require("./costCenter/costCenter.routes");
const dashboardRoutes = require("./dashboard/dashboard.routes");

router.use("/vehicles", vehicleRoutes);
router.use("/drivers", driverRoutes);
router.use("/trips", tripRoutes);
router.use("/fuel-logs", fuelRoutes);
router.use("/maintenance", maintenanceRoutes);
router.use("/accidents", accidentRoutes);
router.use("/vehicle-expenses", expenseRoutes);
router.use("/bookings", bookingRoutes);
router.use("/kpis", kpiRoutes);
router.use("/cost-centers", costCenterRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
