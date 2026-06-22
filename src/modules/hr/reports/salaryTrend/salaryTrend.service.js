const Payroll = require("../../payroll/payroll.model");

const getSalaryTrendReport = async (filters) => {
    const year = Number(filters.year || new Date().getFullYear());

    const payrolls = await Payroll.find({
        payrollYear: year,
    });

    const monthly = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        totalNetSalary: 0,
        totalGrossSalary: 0,
        employeesCount: 0,
        averageNetSalary: 0,
    }));

    payrolls.forEach((payroll) => {
        const monthIndex = payroll.payrollMonth - 1;

        if (monthIndex >= 0 && monthIndex < 12) {
            monthly[monthIndex].totalNetSalary += payroll.netSalary || 0;
            monthly[monthIndex].totalGrossSalary += payroll.grossSalary || 0;
            monthly[monthIndex].employeesCount += 1;
        }
    });

    monthly.forEach((m) => {
        m.averageNetSalary =
            m.employeesCount === 0
                ? 0
                : Number((m.totalNetSalary / m.employeesCount).toFixed(2));
    });

    const highestMonth = [...monthly].sort(
        (a, b) => b.totalNetSalary - a.totalNetSalary
    )[0];

    const lowestMonth = [...monthly].sort(
        (a, b) => a.totalNetSalary - b.totalNetSalary
    )[0];

    return {
        year,
        highestMonth,
        lowestMonth,
        monthly,
    };
};

module.exports = { getSalaryTrendReport };
