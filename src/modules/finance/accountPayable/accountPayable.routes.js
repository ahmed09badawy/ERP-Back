const router = require("express").Router();
const controller = require("./accountPayable.controller");

router.post("/create", controller.createAP);
router.get("/list", controller.getAllAP);
router.get("/:id", controller.getAPById);
router.patch("/update/:id", controller.updateAP);
router.delete("/delete/:id", controller.deleteAP);

module.exports = router;
