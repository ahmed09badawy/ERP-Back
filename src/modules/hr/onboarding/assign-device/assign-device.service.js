const AssignDevice = require("./assign-device.model");
const Employee = require("../../employee/employee.model");

const getEmployeeCode = async (employeeId) => {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
        throw new Error("Employee not found");
    }

    return employee.employeeCode;
};

const createAssignDevice = async (data) => {
    data.empCode = await getEmployeeCode(data.employeeInfo);

    if (data.status === "Done" && !data.doneAt) {
        data.doneAt = new Date();
    }

    return await AssignDevice.create(data);
};

const getAllAssignDevices = async (query) => {
    const { page = 1, limit = 10, employeeInfo, status } = query;

    const filter = { isDeleted: false };

    if (employeeInfo) filter.employeeInfo = employeeInfo;
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const devices = await AssignDevice.find(filter)
        .populate("employeeInfo")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await AssignDevice.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        data: devices,
    };
};

const getAssignDeviceById = async (id) => {
    const device = await AssignDevice.findOne({
        _id: id,
        isDeleted: false,
    }).populate("employeeInfo");

    if (!device) {
        throw new Error("Assign Device not found");
    }

    return device;
};

const updateAssignDevice = async (id, data) => {
    const device = await AssignDevice.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!device) {
        throw new Error("Assign Device not found");
    }

    if (data.employeeInfo) {
        data.empCode = await getEmployeeCode(data.employeeInfo);
    }

    if (data.status === "Done" && !device.doneAt) {
        data.doneAt = new Date();
    }

    Object.assign(device, data);
    await device.save();

    return device;
};

const deleteAssignDevice = async (id) => {
    const device = await AssignDevice.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!device) {
        throw new Error("Assign Device not found");
    }

    device.isDeleted = true;
    await device.save();

    return true;
};

module.exports = {
    createAssignDevice,
    getAllAssignDevices,
    getAssignDeviceById,
    updateAssignDevice,
    deleteAssignDevice,
};
