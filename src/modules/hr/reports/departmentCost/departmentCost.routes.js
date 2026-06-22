const router = require("express").Router();
const controller = require("./departmentCost.controller");

router.get("/list", controller.getDepartmentCostReport);

module.exports = router;
