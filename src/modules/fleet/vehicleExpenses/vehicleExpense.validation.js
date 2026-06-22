const { z } = require("zod");

const createVehicleExpenseSchema = z.object({
    vehicleId: z.string(),
    type: z.enum(["Insurance", "Registration", "Maintenance", "Fuel", "Other"]),
    amount: z.number().min(0),
    date: z.string(),
    description: z.string().optional(),
    status: z.enum(["Paid", "Pending", "Canceled"]).default("Paid"),
});

const updateVehicleExpenseSchema = z.object({
    vehicleId: z.string().optional(),
    type: z.enum(["Insurance", "Registration", "Maintenance", "Fuel", "Other"]).optional(),
    amount: z.number().optional(),
    date: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["Paid", "Pending", "Canceled"]).optional(),
});

module.exports = {
    createVehicleExpenseSchema,
    updateVehicleExpenseSchema,
};
