const ChartOfAccount = require("./coa.model");

const createCoa = async (payload) => {
    const existing = await ChartOfAccount.findOne({
        accountCode: payload.accountCode.toUpperCase(),
    });

    if (existing) {
        const error = new Error("Account code already exists");
        error.statusCode = 400;
        throw error;
    }

    return ChartOfAccount.create({
        ...payload,
        accountCode: payload.accountCode.toUpperCase(),
    });
};

const getAllCoa = async (query = {}) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (query.accountType) filter.accountType = query.accountType;
    if (query.accountCategory) filter.accountCategory = query.accountCategory;
    if (query.paymentMethod) filter.paymentMethod = query.paymentMethod;
    if (query.isActive !== undefined) filter.isActive = query.isActive === "true";

    const [accounts, total] = await Promise.all([
        ChartOfAccount.find(filter)
            .populate("parentAccountId")
            .sort({ accountCode: 1 })
            .skip(skip)
            .limit(limit),
        ChartOfAccount.countDocuments(filter)
    ]);

    return {
        accounts,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    };
};

const getCoaById = async (id) => {
    const account = await ChartOfAccount.findById(id).populate("parentAccountId");

    if (!account) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }

    return account;
};

const updateCoa = async (id, payload) => {
    const account = await ChartOfAccount.findById(id);

    if (!account) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }

    Object.assign(account, payload);

    if (payload.accountCode) {
        account.accountCode = payload.accountCode.toUpperCase();
    }

    await account.save();

    return ChartOfAccount.findById(id).populate("parentAccountId");
};

const deleteCoa = async (id) => {
    const account = await ChartOfAccount.findById(id);

    if (!account) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }

    await ChartOfAccount.findByIdAndDelete(id);

    return { message: "Account deleted successfully" };
};

module.exports = {
    createCoa,
    getAllCoa,
    getCoaById,
    updateCoa,
    deleteCoa,
};
