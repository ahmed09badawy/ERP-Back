const { z } = require("zod");

const createEndOfServiceSchema = z.object({
    code: z.string().optional(),
    employeeInfo: z.string(),
    eosType: z.enum(["Resignation", "End Contract", "Termination", "Retirement", "Other"]),
    jobTitle: z.string(),
    department: z.string(),
    startDate: z.string(),
    lastWorkingDay: z.string(),

    collectDevice: z.boolean().optional(),
    collectAccessCards: z.boolean().optional(),
    finalSettlementCalculation: z.number().min(0).optional(),

    reason: z.string(),
    attachment: z.string().optional(),
    status: z.enum(["Pending", "Approved", "Rejected"]).optional(),
    approvalBy: z.string().optional(),
    rejectedReason: z.string().optional(),
});

const updateEndOfServiceSchema = createEndOfServiceSchema.partial();

module.exports = {
    createEndOfServiceSchema,
    updateEndOfServiceSchema,
};
