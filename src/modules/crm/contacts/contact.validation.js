const { z } = require("zod");

const createContactSchema = z.object({
    name: z.string(),
    nameEn: z.string().optional(),
    companyName: z.string().optional(),
    companyNameEn: z.string().optional(),
    phone: z.string().optional(),
    mobile: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    address: z.string().optional(),
    notes: z.string().optional(),
    isCustomer: z.boolean().optional(),
    isSupplier: z.boolean().optional(),
    groupId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Group ID").optional(),
    pricelistId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Pricelist ID").optional(),
    tags: z.string().optional(),
    location: z.string().optional(),
    rating: z.number().min(0).max(5).optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
});

const updateContactSchema = createContactSchema.partial();

module.exports = {
    createContactSchema,
    updateContactSchema,
};
