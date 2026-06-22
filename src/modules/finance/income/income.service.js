const Income = require("./income.model");
const Counter = require("../../assets/counter.model");

const generateIncomeId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "income" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `IN${counter.seq}`;
};

const createIncome = async (payload) => {
    const incomeId = await generateIncomeId();

    const incomePayload = {
        ...payload,
        incomeId,
    };

    return Income.create(incomePayload);
};

const getAllIncome = async (query) => {
    const filter = { isDeleted: false };

    if (query.incomeId) {
        filter.incomeId = { $regex: query.incomeId, $options: "i" };
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
        Income.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Income.countDocuments(filter),
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

const getIncomeById = async (id) => {
    const income = await Income.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!income) {
        const error = new Error("Income not found");
        error.statusCode = 404;
        throw error;
    }

    return income;
};

const updateIncome = async (id, payload) => {
    const income = await Income.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!income) {
        const error = new Error("Income not found");
        error.statusCode = 404;
        throw error;
    }

    Object.assign(income, payload);
    await income.save();

    return income;
};

const deleteIncome = async (id) => {
    const income = await Income.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!income) {
        const error = new Error("Income not found");
        error.statusCode = 404;
        throw error;
    }

    income.isDeleted = true;
    await income.save();

    return {
        message: "Income deleted successfully",
    };
};

module.exports = {
    createIncome,
    getAllIncome,
    getIncomeById,
    updateIncome,
    deleteIncome,
};
