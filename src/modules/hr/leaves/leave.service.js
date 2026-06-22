const Leave = require("./leave.model");
const Employee = require("../employee/employee.model");
const generateCode = require("../../../common/utils/generate-code");

const calculateDays = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);

    const diffMs = end - start;
    const diffDays = diffMs / (1000 * 60 * 60 * 24) + 1;

    return diffDays > 0 ? diffDays : 0;
};

const createLeave = async (payload) => {
    const leaveId = await generateCode("leave", "LEV");

    const employee = await Employee.findById(payload.employeeId);
    if (!employee) {
        const error = new Error("Employee not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.approverId) {
        const approver = await Employee.findById(payload.approverId);
        if (!approver) {
            const error = new Error("Approver not found");
            error.statusCode = 404;
            throw error;
        }
    }

    const days = calculateDays(payload.fromDate, payload.toDate);

    const leave = await Leave.create({
        ...payload,
        leaveId,
        fromDate: new Date(payload.fromDate),
        toDate: new Date(payload.toDate),
        days,
        approverId: payload.approverId || null,
    });

    return Leave.findById(leave._id).populate("employeeId approverId");
};

const getLeaves = async () => {
    return Leave.find()
        .populate("employeeId approverId")
        .sort({ createdAt: -1 });
};

const getLeaveById = async (id) => {
    const leave = await Leave.findById(id).populate("employeeId approverId");

    if (!leave) {
        const error = new Error("Leave not found");
        error.statusCode = 404;
        throw error;
    }

    return leave;
};

const updateLeave = async (id, payload) => {
    const leave = await Leave.findById(id);

    if (!leave) {
        const error = new Error("Leave not found");
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
        leave.employeeId = payload.employeeId;
    }

    if (payload.approverId) {
        const approver = await Employee.findById(payload.approverId);
        if (!approver) {
            const error = new Error("Approver not found");
            error.statusCode = 404;
            throw error;
        }
        leave.approverId = payload.approverId;
    }

    if (payload.leaveType !== undefined) leave.leaveType = payload.leaveType;
    if (payload.fromDate !== undefined) leave.fromDate = new Date(payload.fromDate);
    if (payload.toDate !== undefined) leave.toDate = new Date(payload.toDate);
    if (payload.remainingBalance !== undefined) leave.remainingBalance = payload.remainingBalance;
    if (payload.reason !== undefined) leave.reason = payload.reason;
    if (payload.attachment !== undefined) leave.attachment = payload.attachment;
    if (payload.workflowStatus !== undefined) leave.workflowStatus = payload.workflowStatus;
    if (payload.status !== undefined) leave.status = payload.status;
    if (payload.approverId === null) leave.approverId = null;

    leave.days = calculateDays(leave.fromDate, leave.toDate);

    await leave.save();

    return Leave.findById(leave._id).populate("employeeId approverId");
};

const deleteLeave = async (id) => {
    const leave = await Leave.findById(id);

    if (!leave) {
        const error = new Error("Leave not found");
        error.statusCode = 404;
        throw error;
    }

    await leave.deleteOne();

    return { message: "Leave record deleted successfully" };
};

module.exports = {
    createLeave,
    getLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave,
};
