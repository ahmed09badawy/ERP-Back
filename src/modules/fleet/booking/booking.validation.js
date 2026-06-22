const { z } = require("zod");

const createBookingSchema = z.object({
    vehicleId: z.string(),
    requestedBy: z.string().min(1),
    startDate: z.string(),
    endDate: z.string(),
    purpose: z.string().min(1),
    status: z.enum(["Pending", "Approved", "Rejected", "Completed"]).default("Pending"),
});

const updateBookingSchema = z.object({
    vehicleId: z.string().optional(),
    requestedBy: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    purpose: z.string().optional(),
    status: z.enum(["Pending", "Approved", "Rejected", "Completed"]).optional(),
});

module.exports = {
    createBookingSchema,
    updateBookingSchema,
};
