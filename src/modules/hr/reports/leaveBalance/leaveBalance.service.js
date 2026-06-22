const Leave = require("../../leaves/leave.model");
const Employee = require("../../employee/employee.model");

const ANNUAL_LEAVE_DEFAULT = 21;

const getLeaveBalanceReport = async (filters) => {
    const year = Number(filters.year || new Date().getFullYear());

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const employees = await Employee.find().select("fullName employeeCode");

    const leaves = await Leave.find({
        createdAt: { $gte: startDate, $lte: endDate },
    }).populate("employeeId", "fullName employeeCode");

    const balanceMap = {};

    employees.forEach((emp) => {
        balanceMap[emp._id.toString()] = {
            employeeId: emp._id,
            employeeCode: emp.employeeCode,
            employeeName: emp.fullName,
            annualBalance: ANNUAL_LEAVE_DEFAULT,
            usedDays: 0,
            pendingDays: 0,
            remainingBalance: ANNUAL_LEAVE_DEFAULT,
        };
    });

    leaves.forEach((leave) => {
        const empId = leave.employeeId?._id?.toString();
        if (!empId || !balanceMap[empId]) return;

        const days = leave.days || 0;

        if (leave.status === "APPROVED") {
            balanceMap[empId].usedDays += days;
        }

        if (leave.status === "PENDING") {
            balanceMap[empId].pendingDays += days;
        }
    });

    const result = Object.values(balanceMap).map((emp) => {
        emp.remainingBalance =
            emp.annualBalance - emp.usedDays - emp.pendingDays;
        return emp;
    });

    result.sort((a, b) => a.remainingBalance - b.remainingBalance);

    return {
        year,
        employees: result,
    };
};

module.exports = { getLeaveBalanceReport };
