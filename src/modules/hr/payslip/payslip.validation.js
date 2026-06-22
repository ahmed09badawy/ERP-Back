const { z } = require("zod");

const createPayslipSchema = z.object({
    employeeInfo: z.string(),
    employeeCode: z.string(),
    department: z.string(),
    jobTitle: z.string(),
    salaryMonth: z.string(),

    paymentStatus: z.enum(["PAID", "UNPAID", "PENDING"]).optional(),

    basicSalary: z.number().min(0).optional(),
    housingAllowance: z.number().min(0).optional(),
    transportAllowance: z.number().min(0).optional(),
    natureAllowance: z.number().min(0).optional(),
    commissions: z.number().min(0).optional(),
    bonuses: z.number().min(0).optional(),
    overtimeHours: z.number().min(0).optional(),

    gosiEmployee: z.number().min(0).optional(),
    hrdfSupport: z.number().min(0).optional(),
    bonus: z.number().min(0).optional(),
    loan: z.number().min(0).optional(),
    sanedDeduction: z.number().min(0).optional(),
    penalties: z.number().min(0).optional(),
    absence: z.number().min(0).optional(),
    earlyLeave: z.number().min(0).optional(),

    hrSignature: z.string().optional(),
    employeeSignature: z.string().optional(),
});

const updatePayslipSchema = createPayslipSchema.partial();

module.exports = {
    createPayslipSchema,
    updatePayslipSchema,
};
