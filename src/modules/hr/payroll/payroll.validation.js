const { z } = require("zod");

const createPayrollSchema = z.object({
    employeeId: z.string().min(1),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    payrollMonth: z.number().min(1).max(12),
    payrollYear: z.number().min(2000),

    basicSalary: z.number().min(0),
    housingAllowance: z.number().min(0).optional().default(0),
    transportAllowance: z.number().min(0).optional().default(0),
    workNatureAllowance: z.number().min(0).optional().default(0),
    medicalAllowance: z.number().min(0).optional().default(0),
    commissions: z.number().min(0).optional().default(0),
    bonus: z.number().min(0).optional().default(0),

    overtimeHours: z.number().min(0).optional().default(0),
    overtimeRate: z.number().min(0).optional().default(0),

    deductions: z
        .object({
            absence: z.number().min(0).optional().default(0),
            lateArrival: z.number().min(0).optional().default(0),
            earlyLeave: z.number().min(0).optional().default(0),
            loan: z.number().min(0).optional().default(0),
            penalties: z.number().min(0).optional().default(0),
            other: z.number().min(0).optional().default(0),
        })
        .optional()
        .default({
            absence: 0,
            lateArrival: 0,
            earlyLeave: 0,
            loan: 0,
            penalties: 0,
            other: 0,
        }),

    status: z.enum(["DRAFT", "UNDER_REVIEW", "PAID", "UNPAID"]).optional().default("DRAFT"),
    notes: z.string().optional().default(""),
});

const updatePayrollSchema = createPayrollSchema.partial();

module.exports = {
    createPayrollSchema,
    updatePayrollSchema,
};
