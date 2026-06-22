const Category = require("./category.model");

const createCategory = async (payload) => {
    const existing = await Category.findOne({
        name: payload.name,
        isDeleted: false,
    });

    if (existing) {
        const error = new Error("Category already exists");
        error.statusCode = 400;
        throw error;
    }

    return Category.create({
        name: payload.name,
        description: payload.description || "",
        incomeAccountId: payload.incomeAccountId,
        expenseAccountId: payload.expenseAccountId,
        inventoryValuationAccountId: payload.inventoryValuationAccountId,
        costOfGoodsSoldAccountId: payload.costOfGoodsSoldAccountId,
        status: payload.status || "ACTIVE",
    });
};

const getCategories = async (query = {}) => {
    const filter = { isDeleted: false };

    if (query.name) {
        filter.name = { $regex: query.name, $options: "i" };
    }

    if (query.status) {
        filter.status = query.status;
    }

    return Category.find(filter)
        .populate("incomeAccountId")
        .populate("expenseAccountId")
        .populate("inventoryValuationAccountId")
        .populate("costOfGoodsSoldAccountId")
        .sort({ createdAt: -1 });
};

const getCategoryById = async (id) => {
    const category = await Category.findOne({
        _id: id,
        isDeleted: false,
    })
        .populate("incomeAccountId")
        .populate("expenseAccountId")
        .populate("inventoryValuationAccountId")
        .populate("costOfGoodsSoldAccountId");

    if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
    }

    return category;
};

const updateCategory = async (id, payload) => {
    const category = await Category.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.name && payload.name !== category.name) {
        const existing = await Category.findOne({
            name: payload.name,
            isDeleted: false,
            _id: { $ne: id },
        });

        if (existing) {
            const error = new Error("Category already exists");
            error.statusCode = 400;
            throw error;
        }

        category.name = payload.name;
    }

    if (payload.description !== undefined) category.description = payload.description;
    if (payload.status !== undefined) category.status = payload.status;
    if (payload.incomeAccountId !== undefined) category.incomeAccountId = payload.incomeAccountId;
    if (payload.expenseAccountId !== undefined) category.expenseAccountId = payload.expenseAccountId;
    if (payload.inventoryValuationAccountId !== undefined) category.inventoryValuationAccountId = payload.inventoryValuationAccountId;
    if (payload.costOfGoodsSoldAccountId !== undefined) category.costOfGoodsSoldAccountId = payload.costOfGoodsSoldAccountId;

    await category.save();

    return Category.findById(id)
        .populate("incomeAccountId")
        .populate("expenseAccountId")
        .populate("inventoryValuationAccountId")
        .populate("costOfGoodsSoldAccountId");
};

const deleteCategory = async (id) => {
    const category = await Category.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
    }

    category.isDeleted = true;
    await category.save();

    return true;
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
