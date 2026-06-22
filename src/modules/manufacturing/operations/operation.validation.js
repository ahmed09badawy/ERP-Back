const { z } = require("zod");

const createOperationSchema = z.object({
    operation_name: z.string().min(1),
    work_center: z.string().min(1),
    duration: z.number().positive(),
    sequence: z.number().positive(),
    cost: z.number().min(0),
});

const updateOperationSchema = z.object({
    operation_name: z.string().min(1).optional(),
    work_center: z.string().min(1).optional(),
    duration: z.number().positive().optional(),
    sequence: z.number().positive().optional(),
    cost: z.number().min(0).optional(),
});

module.exports = {
    createOperationSchema,
    updateOperationSchema,
};
