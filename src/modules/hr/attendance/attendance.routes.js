const express = require("express");
const controller = require("./attendance.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", controller.createAttendance);
router.get("/list", controller.getAttendanceList);
router.get("/:id", controller.getAttendanceById);
router.patch("/update/:id", controller.updateAttendance);
router.delete("/delete/:id", controller.deleteAttendance);

module.exports = router;
