const service = require("./income.service");
const {
    createIncomeSchema,
    updateIncomeSchema,
} = require("./income.validation");

const createIncome = async (req, res) => {
    const validated = createIncomeSchema.parse(req.body);

    const result = await service.createIncome(validated);

    res.status(201).json({
        success: true,
        message: "Income created successfully",
        data: result,
    });
};

const getAllIncome = async (req, res) => {
    const result = await service.getAllIncome(req.query);

    res.status(200).json({
        success: true,
        message: "Income fetched successfully",
        data: result.items,
        pagination: result.pagination,
    });
};

const getIncomeById = async (req, res) => {
    const result = await service.getIncomeById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Income fetched successfully",
        data: result,
    });
};

const updateIncome = async (req, res) => {
    const validated = updateIncomeSchema.parse(req.body);

    const result = await service.updateIncome(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Income updated successfully",
        data: result,
    });
};

const deleteIncome = async (req, res) => {
    const result = await service.deleteIncome(req.params.id);

    res.status(200).json({
        success: true,
        ...result,
    });
};

module.exports = {
    createIncome,
    getAllIncome,
    getIncomeById,
    updateIncome,
    deleteIncome,
};
