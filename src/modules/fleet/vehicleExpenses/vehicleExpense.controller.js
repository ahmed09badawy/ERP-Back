const service = require("./vehicleExpense.service");
const {
    createVehicleExpenseSchema,
    updateVehicleExpenseSchema,
} = require("./vehicleExpense.validation");

const createVehicleExpense = async (req, res) => {
    const validated = createVehicleExpenseSchema.parse(req.body);

    const result = await service.createVehicleExpense(validated);

    res.status(201).json({
        success: true,
        message: "Expense created successfully",
        data: result,
    });
};

const getAllVehicleExpenses = async (req, res) => {
    const result = await service.getAllVehicleExpenses(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getVehicleExpenseById = async (req, res) => {
    const result = await service.getVehicleExpenseById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateVehicleExpense = async (req, res) => {
    const validated = updateVehicleExpenseSchema.parse(req.body);

    const result = await service.updateVehicleExpense(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: result,
    });
};

const deleteVehicleExpense = async (req, res) => {
    const result = await service.deleteVehicleExpense(req.params.id);

    res.status(200).json({
        success: true,
        message: "Expense deleted successfully",

    });
};

module.exports = {
    createVehicleExpense,
    getAllVehicleExpenses,
    getVehicleExpenseById,
    updateVehicleExpense,
    deleteVehicleExpense,
};
