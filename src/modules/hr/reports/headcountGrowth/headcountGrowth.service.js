const Employee = require("../../employee/employee.model");

const getHeadcountGrowthReport = async (filters) => {
    const year = Number(filters.year || new Date().getFullYear());

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const employees = await Employee.find({
        $or: [
            { hireDate: { $gte: startDate, $lte: endDate } },
            { terminationDate: { $gte: startDate, $lte: endDate } },
        ],
    });

    const monthly = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        hired: 0,
        terminated: 0,
        netGrowth: 0,
    }));

    employees.forEach((emp) => {
        if (emp.hireDate) {
            const hireMonth = new Date(emp.hireDate).getMonth();
            monthly[hireMonth].hired += 1;
        }

        if (emp.terminationDate) {
            const termMonth = new Date(emp.terminationDate).getMonth();
            monthly[termMonth].terminated += 1;
        }
    });

    monthly.forEach((m) => {
        m.netGrowth = m.hired - m.terminated;
    });

    const currentHeadcount = await Employee.countDocuments({
        employeeStatus: "ACTIVE",
    });

    return {
        year,
        currentHeadcount,
        monthly,
    };
};

module.exports = { getHeadcountGrowthReport };
