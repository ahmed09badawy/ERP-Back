const Payroll = require("../../payroll/payroll.model");

const getMonthlyPayrollReport = async (filters) => {
    const query = {};

    if (filters.month) {
        query.payrollMonth = Number(filters.month);
    }

    if (filters.year) {
        query.payrollYear = Number(filters.year);
    }

    const records = await Payroll.find(query)
        .populate("employeeId");

    return records.map((payroll) => ({
        employeeId: payroll.employeeId?._id,
        name:
            payroll.employeeId?.fullName ||
            payroll.employeeId?.name ||
            "N/A",

        basicSalary: payroll.basicSalary || 0,
        allowances: payroll.totalAllowances || 0,
        deductions: payroll.totalDeductions || 0,
        overtimeAmount: payroll.overtimeAmount || 0,
        netSalary: payroll.netSalary || 0,
        payrollMonth: payroll.payrollMonth,
        payrollYear: payroll.payrollYear,
        paymentStatus: payroll.paymentStatus || "PENDING",
    }));
};

module.exports = { getMonthlyPayrollReport };
