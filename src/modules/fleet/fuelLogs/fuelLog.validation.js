const { z } = require("zod");

const createFuelLogSchema = z.object({
    vehicleId: z.string(),
    driverId: z.string(),
    date: z.string(),
    quantity: z.number().min(0),
    cost: z.number().min(0),
    odometer: z.number().min(0),
    station: z.string().min(1),
});

const updateFuelLogSchema = z.object({
    vehicleId: z.string().optional(),
    driverId: z.string().optional(),
    date: z.string().optional(),
    quantity: z.number().optional(),
    cost: z.number().optional(),
    odometer: z.number().optional(),
    station: z.string().optional(),
});

module.exports = {
    createFuelLogSchema,
    updateFuelLogSchema,
};
