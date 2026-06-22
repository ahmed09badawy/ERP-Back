const express = require("express");
const router = express.Router();

const contactRoutes = require("./contacts/contact.routes");
const groupRoutes = require("./groups/group.routes");
const pricelistRoutes = require("./pricelists/pricelist.routes");
const dealRoutes = require("./deals/deal.routes");
const leadRoutes = require("./leads/lead.routes");
const pipelineRoutes = require("./pipeline/pipeline.routes");
const projectRoutes = require("./projects/project.routes");
const taskRoutes = require("./tasks/task.routes");

router.use("/contacts", contactRoutes);
router.use("/groups", groupRoutes);
router.use("/pricelists", pricelistRoutes);
router.use("/deals", dealRoutes);
 router.use("/leads", leadRoutes);
 router.use("/pipeline", pipelineRoutes);
 router.use("/projects", projectRoutes);
 router.use("/tasks", taskRoutes);

module.exports = router;
