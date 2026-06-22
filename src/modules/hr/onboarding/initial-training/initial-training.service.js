const InitialTraining = require("./initial-training.model");
const Employee = require("../../employee/employee.model");

const getEmployeeCode = async (employeeId) => {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
        throw new Error("Employee not found");
    }

    return employee.employeeCode;
};

const createInitialTraining = async (data) => {
    data.empCode = await getEmployeeCode(data.employeeInfo);

    if ((data.status === "Done" || data.status === "Paid") && !data.doneAt) {
        data.doneAt = new Date();
    }

    return await InitialTraining.create(data);
};

const getAllInitialTrainings = async (query) => {
    const { page = 1, limit = 10, employeeInfo, status, department } = query;

    const filter = { isDeleted: false };

    if (employeeInfo) filter.employeeInfo = employeeInfo;
    if (status) filter.status = status;
    if (department) filter.department = department;

    const skip = (Number(page) - 1) * Number(limit);

    const trainings = await InitialTraining.find(filter)
        .populate("employeeInfo")
        .populate("department")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await InitialTraining.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        data: trainings,
    };
};

const getInitialTrainingById = async (id) => {
    const training = await InitialTraining.findOne({
        _id: id,
        isDeleted: false,
    })
        .populate("employeeInfo")
        .populate("department");

    if (!training) {
        throw new Error("Initial Training not found");
    }

    return training;
};

const updateInitialTraining = async (id, data) => {
    const training = await InitialTraining.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!training) {
        throw new Error("Initial Training not found");
    }

    if (data.employeeInfo) {
        data.empCode = await getEmployeeCode(data.employeeInfo);
    }

    if ((data.status === "Done" || data.status === "Paid") && !training.doneAt) {
        data.doneAt = new Date();
    }

    Object.assign(training, data);
    await training.save();

    return training;
};

const deleteInitialTraining = async (id) => {
    const training = await InitialTraining.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!training) {
        throw new Error("Initial Training not found");
    }

    training.isDeleted = true;
    await training.save();

    return true;
};

module.exports = {
    createInitialTraining,
    getAllInitialTrainings,
    getInitialTrainingById,
    updateInitialTraining,
    deleteInitialTraining,
};
