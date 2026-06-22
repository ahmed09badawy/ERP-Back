const { z } = require("zod");

const createProjectSchema = z.object({
    projectName: z.string(),
    teamLeader: z.string(),
    client: z.string(),
    progress: z.number().min(0).max(100),
    startDate: z.string(),
    deadline: z.string(),
    status: z.enum(["Completed", "In Progress", "Cancelled"]).optional(),
});

const updateProjectSchema = createProjectSchema.partial();

module.exports = {
    createProjectSchema,
    updateProjectSchema,
};
