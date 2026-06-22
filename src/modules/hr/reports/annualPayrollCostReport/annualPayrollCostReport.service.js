const Payroll = require("../../payroll/payroll.model");

const getAnnualPayrollCostReport = async (filters) => {
    const year = Number(filters.year || new Date().getFullYear());

    const records = await Payroll.find({
        payrollYear: year,
    }).populate({
        path: "employeeId",
        populate: {
            path: "departmentId",
        },
    });

    const grouped = {};

    records.forEach((payroll) => {
        const deptName =
            payroll.employeeId?.departmentId?.departmentName ||
            "Unknown";

        if (!grouped[deptName]) {
            grouped[deptName] = {
                departmentName: deptName,
                totalAnnualPayroll: 0,
                totalAllowances: 0,
                totalDeductions: 0,
                numberOfEmployees: new Set(),
                year,
            };
        }

        grouped[deptName].totalAnnualPayroll += payroll.netSalary || 0;
        grouped[deptName].totalAllowances +=
            payroll.totalAllowances || 0;
        grouped[deptName].totalDeductions +=
            payroll.totalDeductions || 0;

        grouped[deptName].numberOfEmployees.add(
            payroll.employeeId?._id.toString()
        );
    });

    return Object.values(grouped).map((dept) => {
        const employeeCount = dept.numberOfEmployees.size;

        return {
            departmentName: dept.departmentName,
            totalAnnualPayroll: dept.totalAnnualPayroll,
            totalAllowances: dept.totalAllowances,
            totalDeductions: dept.totalDeductions,
            numberOfEmployees: employeeCount,
            averageCostPerEmployee:
                employeeCount > 0
                    ? dept.totalAnnualPayroll / employeeCount
                    : 0,
            year: dept.year,
        };
    });
};

module.exports = { getAnnualPayrollCostReport };
