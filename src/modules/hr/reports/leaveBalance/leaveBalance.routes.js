const router = require("express").Router();
const controller = require("./leaveBalance.controller");

router.get("/list", controller.getLeaveBalanceReport);

module.exports = router;
