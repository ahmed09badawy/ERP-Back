const { z } = require("zod");

const createDepartmentSchema = z.object({
    departmentName: z.string().min(2),
    companyId: z.string(),
    managerName: z.string().optional().default(""),
    state: z.enum(["ACTIVE", "INACTIVE"]).optional().default("ACTIVE"),
});

const updateDepartmentSchema = createDepartmentSchema.partial();

module.exports = {
    createDepartmentSchema,
    updateDepartmentSchema,
};
