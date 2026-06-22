const express = require("express");
const stockController = require("./stock.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const permissionMiddleware = require("../../middlewares/permission.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/in",permissionMiddleware("inventory", "stock", "add"),stockController.stockIn);

router.post("/out",permissionMiddleware("inventory", "stock", "edit"),stockController.stockOut);

router.post("/reserve",permissionMiddleware("inventory", "stock", "edit"),stockController.reserveStock);

router.post("/release",permissionMiddleware("inventory", "stock", "edit"),stockController.releaseStock);

router.get("/list",permissionMiddleware("inventory", "stock", "read"),stockController.getStockList);

router.get("/movements/list",permissionMiddleware("inventory", "stock", "read"),stockController.getAllMovements);

router.get("/movements/:productId",permissionMiddleware("inventory", "stock", "read"),stockController.getProductMovements);

module.exports = router;
