const Attendance = require("./attendance.model");
const Employee = require("../employee/employee.model");
const generateCode = require("../../../common/utils/generate-code");

const calculateWorkingHours = ({ checkInTime, checkOutTime, breakDuration }) => {
    if (!checkInTime || !checkOutTime) return 0;

    const diffMs = new Date(checkOutTime) - new Date(checkInTime);
    const diffHours = diffMs / (1000 * 60 * 60);

    const result = diffHours - (breakDuration || 0) / 60;
    return result > 0 ? Number(result.toFixed(2)) : 0;
};

const createAttendance = async (payload) => {
    const attendanceCode = await generateCode("attendance", "ATT");

    const employee = await Employee.findById(payload.employeeId);
    if (!employee) {
        const error = new Error("Employee not found");
        error.statusCode = 404;
        throw error;
    }

    const existingAttendance = await Attendance.findOne({
        employeeId: payload.employeeId,
        date: new Date(payload.date),
    });

    if (existingAttendance) {
        const error = new Error("Attendance already exists for this employee on this date");
        error.statusCode = 400;
        throw error;
    }

    const workingHours = calculateWorkingHours({
        checkInTime: payload.checkInTime,
        checkOutTime: payload.checkOutTime,
        breakDuration: payload.breakDuration || 0,
    });

    const attendance = await Attendance.create({
        ...payload,
        attendanceCode,
        date: new Date(payload.date),
        checkInTime: payload.checkInTime ? new Date(payload.checkInTime) : null,
        checkOutTime: payload.checkOutTime ? new Date(payload.checkOutTime) : null,
        workingHours,
    });

    return Attendance.findById(attendance._id).populate("employeeId");
};

const getAttendanceList = async () => {
    return Attendance.find()
        .populate("employeeId")
        .sort({ date: -1, createdAt: -1 });
};

const getAttendanceById = async (id) => {
    const attendance = await Attendance.findById(id).populate("employeeId");

    if (!attendance) {
        const error = new Error("Attendance record not found");
        error.statusCode = 404;
        throw error;
    }

    return attendance;
};

const updateAttendance = async (id, payload) => {
    const attendance = await Attendance.findById(id);

    if (!attendance) {
        const error = new Error("Attendance record not found");
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
        attendance.employeeId = payload.employeeId;
    }

    if (payload.date !== undefined) attendance.date = new Date(payload.date);

    if (payload.checkInTime !== undefined) {
        attendance.checkInTime = payload.checkInTime ? new Date(payload.checkInTime) : null;
    }

    if (payload.checkOutTime !== undefined) {
        attendance.checkOutTime = payload.checkOutTime ? new Date(payload.checkOutTime) : null;
    }

    if (payload.shiftType !== undefined) attendance.shiftType = payload.shiftType;
    if (payload.breakDuration !== undefined) attendance.breakDuration = payload.breakDuration;
    if (payload.overtimeHours !== undefined) attendance.overtimeHours = payload.overtimeHours;
    if (payload.lateMinutes !== undefined) attendance.lateMinutes = payload.lateMinutes;
    if (payload.earlyLeaveMinutes !== undefined) attendance.earlyLeaveMinutes = payload.earlyLeaveMinutes;
    if (payload.status !== undefined) attendance.status = payload.status;
    if (payload.notes !== undefined) attendance.notes = payload.notes;

    attendance.workingHours = calculateWorkingHours({
        checkInTime: attendance.checkInTime,
        checkOutTime: attendance.checkOutTime,
        breakDuration: attendance.breakDuration,
    });

    await attendance.save();

    return Attendance.findById(attendance._id).populate("employeeId");
};

const deleteAttendance = async (id) => {
    const attendance = await Attendance.findById(id);

    if (!attendance) {
        const error = new Error("Attendance record not found");
        error.statusCode = 404;
        throw error;
    }

    await attendance.deleteOne();

    return { message: "Attendance record deleted successfully" };
};

module.exports = {
    createAttendance,
    getAttendanceList,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
};
