const express = require("express");
const controller = require("./task.controller");

const router = express.Router();

router.post("/create", controller.createTask);
router.get("/list", controller.getAllTasks);
router.get("/:id", controller.getTaskById);
router.patch("/update/:id", controller.updateTask);
router.delete("/delete/:id", controller.deleteTask);

module.exports = router;
