const { z } = require("zod");

const createDriverSchema = z.object({
    driverName: z.string().min(1, "Driver name is required"),
    licenseNumber: z.string().min(1, "License number is required"),
    licenseExpiry: z.string().min(1, "License expiry is required"),
    phone: z.string().min(10, "Phone is required"),
    assignedVehicleId: z.string().optional(),
    status: z.enum(["Active", "Inactive", "On Trip"]).default("Active"),
});

const updateDriverSchema = z.object({
    driverName: z.string().optional(),
    licenseNumber: z.string().optional(),
    licenseExpiry: z.string().optional(),
    phone: z.string().optional(),
    assignedVehicleId: z.string().optional(),
    status: z.enum(["Active", "Inactive", "On Trip"]).optional(),
});

module.exports = {
    createDriverSchema,
    updateDriverSchema,
};
