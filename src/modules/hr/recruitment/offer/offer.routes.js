const router = require("express").Router();
const controller = require("./offer.controller");

router.post("/create", controller.createOffer);
router.get("/list", controller.getOffers);
router.get("/:id", controller.getOfferById);
router.patch("/update/:id", controller.updateOffer);
router.delete("/delete/:id", controller.deleteOffer);

module.exports = router;
