const discountService = require("./discount.service");
const { createDiscountSchema, updateDiscountSchema } = require("./discount.validations");

const createDiscount = async (req, res) => {
    const validatedData = createDiscountSchema.parse(req.body);
    const result = await discountService.createDiscount(validatedData);

    res.status(201).json({
        success: true,
        message: "Discount created successfully",
        data: result,
    });
};

const getDiscounts = async (req, res) => {
    const result = await discountService.getDiscounts();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getDiscountById = async (req, res) => {
    const result = await discountService.getDiscountById(req.params.id);
    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateDiscount = async (req, res) => {
    const validatedData = updateDiscountSchema.parse(req.body);
    const result = await discountService.updateDiscount(req.params.id, validatedData);
    res.status(200).json({
        success: true,
        message: "Discount updated successfully",
        data: result,
    });
};

const deleteDiscount = async (req, res) => {
    await discountService.deleteDiscount(req.params.id);
    res.status(200).json({
        success: true,
        message: "Discount deleted successfully",
    });
};

module.exports = {
    createDiscount,
    getDiscounts,
    getDiscountById,
    updateDiscount,
    deleteDiscount,
};
