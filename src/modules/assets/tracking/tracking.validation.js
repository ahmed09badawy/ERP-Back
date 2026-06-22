const { z } = require("zod");

const createTrackingSchema = z.object({
    assetId: z.string().min(1, "Asset ID is required"),
    currentLocation: z.string().min(1, "Current location is required"),
    movementHistory: z.string().min(1, "Movement history is required"),
    notes: z.string().optional(),
});

const updateTrackingSchema = z.object({
    assetId: z.string().optional(),
    currentLocation: z.string().optional(),
    movementHistory: z.string().optional(),
    notes: z.string().optional(),
});

module.exports = {
    createTrackingSchema,
    updateTrackingSchema,
};
