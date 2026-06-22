const router = require("express").Router();
const controller = require("./trip.controller");

router.post("/create", controller.createTrip);
router.get("/list", controller.getAllTrips);
router.get("/:id", controller.getTripById);
router.patch("/update/:id", controller.updateTrip);
router.delete("/delete/:id", controller.deleteTrip);

module.exports = router;
