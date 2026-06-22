const Budget = require("./budget.model");

const calculateVariance = (allocated, spent) => {
    return allocated - spent;
};

const createBudget = async (payload) => {
    return Budget.create({
        ...payload,
        spentAmount: payload.spentAmount || 0,
    });
};

const getAllBudgets = async () => {
    const budgets = await Budget.find().sort({ createdAt: -1 });

    return budgets.map((b) => ({
        ...b.toObject(),
        variance: calculateVariance(b.allocatedAmount, b.spentAmount),
    }));
};

const getBudgetById = async (id) => {
    const budget = await Budget.findById(id);

    if (!budget) {
        const error = new Error("Budget not found");
        error.statusCode = 404;
        throw error;
    }

    return {
        ...budget.toObject(),
        variance: calculateVariance(
            budget.allocatedAmount,
            budget.spentAmount
        ),
    };
};

const updateBudget = async (id, payload) => {
    const budget = await Budget.findById(id);

    if (!budget) {
        const error = new Error("Budget not found");
        error.statusCode = 404;
        throw error;
    }

    Object.assign(budget, payload);

    await budget.save();

    return {
        ...budget.toObject(),
        variance: calculateVariance(
            budget.allocatedAmount,
            budget.spentAmount
        ),
    };
};

const deleteBudget = async (id) => {
    const budget = await Budget.findById(id);

    if (!budget) {
        const error = new Error("Budget not found");
        error.statusCode = 404;
        throw error;
    }

    await Budget.findByIdAndDelete(id);

    return { message: "Budget deleted successfully" };
};

module.exports = {
    createBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
};
