const promotionService = require("./promotion.service");
const { createPromotionSchema, updatePromotionSchema } = require("./promotion.validations");

const createPromotion = async (req, res) => {
    const validatedData = createPromotionSchema.parse(req.body);
    const result = await promotionService.createPromotion(validatedData);

    res.status(201).json({
        success: true,
        message: "Promotion created successfully",
        data: result,
    });
};

const getPromotions = async (req, res) => {
    const result = await promotionService.getPromotions();

    res.status(200).json({
        success: true,
        message: "Promotions retrieved successfully",
        data: result,
    });
};

const getPromotionById = async (req, res) => {
    const result = await promotionService.getPromotionById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Promotion details retrieved successfully",
        data: result,
    });
};

const updatePromotion = async (req, res) => {
    const validatedData = updatePromotionSchema.parse(req.body);
    const result = await promotionService.updatePromotion(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Promotion updated successfully",
        data: result,
    });
};

const deletePromotion = async (req, res) => {
    await promotionService.deletePromotion(req.params.id);

    res.status(200).json({
        success: true,
        message: "Promotion deleted successfully",
    });
};

module.exports = {
    createPromotion,
    getPromotions,
    getPromotionById,
    updatePromotion,
    deletePromotion,
};
