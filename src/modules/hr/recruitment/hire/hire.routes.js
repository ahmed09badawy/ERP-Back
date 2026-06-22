const router = require("express").Router();
const controller = require("./hire.controller");

router.post("/create", controller.createHire);
router.get("/list", controller.getHires);
router.get("/:id", controller.getHireById);
router.patch("/update/:id", controller.updateHire);
router.delete("/delete/:id", controller.deleteHire);

module.exports = router;
