const { z } = require("zod");

const createAssetSchema = z.object({
    assetName: z.string().min(1, "Asset name is required"),
    model: z.string().min(1, "Model is required"),
    serialNumber: z.string().min(1, "Serial number is required"),
    brand: z.string().min(1, "Brand is required"),
    warrantyPeriod: z.number().min(0, "Warranty period must be 0 or more"),
    warrantyEndDate: z.string().min(1, "Warranty end date is required"),
    warrantyNumber: z.string().min(1, "Warranty number is required"),
    barcode: z.string().min(1, "Barcode is required"),
    category: z.enum(["Furniture", "IT Equipment", "Vehicle", "Machinery"]),
    location: z.string().min(1, "Location is required"),
    cost: z.number().min(0, "Cost must be 0 or more"),
    purchaseDate: z.string().min(1, "Purchase date is required"),
    assignedTo: z.string().min(1, "Assigned to is required"),
    state: z.enum(["Present", "Active", "In Maintenance", "Retired", "Lost", "Scrap"]),
    notes: z.string().min(1, "Notes is required"),
    image: z.string().optional(),
    attachments: z.array(z.string()).optional(),
});

const updateAssetSchema = z.object({
    assetName: z.string().min(1).optional(),
    model: z.string().min(1).optional(),
    serialNumber: z.string().min(1).optional(),
    brand: z.string().min(1).optional(),
    warrantyPeriod: z.number().min(0).optional(),
    warrantyEndDate: z.string().optional(),
    warrantyNumber: z.string().min(1).optional(),
    barcode: z.string().min(1).optional(),
    category: z.enum(["Furniture", "IT Equipment", "Vehicle", "Machinery"]).optional(),
    location: z.string().min(1).optional(),
    cost: z.number().min(0).optional(),
    purchaseDate: z.string().optional(),
    assignedTo: z.string().min(1).optional(),
    state: z.enum(["Present", "Active", "In Maintenance", "Retired", "Lost", "Scrap"]).optional(),
    notes: z.string().min(1).optional(),
    image: z.string().optional(),
    attachments: z.array(z.string()).optional(),
});

module.exports = {
    createAssetSchema,
    updateAssetSchema,
};
