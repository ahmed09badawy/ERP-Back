const assignDeviceRoutes = require("./assign-device/assign-device.routes");
const accessCardsRoutes = require("./access-cards/access-cards.routes");
const initialTrainingRoutes = require("./initial-training/initial-training.routes");
const router = require("express").Router();

router.use("/assign-devices", assignDeviceRoutes);
router.use("/access-cards", accessCardsRoutes);
router.use("/initial-training", initialTrainingRoutes);

module.exports = router;
