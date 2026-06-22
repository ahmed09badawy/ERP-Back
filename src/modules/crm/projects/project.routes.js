const express = require("express");
const controller = require("./project.controller");

const router = express.Router();

router.post("/create", controller.createProject);
router.get("/list", controller.getAllProjects);
router.get("/:id", controller.getProjectById);
router.patch("/update/:id", controller.updateProject);
router.delete("/delete/:id", controller.deleteProject);

module.exports = router;
