const express = require("express");
const controller = require("./supplierRating.controller");

const router = express.Router();

router.post("/create", controller.createSupplierRating);
router.get("/list", controller.getSupplierRatings);
router.get("/:id", controller.getSupplierRatingById);
router.patch("/update/:id", controller.updateSupplierRating);
router.delete("/delete/:id", controller.deleteSupplierRating);

module.exports = router;
