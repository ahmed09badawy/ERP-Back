const { z } = require("zod");

const createSupplierRatingSchema = z.object({
  supplierId: z.string().min(1),
  quality: z.number().min(1).max(5),
  delivery: z.number().min(1).max(5),
  service: z.number().min(1).max(5),
  compliance: z.number().min(1).max(5),
  overallRating: z.number().min(1).max(5),
});

const updateSupplierRatingSchema = z.object({
  supplierId: z.string().min(1).optional(),
  quality: z.number().min(1).max(5).optional(),
  delivery: z.number().min(1).max(5).optional(),
  service: z.number().min(1).max(5).optional(),
  compliance: z.number().min(1).max(5).optional(),
  overallRating: z.number().min(1).max(5).optional(),
});

module.exports = {
  createSupplierRatingSchema,
  updateSupplierRatingSchema,
};
