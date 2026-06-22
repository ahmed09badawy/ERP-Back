const { z } = require("zod");

const createTaskSchema = z.object({
    taskTitle: z.string(),
    startDate: z.string(),
    dueDate: z.string(),
    assignee: z.string(),
    state: z.enum(["Completed", "In Progress", "Cancelled"]).optional(),
    description: z.string().optional(),
});

const updateTaskSchema = createTaskSchema.partial();

module.exports = {
    createTaskSchema,
    updateTaskSchema,
};
