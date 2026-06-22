const { z } = require("zod");

const createContractSchema = z.object({
    employeeInfo: z.string(),
    contractType: z.string(),
    duration: z.string().optional(),
    jobTitle: z.string(),
    branch: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    workingHours: z.string().optional(),
    allowances: z.string().optional(),
    basicSalary: z.number().positive(),
    state: z.enum(["Active", "Expired", "Under Renewal"]).optional(),
});

const updateContractSchema = createContractSchema.partial();

module.exports = {
    createContractSchema,
    updateContractSchema,
};
