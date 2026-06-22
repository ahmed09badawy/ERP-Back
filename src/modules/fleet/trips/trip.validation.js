const { z } = require("zod");

const createTripSchema = z.object({
    vehicleId: z.string(),
    driverId: z.string(),
    startLocation: z.string().min(1),
    endLocation: z.string().min(1),
    startTime: z.string(),
    endTime: z.string().optional(),
    fuelUsed: z.number().optional(),
    distance: z.number().optional(),
    status: z.enum(["Ongoing", "Completed", "Canceled"]).default("Ongoing"),
});

const updateTripSchema = z.object({
    vehicleId: z.string().optional(),
    driverId: z.string().optional(),
    startLocation: z.string().optional(),
    endLocation: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    fuelUsed: z.number().optional(),
    distance: z.number().optional(),
    status: z.enum(["Ongoing", "Completed", "Canceled"]).optional(),
});

module.exports = {
    createTripSchema,
    updateTripSchema,
};
