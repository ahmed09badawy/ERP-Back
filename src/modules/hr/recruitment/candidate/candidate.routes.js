const router = require("express").Router();
const controller = require("./candidate.controller");

router.post("/create", controller.createCandidate);
router.get("/list", controller.getCandidates);
router.get("/:id", controller.getCandidateById);
router.patch("/update/:id", controller.updateCandidate);
router.delete("/delete/:id", controller.deleteCandidate);

module.exports = router;
