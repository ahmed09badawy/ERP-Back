const router = require("express").Router();
const controller = require("./booking.controller");

router.post("/create", controller.createBooking);
router.get("/list", controller.getAllBookings);
router.get("/:id", controller.getBookingById);
router.patch("/update/:id", controller.updateBooking);
router.delete("/delete/:id", controller.deleteBooking);

module.exports = router;
