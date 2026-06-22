const { z } = require("zod");

const createAuditLogSchema = z.object({
    assetId: z.string().min(1, "Asset ID is required"),
    actionType: z.enum([
        "Create",
        "Update",
        "Delete",
        "Transfer",
        "Maintenance",
        "Disposal",
        "Allocation",
        "Scrap",
        "Retirement",
    ]),
    byWho: z.string().min(1, "By who is required"),
    changeDescription: z.string().min(1, "Change description is required"),
    date: z.string().min(1, "Date is required"),
});

const updateAuditLogSchema = z.object({
    assetId: z.string().optional(),
    actionType: z.enum([
        "Create",
        "Update",
        "Delete",
        "Transfer",
        "Maintenance",
        "Disposal",
        "Allocation",
        "Scrap",
        "Retirement",
    ]).optional(),
    byWho: z.string().optional(),
    changeDescription: z.string().optional(),
    date: z.string().optional(),
});

module.exports = {
    createAuditLogSchema,
    updateAuditLogSchema,
};
