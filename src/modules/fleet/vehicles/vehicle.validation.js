const { z } = require("zod");

const createVehicleSchema = z.object({
    plateNumber: z.string().min(1, "Plate number is required"),
    model: z.string().min(1, "Model is required"),
    type: z.enum(["Sedan", "Car", "Truck", "Van", "Bus", "Motorcycle"]),
    fuelType: z.enum(["Gasoline", "Petrol", "Diesel", "Electric", "Hybrid"]),
    mileage: z.number().min(0, "Mileage cannot be negative"),
    status: z.enum(["Active", "Maintenance", "In Maintenance", "Inactive"]).default("Active"),
});

const updateVehicleSchema = z.object({
    plateNumber: z.string().min(1).optional(),
    model: z.string().min(1).optional(),
    type: z.enum(["Sedan", "Car", "Truck", "Van", "Bus", "Motorcycle"]).optional(),
    fuelType: z.enum(["Gasoline", "Petrol", "Diesel", "Electric", "Hybrid"]).optional(),
    mileage: z.number().min(0).optional(),
    status: z.enum(["Active", "Maintenance", "In Maintenance", "Inactive"]).optional(),
});

module.exports = {
    createVehicleSchema,
    updateVehicleSchema,
};
