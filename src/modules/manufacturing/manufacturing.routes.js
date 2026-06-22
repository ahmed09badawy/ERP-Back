 const express = require("express");
const router = express.Router();

const billOfMaterialsRoutes = require("./bill-of-materials/bill-of-materials.routes");
const manufacturingOrderRoutes = require("./manufacturing-orders/manufacturing-order.routes");
const operationRoutes = require("./operations/operation.routes");
const workCenterRoutes = require("./work-centers/work-center.routes");
const productionReportRoutes = require("./production-reports/production-report.routes");
const materialRequirementRoutes = require("./material-requirements/material-requirement.routes");
const workInProgressRoutes = require("./work-in-progress/work-in-progress.routes");


router.use("/bill-of-materials", billOfMaterialsRoutes);
 router.use("/manufacturing-orders", manufacturingOrderRoutes);
router.use("/operations", operationRoutes);
router.use("/work-centers", workCenterRoutes);
 router.use("/production-reports", productionReportRoutes);
 router.use("/material-requirements", materialRequirementRoutes);
 router.use("/work-in-progress", workInProgressRoutes);


module.exports = router;
 
