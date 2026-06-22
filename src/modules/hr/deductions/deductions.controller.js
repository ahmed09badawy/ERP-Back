const service = require("./deductions.service");
const {
    createDeductionSchema,
    updateDeductionSchema,
} = require("./deductions.validation");

const createDeduction = async (req, res) => {
    const validated = createDeductionSchema.parse(req.body);
    const result = await service.createDeduction(validated);

    res.status(201).json({
        success: true,
        message: "Deduction created successfully",
        data: result,
    });
};

const getAllDeductions = async (req, res) => {
    const result = await service.getAllDeductions(req.query);

    res.status(200).json({
        success: true,
        count: result.data.length,
        data: result,
    });
};

const getDeductionById = async (req, res) => {
    const result = await service.getDeductionById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateDeduction = async (req, res) => {
    const validated = updateDeductionSchema.parse(req.body);
    const result = await service.updateDeduction(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Deduction updated successfully",
        data: result,
    });
};

const deleteDeduction = async (req, res) => {
    await service.deleteDeduction(req.params.id);

    res.status(200).json({
        success: true,
        message: "Deduction deleted successfully",
    });
};

module.exports = {
    createDeduction,
    getAllDeductions,
    getDeductionById,
    updateDeduction,
    deleteDeduction,
};
