const { z } = require("zod");

const createMaintenanceSchema = z.object({
    vehicleId: z.string(),
    type: z.string().min(1, "Maintenance type is required"),
    date: z.string().min(1, "Date is required"),
    cost: z.number().min(0),
    odometer: z.number().min(0),
    provider: z.string().min(1, "Provider is required"),
    status: z.enum(["Scheduled", "Pending", "Completed", "Canceled"]).default("Scheduled"),
});

const updateMaintenanceSchema = z.object({
    vehicleId: z.string().optional(),
    type: z.string().optional(),
    date: z.string().optional(),
    cost: z.number().min(0).optional(),
    odometer: z.number().min(0).optional(),
    provider: z.string().optional(),
    status: z.enum(["Scheduled", "Pending", "Completed", "Canceled"]).optional(),
});

module.exports = {
    createMaintenanceSchema,
    updateMaintenanceSchema,
};
