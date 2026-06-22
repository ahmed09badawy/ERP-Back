const Leave = require("../../leaves/leave.model");

const getLeaveReport = async (filters) => {
    const query = {};

    if (filters.employeeId) {
        query.employeeId = filters.employeeId;
    }

    if (filters.status) {
        query.status = filters.status;
    }

    if (filters.leaveType) {
        query.leaveType = filters.leaveType;
    }

    if (filters.fromDate && filters.toDate) {
        query.fromDate = {
            $gte: new Date(filters.fromDate),
            $lte: new Date(filters.toDate),
        };
    }

    const records = await Leave.find(query)
        .populate({
            path: "employeeId",
            populate: {
                path: "directManagerId",
                select: "fullName",
            },
        })
        .populate("approverId");

    return records.map((leave) => {
        // 🔥 تحديد approver بذكاء
        let approverName = "Pending Approval";

        if (leave.approverId) {
            approverName =
                leave.approverId.fullName ||
                leave.approverId.name ||
                "N/A";
        } else if (leave.employeeId?.directManagerId) {
            approverName =
                leave.employeeId.directManagerId.fullName ||
                "Manager";
        }

        return {
            employeeName:
                leave.employeeId?.fullName ||
                leave.employeeId?.name ||
                "N/A",

            leaveType: leave.leaveType,

            startDate: leave.fromDate || null,
            endDate: leave.toDate || null,

            totalDays: leave.days || 0,

            status: leave.status || "PENDING",

            approver: approverName,

            balanceAfterLeave: leave.remainingBalance || 0,
        };
    });
};

module.exports = { getLeaveReport };
