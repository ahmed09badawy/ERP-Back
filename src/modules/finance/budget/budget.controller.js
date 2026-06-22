const service = require("./budget.service");
const {
    createBudgetSchema,
    updateBudgetSchema,
} = require("./budget.validation");

const createBudget = async (req, res) => {
    const validated = createBudgetSchema.parse(req.body);
    const result = await service.createBudget(validated);

    res.status(201).json({
        success: true,
        data: result,
    });
};

const getAllBudgets = async (req, res) => {
    const result = await service.getAllBudgets();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getBudgetById = async (req, res) => {
    const result = await service.getBudgetById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateBudget = async (req, res) => {
    const validated = updateBudgetSchema.parse(req.body);
    const result = await service.updateBudget(
        req.params.id,
        validated
    );

    res.status(200).json({
        success: true,
        data: result,
    });
};

const deleteBudget = async (req, res) => {
    const result = await service.deleteBudget(req.params.id);

    res.status(200).json({
        success: true,
        ...result,
    });
};

module.exports = {
    createBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
};
