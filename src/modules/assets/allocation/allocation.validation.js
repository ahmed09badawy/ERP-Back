const { z } = require("zod");

const createAllocationSchema = z.object({
    assetId: z.string().min(1, "Asset ID is required"),
    assignedTo: z.string().min(1, "Assigned To is required"),
    location: z.string().min(1, "Location is required"),
    usagePurpose: z.enum(["Work", "Production", "Maintenance", "Management"]),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
});

const updateAllocationSchema = z.object({
    assetId: z.string().optional(),
    assignedTo: z.string().optional(),
    location: z.string().optional(),
    usagePurpose: z.enum(["Work", "Production", "Maintenance", "Management"]).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

module.exports = {
    createAllocationSchema,
    updateAllocationSchema,
};
