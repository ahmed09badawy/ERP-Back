const { z } = require("zod");

const createAccidentSchema = z.object({
    vehicleId: z.string(),
    driverId: z.string(),
    date: z.string(),
    location: z.string().min(1),
    damageLevel: z.enum(["Low", "Medium", "High", "Severe"]),
    actualCost: z.number().min(0),
    insuranceProvider: z.string().min(1),
    status: z.enum(["Open", "Under Review", "Resolved", "Closed"]).default("Open"),
});

const updateAccidentSchema = z.object({
    vehicleId: z.string().optional(),
    driverId: z.string().optional(),
    date: z.string().optional(),
    location: z.string().optional(),
    damageLevel: z.enum(["Low", "Medium", "High", "Severe"]).optional(),
    actualCost: z.number().optional(),
    insuranceProvider: z.string().optional(),
    status: z.enum(["Open", "Under Review", "Resolved", "Closed"]).optional(),
});

module.exports = {
    createAccidentSchema,
    updateAccidentSchema,
};
