const Attendance = require("../../attendance/attendance.model");

const getAttendanceReport = async (filters) => {
    const query = {};

    if (filters.employeeId) {
        query.employeeId = filters.employeeId;
    }

    if (filters.status) {
        query.status = filters.status;
    }

    if (filters.fromDate && filters.toDate) {
        query.date = {
            $gte: new Date(filters.fromDate),
            $lte: new Date(filters.toDate),
        };
    }

    const records = await Attendance.find(query)
        .populate("employeeId");

    return records.map((record) => {
        const totalHours = record.totalHours || 0;
        const overtime = totalHours > 8 ? totalHours - 8 : 0;

        return {
            employeeName:
                record.employeeId?.fullName ||
                record.employeeId?.name ||
                "N/A",

            date: record.date,
            checkInTime: record.checkIn,
            checkOutTime: record.checkOut,
            totalHours,
            lateInMinutes: record.lateInMinutes || 0,
            earlyOut: record.earlyOut || false,
            overtime,
            status: record.status || "PRESENT",
        };
    });
};

module.exports = { getAttendanceReport };
