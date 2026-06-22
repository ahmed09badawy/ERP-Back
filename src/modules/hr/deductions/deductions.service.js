const Deduction = require("./deductions.model");

const createDeduction = async (data) => {
    return await Deduction.create(data);
};

const getAllDeductions = async (query) => {
    const { page = 1, limit = 10, employeeInfo, company, branch } = query;

    const filter = { isDeleted: false };

    if (employeeInfo) filter.employeeInfo = employeeInfo;
    if (company) filter.company = company;
    if (branch) filter.branch = branch;

    const skip = (Number(page) - 1) * Number(limit);

    const deductions = await Deduction.find(filter)
        .populate("employeeInfo")
        .populate("company")
        .populate("branch")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Deduction.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        data: deductions,
    };
};

const getDeductionById = async (id) => {
    const deduction = await Deduction.findOne({ _id: id, isDeleted: false })
        .populate("employeeInfo")
        .populate("company")
        .populate("branch");

    if (!deduction) {
        throw new Error("Deduction not found");
    }

    return deduction;
};

const updateDeduction = async (id, data) => {
    const deduction = await Deduction.findOne({ _id: id, isDeleted: false });

    if (!deduction) {
        throw new Error("Deduction not found");
    }

    Object.assign(deduction, data);
    await deduction.save();

    return deduction;
};

const deleteDeduction = async (id) => {
    const deduction = await Deduction.findOne({ _id: id, isDeleted: false });

    if (!deduction) {
        throw new Error("Deduction not found");
    }

    deduction.isDeleted = true;
    await deduction.save();

    return true;
};

module.exports = {
    createDeduction,
    getAllDeductions,
    getDeductionById,
    updateDeduction,
    deleteDeduction,
};
