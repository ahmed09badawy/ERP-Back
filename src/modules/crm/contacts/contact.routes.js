const express = require("express");
const controller = require("./contact.controller");
const upload = require("../../../middlewares/upload.middleware");

const router = express.Router();

router.post("/create", controller.createContact);
router.post("/import", upload.single("file"), controller.importContacts);
router.get("/list", controller.getAllContacts);
router.patch("/update/:id", controller.updateContact);
router.delete("/delete/:id", controller.deleteContact);
router.get("/:id", controller.getContactById);

module.exports = router;
