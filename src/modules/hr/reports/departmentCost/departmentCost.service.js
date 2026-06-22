const Payroll = require("../../payroll/payroll.model");
const Employee = require("../../employee/employee.model");

const getDepartmentCostReport = async (filters) => {
    const year = Number(filters.year || new Date().getFullYear());
    const month = Number(filters.month || new Date().getMonth() + 1);

    const payrolls = await Payroll.find({
        payrollYear: year,
        payrollMonth: month,
    }).populate({
        path: "employeeId",
        select: "departmentId fullName",
        populate: {
            path: "departmentId",
            select: "departmentName",
        },
    });

    const departmentMap = {};

    payrolls.forEach((payroll) => {
        const employee = payroll.employeeId;
        if (!employee || !employee.departmentId) return;

        const deptId = employee.departmentId._id.toString();
        const deptName = employee.departmentId.departmentName;

        if (!departmentMap[deptId]) {
            departmentMap[deptId] = {
                departmentId: deptId,
                departmentName: deptName,
                employeesCount: 0,
                totalGrossSalary: 0,
                totalNetSalary: 0,
                averageCostPerEmployee: 0,
            };
        }

        departmentMap[deptId].employeesCount += 1;
        departmentMap[deptId].totalGrossSalary += payroll.grossSalary || 0;
        departmentMap[deptId].totalNetSalary += payroll.netSalary || 0;
    });

    const result = Object.values(departmentMap).map((dept) => {
        dept.averageCostPerEmployee =
            dept.employeesCount === 0
                ? 0
                : Number(
                    (dept.totalGrossSalary / dept.employeesCount).toFixed(2)
                );
        return dept;
    });

    result.sort((a, b) => b.totalGrossSalary - a.totalGrossSalary);

    return {
        year,
        month,
        departments: result,
    };
};

module.exports = { getDepartmentCostReport };
