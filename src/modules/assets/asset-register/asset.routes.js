const express = require("express");
const router = express.Router();

const assetController = require("./asset.controller");

router.post("/create", assetController.createAsset);
router.get("/list", assetController.getAllAssets);
router.get("/:id", assetController.getAssetById);
router.patch("/update/:id", assetController.updateAsset);
router.delete("/delete/:id", assetController.deleteAsset);

module.exports = router;
