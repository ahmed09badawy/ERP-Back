const Payroll = require("../../payroll/payroll.model");

const getPayrollVarianceReport = async (filters) => {
    const year = Number(filters.year || new Date().getFullYear());
    const currentMonth = Number(filters.currentMonth || new Date().getMonth() + 1);
    const previousMonth = Number(filters.previousMonth || currentMonth - 1);

    const currentPayrolls = await Payroll.find({
        payrollYear: year,
        payrollMonth: currentMonth,
    });

    const previousPayrolls = await Payroll.find({
        payrollYear: year,
        payrollMonth: previousMonth,
    });

    const summarize = (rows) => {
        return rows.reduce(
            (acc, row) => {
                acc.totalGross += row.grossSalary || 0;
                acc.totalNet += row.netSalary || 0;
                acc.employeesCount += 1;
                return acc;
            },
            {
                totalGross: 0,
                totalNet: 0,
                employeesCount: 0,
            }
        );
    };

    const current = summarize(currentPayrolls);
    const previous = summarize(previousPayrolls);

    const grossVariance = current.totalGross - previous.totalGross;
    const netVariance = current.totalNet - previous.totalNet;

    const grossVariancePercent =
        previous.totalGross === 0
            ? 0
            : Number(
                ((grossVariance / previous.totalGross) * 100).toFixed(2)
            );

    const netVariancePercent =
        previous.totalNet === 0
            ? 0
            : Number(
                ((netVariance / previous.totalNet) * 100).toFixed(2)
            );

    return {
        year,
        currentMonth,
        previousMonth,
        current,
        previous,
        variance: {
            grossVariance,
            grossVariancePercent,
            netVariance,
            netVariancePercent,
            trend:
                grossVariance > 0
                    ? "INCREASE"
                    : grossVariance < 0
                        ? "DECREASE"
                        : "NO_CHANGE",
        },
    };
};

module.exports = { getPayrollVarianceReport };
