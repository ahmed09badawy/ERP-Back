const { z } = require("zod");

const createWarehouseSchema = z.object({
    code: z.string().min(2),
    warehouseName: z.string().min(2),
    type: z.enum([
        "MAIN_WAREHOUSE",
        "SUB_WAREHOUSE",
        "STORE",
        "DISTRIBUTION_CENTER",
        "COLD_STORAGE",
        "RAW_MATERIALS",
        "FINISHED_GOODS",
    ]).optional().default("MAIN_WAREHOUSE"),
    branchId: z.string().optional().nullable(),
    companyId: z.string().optional().nullable(),
    managerName: z.string().optional().default(""),
    phoneNumber: z.string().optional().default(""),
    location: z.string().optional().default(""),
});

const updateWarehouseSchema = z.object({
    code: z.string().min(2).optional(),
    warehouseName: z.string().min(2).optional(),
    type: z.enum([
        "MAIN_WAREHOUSE",
        "SUB_WAREHOUSE",
        "STORE",
        "DISTRIBUTION_CENTER",
        "COLD_STORAGE",
        "RAW_MATERIALS",
        "FINISHED_GOODS",
    ]).optional(),
    branchId: z.string().optional().nullable(),
    companyId: z.string().optional().nullable(),
    managerName: z.string().optional(),
    phoneNumber: z.string().optional(),
    location: z.string().optional(),
    state: z.enum(["ACTIVE", "INACTIVE", "UNDER_MAINTENANCE", "CLOSED"]).optional(),
});

const updateWarehouseStateSchema = z.object({
    state: z.enum(["ACTIVE", "INACTIVE", "UNDER_MAINTENANCE", "CLOSED"]),
});

module.exports = {
    createWarehouseSchema,
    updateWarehouseSchema,
    updateWarehouseStateSchema,
};
