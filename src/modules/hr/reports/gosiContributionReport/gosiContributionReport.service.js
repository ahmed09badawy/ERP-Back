const Payroll = require("../../payroll/payroll.model");

const EMPLOYEE_RATE = 0.1;
const EMPLOYER_RATE = 0.12;

const getGosiContributionReport = async (filters) => {
    const query = {};

    if (filters.month) {
        query.payrollMonth = Number(filters.month);
    }

    if (filters.year) {
        query.payrollYear = Number(filters.year);
    }

    const records = await Payroll.find(query).populate({
        path: "employeeId",
        select: "fullName nationality gosiId"
    });

    return records.map((payroll) => {
        const basicSalary = payroll.basicSalary || 0;

        const employeeContribution = basicSalary * EMPLOYEE_RATE;
        const employerContribution = basicSalary * EMPLOYER_RATE;

        return {
            employeeName:
                payroll.employeeId?.fullName ||
                "N/A",

            employeeId: payroll.employeeId?._id || null,

            nationality:
                payroll.employeeId?.nationality || "N/A",

            gosiId:
                payroll.employeeId?.gosiId &&
                    payroll.employeeId.gosiId.trim() !== ""
                    ? payroll.employeeId.gosiId
                    : "N/A",

            basicSalary,
            employeeContribution,
            employerContribution,
            total: employeeContribution + employerContribution,
            month: payroll.payrollMonth,
            year: payroll.payrollYear,
        };
    });
};

module.exports = { getGosiContributionReport };
