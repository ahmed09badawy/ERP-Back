const { z } = require("zod");

const createMaintenanceSchema = z.object({
    assetId: z.string().min(1, "Asset ID is required"),
    maintenanceType: z.enum(["Preventive", "Corrective", "Repair", "Service"]),
    scheduledDate: z.string().min(1, "Scheduled date is required"),
    technician: z.string().min(1, "Technician is required"),
    state: z.enum(["Scheduled", "In Progress", "Completed", "Cancelled"]),
    cost: z.number().min(0, "Cost must be 0 or more"),
    description: z.string().min(1, "Description is required"),
    attachments: z.array(z.string()).optional(),
});

const updateMaintenanceSchema = z.object({
    assetId: z.string().min(1).optional(),
    maintenanceType: z.enum(["Preventive", "Corrective", "Repair", "Service"]).optional(),
    scheduledDate: z.string().optional(),
    technician: z.string().min(1).optional(),
    state: z.enum(["Scheduled", "In Progress", "Completed", "Cancelled"]).optional(),
    cost: z.number().min(0).optional(),
    description: z.string().min(1).optional(),
    attachments: z.array(z.string()).optional(),
});

module.exports = {
    createMaintenanceSchema,
    updateMaintenanceSchema,
};
