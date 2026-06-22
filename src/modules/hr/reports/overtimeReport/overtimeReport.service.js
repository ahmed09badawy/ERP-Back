const Attendance = require("../../attendance/attendance.model");

const getOvertimeReport = async (filters) => {
    const query = {};

    if (filters.employeeId) {
        query.employeeId = filters.employeeId;
    }

    if (filters.startDate && filters.endDate) {
        query.date = {
            $gte: new Date(filters.startDate),
            $lte: new Date(filters.endDate),
        };
    }

    const records = await Attendance.find(query)
        .populate({
            path: "employeeId",
            populate: { path: "departmentId" }
        });

    return records.map((record) => ({
        employeeName: record.employeeId?.fullName || record.employeeId?.name,
        date: record.date,
        overtimeHours: record.overtimeHours || 0,
        rate: record.overtimeRate || 0,
        overtimeAmount: (record.overtimeHours || 0) * (record.overtimeRate || 0),
        department: record.employeeId?.departmentId?.departmentName || "N/A",
    }));
};

module.exports = { getOvertimeReport };
