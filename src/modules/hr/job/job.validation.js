const { z } = require("zod");

const createJobSchema = z.object({
    jobName: z.string().min(2),
    description: z.string().optional().default(""),
    departmentId: z.string().min(1),
    state: z.enum(["ACTIVE", "INACTIVE"]).optional().default("ACTIVE"),
});

const updateJobSchema = createJobSchema.partial();

module.exports = {
    createJobSchema,
    updateJobSchema,
};
