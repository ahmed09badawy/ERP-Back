const Penalty = require("./penalty.model");
const Employee = require("../employee/employee.model");
const generateCode = require("../../../common/utils/generate-code");

const createPenalty = async (data) => {
    const employee = await Employee.findById(data.employeeInfo);
    if (!employee) {
        throw new Error("Employee not found");
    }

    const penaltyId = await generateCode("penalty", "PEN");

    const penalty = await Penalty.create({
        ...data,
        penaltyId,
        date: new Date(data.date),
    });

    return Penalty.findById(penalty._id).populate("employeeInfo");
};

const getAllPenalties = async (query) => {
    const { page = 1, limit = 10, employeeInfo, status, penaltyType, date } = query;

    const filter = { isDeleted: false };

    if (employeeInfo) filter.employeeInfo = employeeInfo;
    if (status) filter.status = status;
    if (penaltyType) filter.penaltyType = penaltyType;

    if (date) {
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1);
        filter.date = { $gte: start, $lt: end };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const penalties = await Penalty.find(filter)
        .populate("employeeInfo")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Penalty.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        data: penalties,
    };
};

const getPenaltyById = async (id) => {
    const penalty = await Penalty.findOne({ _id: id, isDeleted: false })
        .populate("employeeInfo");

    if (!penalty) {
        throw new Error("Penalty not found");
    }

    return penalty;
};

const updatePenalty = async (id, data) => {
    const penalty = await Penalty.findOne({ _id: id, isDeleted: false });

    if (!penalty) {
        throw new Error("Penalty not found");
    }

    if (data.employeeInfo) {
        const employee = await Employee.findById(data.employeeInfo);
        if (!employee) {
            throw new Error("Employee not found");
        }
    }

    delete data.penaltyId;

    Object.assign(penalty, data);

    if (data.date) {
        penalty.date = new Date(data.date);
    }

    await penalty.save();

    return Penalty.findById(penalty._id).populate("employeeInfo");
};

const deletePenalty = async (id) => {
    const penalty = await Penalty.findOne({ _id: id, isDeleted: false });

    if (!penalty) {
        throw new Error("Penalty not found");
    }

    penalty.isDeleted = true;
    await penalty.save();

    return true;
};

module.exports = {
    createPenalty,
    getAllPenalties,
    getPenaltyById,
    updatePenalty,
    deletePenalty,
};
