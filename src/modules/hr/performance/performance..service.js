const Performance = require("./performance.model");
const Employee = require("../employee/employee.model");
const generateCode = require("../../../common/utils/generate-code");

const createPerformance = async (payload) => {
    const performanceCode = await generateCode("performance", "PERF");

    const employee = await Employee.findById(payload.employeeId);
    if (!employee) {
        const error = new Error("Employee not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.managerId) {
        const manager = await Employee.findById(payload.managerId);
        if (!manager) {
            const error = new Error("Manager not found");
            error.statusCode = 404;
            throw error;
        }
    }

    const record = await Performance.create({
        ...payload,
        performanceCode,
        managerId: payload.managerId || null,
    });

    return Performance.findById(record._id).populate("employeeId managerId");
};

const getAllPerformance = async () => {
    return Performance.find()
        .populate("employeeId managerId")
        .sort({ createdAt: -1 });
};

const getPerformanceById = async (id) => {
    const record = await Performance.findById(id).populate("employeeId managerId");

    if (!record) {
        const error = new Error("Performance record not found");
        error.statusCode = 404;
        throw error;
    }

    return record;
};

const updatePerformance = async (id, payload) => {
    const record = await Performance.findById(id);

    if (!record) {
        const error = new Error("Performance record not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.employeeId) {
        const employee = await Employee.findById(payload.employeeId);
        if (!employee) {
            const error = new Error("Employee not found");
            error.statusCode = 404;
            throw error;
        }

        record.employeeId = payload.employeeId;
    }

    if (payload.managerId !== undefined) {
        if (payload.managerId) {
            const manager = await Employee.findById(payload.managerId);
            if (!manager) {
                const error = new Error("Manager not found");
                error.statusCode = 404;
                throw error;
            }
        }

        record.managerId = payload.managerId || null;
    }

    if (payload.period !== undefined) record.period = payload.period;
    if (payload.evaluationScore !== undefined) record.evaluationScore = payload.evaluationScore;
    if (payload.status !== undefined) record.status = payload.status;
    if (payload.notes !== undefined) record.notes = payload.notes;

    await record.save();

    return Performance.findById(record._id).populate("employeeId managerId");
};

const deletePerformance = async (id) => {
    const record = await Performance.findById(id);

    if (!record) {
        const error = new Error("Performance record not found");
        error.statusCode = 404;
        throw error;
    }

    await Performance.findByIdAndDelete(id);

    return { message: "Performance record deleted successfully" };
};

module.exports = {
    createPerformance,
    getAllPerformance,
    getPerformanceById,
    updatePerformance,
    deletePerformance,
};
