const express = require("express");
const controller = require("./request.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", controller.createRequest);
router.get("/list", controller.getRequests);
router.get("/:id", controller.getRequestById);
router.patch("/update/:id", controller.updateRequest);
router.delete("/delete/:id", controller.deleteRequest);

module.exports = router;
