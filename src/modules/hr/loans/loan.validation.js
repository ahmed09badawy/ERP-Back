const { z } = require("zod");

const createLoanSchema = z.object({
    employeeInfo: z.string(),
    loanAmount: z.number().positive(),
    deductionType: z.enum(["SINGLE", "INSTALLMENTS"]).optional(),
    installmentAmount: z.number().optional(),
    startMonth: z.string().optional(),
    reason: z.string().optional(),
});

const updateLoanSchema = createLoanSchema.partial().extend({
    status: z.enum(["Pending", "Approved", "Rejected"]).optional(),
    rejectedReason: z.string().optional(),
    approvalBy: z.string().optional(),
});

module.exports = {
    createLoanSchema,
    updateLoanSchema,
};
