const { z } = require("zod");

const createInsurancePolicySchema = z.object({
    employeeInfo: z.string(),
    policyNumber: z.string(),
    insuranceCompany: z.string(),
    planName: z.enum(["Bronze", "Silver", "Gold", "Premium", "Basic", "Other"]),
    policyStartDate: z.string(),
    policyEndDate: z.string(),
    totalCost: z.number().min(0),
    policyPlan: z.string(),
    familyMembers: z.string().optional(),
    coverageExpiryDate: z.string(),
    membershipId: z.string(),
});

const updateInsurancePolicySchema = createInsurancePolicySchema.partial();

module.exports = {
    createInsurancePolicySchema,
    updateInsurancePolicySchema,
};
