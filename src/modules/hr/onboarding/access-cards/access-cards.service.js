const AccessCard = require("./access-cards.model");
const Employee = require("../../employee/employee.model");

const getEmployeeCode = async (employeeId) => {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
        throw new Error("Employee not found");
    }

    return employee.employeeCode;
};

const createAccessCard = async (data) => {
    data.empCode = await getEmployeeCode(data.employeeInfo);

    if (data.status === "Done" && !data.doneAt) {
        data.doneAt = new Date();
    }

    return await AccessCard.create(data);
};

const getAllAccessCards = async (query) => {
    const { page = 1, limit = 10, employeeInfo, status } = query;

    const filter = { isDeleted: false };

    if (employeeInfo) filter.employeeInfo = employeeInfo;
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const cards = await AccessCard.find(filter)
        .populate("employeeInfo")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await AccessCard.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        data: cards,
    };
};

const getAccessCardById = async (id) => {
    const card = await AccessCard.findOne({
        _id: id,
        isDeleted: false,
    }).populate("employeeInfo");

    if (!card) {
        throw new Error("Access Card not found");
    }

    return card;
};

const updateAccessCard = async (id, data) => {
    const card = await AccessCard.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!card) {
        throw new Error("Access Card not found");
    }

    if (data.employeeInfo) {
        data.empCode = await getEmployeeCode(data.employeeInfo);
    }

    if (data.status === "Done" && !card.doneAt) {
        data.doneAt = new Date();
    }

    Object.assign(card, data);
    await card.save();

    return card;
};

const deleteAccessCard = async (id) => {
    const card = await AccessCard.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!card) {
        throw new Error("Access Card not found");
    }

    card.isDeleted = true;
    await card.save();

    return true;
};

module.exports = {
    createAccessCard,
    getAllAccessCards,
    getAccessCardById,
    updateAccessCard,
    deleteAccessCard,
};
