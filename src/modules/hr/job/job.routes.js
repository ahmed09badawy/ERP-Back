const express = require("express");
const controller = require("./job.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", controller.createJob);
router.get("/list", controller.getJobs);
router.get("/:id", controller.getJobById);
router.patch("/update/:id", controller.updateJob);
router.delete("/delete/:id", controller.deleteJob);

module.exports = router;
