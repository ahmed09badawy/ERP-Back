const router = require("express").Router();
const controller = require("./accident.controller");

router.post("/create", controller.createAccident);
router.get("/list", controller.getAllAccidents);
router.get("/:id", controller.getAccidentById);
router.patch("/update/:id", controller.updateAccident);
router.delete("/delete/:id", controller.deleteAccident);

module.exports = router;
