const service = require("./expenses.service");
const {
    createExpensesSchema,
    updateExpensesSchema,
} = require("./expenses.validation");

const createExpense = async (req, res) => {
    const validated = createExpensesSchema.parse(req.body);

    const result = await service.createExpense(validated);

    res.status(201).json({
        success: true,
        message: "Expense created successfully",
        data: result,
    });
};

const getAllExpenses = async (req, res) => {
    const result = await service.getAllExpenses(req.query);

    res.status(200).json({
        success: true,
        message: "Expenses fetched successfully",
        data: result.items,
        pagination: result.pagination,
    });
};

const getExpenseById = async (req, res) => {
    const result = await service.getExpenseById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Expense fetched successfully",
        data: result,
    });
};

const updateExpense = async (req, res) => {
    const validated = updateExpensesSchema.parse(req.body);

    const result = await service.updateExpense(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: result,
    });
};

const deleteExpense = async (req, res) => {
    const result = await service.deleteExpense(req.params.id);

    res.status(200).json({
        success: true,
        ...result,
    });
};

module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
};
