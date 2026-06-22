const Employee = require("../../employee/employee.model");

const getTurnoverReport = async (filters) => {
    const fromDate = filters.fromDate
        ? new Date(filters.fromDate)
        : new Date(new Date().getFullYear(), 0, 1);

    const toDate = filters.toDate
        ? new Date(filters.toDate)
        : new Date();

    const totalEmployeesAtStart = await Employee.countDocuments({
        hireDate: { $lte: fromDate },
    });

    const terminatedEmployees = await Employee.countDocuments({
        employeeStatus: "TERMINATED",
        terminationDate: {
            $gte: fromDate,
            $lte: toDate,
        },
    });

    const currentEmployees = await Employee.countDocuments({
        employeeStatus: "ACTIVE",
    });

    const averageEmployees =
        (totalEmployeesAtStart + currentEmployees) / 2;

    const turnoverRate =
        averageEmployees === 0
            ? 0
            : ((terminatedEmployees / averageEmployees) * 100).toFixed(2);

    return {
        fromDate,
        toDate,
        totalEmployeesAtStart,
        currentEmployees,
        terminatedEmployees,
        turnoverRate: `${turnoverRate}%`,
    };
};

module.exports = { getTurnoverReport };
