const router = require("express").Router();
const controller = require("./interview.controller");

router.post("/create", controller.createInterview);
router.get("/list", controller.getInterviews);
router.get("/:id", controller.getInterviewById);
router.patch("/update/:id", controller.updateInterview);
router.delete("/delete/:id", controller.deleteInterview);

module.exports = router;
