const Expense = require("./expenses.model");
const Counter = require("../../assets/counter.model");

const generateExpenseId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "expense" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `EX${String(counter.seq).padStart(3, "0")}`;
};

const createExpense = async (payload) => {
    const expenseId = await generateExpenseId();

    return Expense.create({
        ...payload,
        expenseId,
    });
};

const getAllExpenses = async (query) => {
    const filter = { isDeleted: false };

    if (query.expenseId) {
        filter.expenseId = { $regex: query.expenseId, $options: "i" };
    }

    if (query.status) {
        filter.status = query.status;
    }

    if (query.date) {
        const startDate = new Date(query.date);
        const endDate = new Date(query.date);
        endDate.setHours(23, 59, 59, 999);

        filter.date = {
            $gte: startDate,
            $lte: endDate,
        };
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        Expense.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Expense.countDocuments(filter),
    ]);

    return {
        items,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        },
    };
};

const getExpenseById = async (id) => {
    const expense = await Expense.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!expense) {
        const error = new Error("Expense not found");
        error.statusCode = 404;
        throw error;
    }

    return expense;
};

const updateExpense = async (id, payload) => {
    const expense = await Expense.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!expense) {
        const error = new Error("Expense not found");
        error.statusCode = 404;
        throw error;
    }

    Object.assign(expense, payload);
    await expense.save();

    return expense;
};

const deleteExpense = async (id) => {
    const expense = await Expense.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!expense) {
        const error = new Error("Expense not found");
        error.statusCode = 404;
        throw error;
    }

    expense.isDeleted = true;
    await expense.save();

    return {
        message: "Expense deleted successfully",
    };
};

module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
};
