const EndOfService = require("./endOfService.model");
const Employee = require("../employee/employee.model");
const generateCode = require("../../../common/utils/generate-code");

const getEmployeeCode = async (employeeId) => {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
        throw new Error("Employee not found");
    }

    return employee.employeeCode;
};

const calculateYearsOfService = (startDate, lastWorkingDay) => {
    const start = new Date(startDate);
    const end = new Date(lastWorkingDay);

    const diff = end.getTime() - start.getTime();
    const years = diff / (1000 * 60 * 60 * 24 * 365);

    return Number(years.toFixed(2));
};

const createEndOfService = async (data) => {
    let eosId;
    let isDuplicate = true;

    while (isDuplicate) {
        eosId = await generateCode("end_of_service", "EOS");
        const existing = await EndOfService.findOne({ eosId });
        if (!existing) {
            isDuplicate = false;
        }
    }

    data.eosId = eosId;
    data.code = eosId; // Add code for consistency
    data.empCode = await getEmployeeCode(data.employeeInfo);
    data.yearsOfService = calculateYearsOfService(data.startDate, data.lastWorkingDay);

    return await EndOfService.create(data);
};

const getAllEndOfServices = async (query) => {
    const { page = 1, limit = 10, employeeInfo, status, eosType, department } = query;

    const filter = { isDeleted: false };

    if (employeeInfo) filter.employeeInfo = employeeInfo;
    if (status) filter.status = status;
    if (eosType) filter.eosType = eosType;
    if (department) filter.department = department;

    const skip = (Number(page) - 1) * Number(limit);

    const records = await EndOfService.find(filter)
        .populate("employeeInfo")
        .populate("department")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await EndOfService.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        data: records,
    };
};

const getEndOfServiceById = async (id) => {
    const record = await EndOfService.findOne({
        _id: id,
        isDeleted: false,
    })
        .populate("employeeInfo")
        .populate("department");

    if (!record) {
        throw new Error("End of service record not found");
    }

    return record;
};

const updateEndOfService = async (id, data) => {
    const record = await EndOfService.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!record) {
        throw new Error("End of service record not found");
    }

    delete data.eosId;

    if (data.employeeInfo) {
        data.empCode = await getEmployeeCode(data.employeeInfo);
    }

    const startDate = data.startDate || record.startDate;
    const lastWorkingDay = data.lastWorkingDay || record.lastWorkingDay;

    if (startDate && lastWorkingDay) {
        data.yearsOfService = calculateYearsOfService(startDate, lastWorkingDay);
    }

    if (data.status === "Rejected" && !data.rejectedReason) {
        throw new Error("Rejected reason is required");
    }

    Object.assign(record, data);
    await record.save();

    return record;
};

const deleteEndOfService = async (id) => {
    const record = await EndOfService.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!record) {
        throw new Error("End of service record not found");
    }

    record.isDeleted = true;
    await record.save();

    return true;
};

module.exports = {
    createEndOfService,
    getAllEndOfServices,
    getEndOfServiceById,
    updateEndOfService,
    deleteEndOfService,
};
