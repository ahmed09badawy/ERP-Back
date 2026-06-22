const { z } = require("zod");

const createInitialTrainingSchema = z.object({
    employeeInfo: z.string(),
    trainingType: z.string(),
    trainer: z.string(),
    department: z.string(),
    doneBy: z.string(),
    doneAt: z.string().optional(),
    status: z.enum(["Pending", "Paid", "Unpaid", "Done", "Canceled"]).optional(),
});

const updateInitialTrainingSchema = createInitialTrainingSchema.partial();

module.exports = {
    createInitialTrainingSchema,
    updateInitialTrainingSchema,
};
