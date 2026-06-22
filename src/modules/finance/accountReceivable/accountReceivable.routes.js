const router = require("express").Router();
const controller = require("./accountReceivable.controller");

router.post("/create", controller.createAR);
router.get("/list", controller.getAllAR);
router.get("/:id", controller.getARById);
router.patch("/update/:id", controller.updateAR);
router.delete("/delete/:id", controller.deleteAR);

module.exports = router;
