const router = require("express").Router();
const controller = require("./careerHistory.controller");

router.post("/create", controller.createCareerHistory);
router.get("/list", controller.getCareerHistory);
router.get("/:id", controller.getCareerHistoryById);
router.patch("/update/:id", controller.updateCareerHistory);
router.delete("/delete/:id", controller.deleteCareerHistory);

module.exports = router;
