const router = require("express").Router();
const controller = require("./performance.controller");

router.post("/create", controller.createPerformance);
router.get("/list", controller.getAllPerformance);
router.get("/:id", controller.getPerformanceById);
router.patch("/update/:id", controller.updatePerformance);
router.delete("/delete/:id", controller.deletePerformance);

module.exports = router;
