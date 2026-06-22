const { z } = require("zod");

const createDeductionSchema = z.object({
    employeeInfo: z.string(),
    company: z.string(),
    branch: z.string(),
    date: z.string(),

    absence: z.number().min(0).optional(),
    lateArrival: z.number().min(0).optional(),
    earlyLeave: z.number().min(0).optional(),
    loan: z.number().min(0).optional(),
    penaltiesDeduction: z.number().min(0).optional(),
});

const updateDeductionSchema = createDeductionSchema.partial();

module.exports = {
    createDeductionSchema,
    updateDeductionSchema,
};
