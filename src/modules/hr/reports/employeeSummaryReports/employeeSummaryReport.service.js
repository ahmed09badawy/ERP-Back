const Employee = require("../../employee/employee.model");

const getEmployeeSummaryReport = async (filters) => {
    const query = {};

    if (filters.departmentId) {
        query.departmentId = filters.departmentId;
    }

    if (filters.branchId) {
        query.branchId = filters.branchId;
    }

    if (filters.status) {
        query.employmentStatus = filters.status;
    }

    const employees = await Employee.find(query)
        .populate("departmentId")
        .populate("branchId")
        .populate("jobId")
        .populate("directManagerId");

    return employees.map((emp) => {
        const basicSalary = 0;
        const allowances = 0;

        return {
            employeeId: emp._id,
            name: emp.fullName || "N/A",

            jobTitle:
                emp.jobId?.jobName ||
                emp.jobId?.name ||
                "N/A",

            department:
                emp.departmentId?.departmentName ||
                emp.departmentId?.name ||
                "N/A",

            branch:
                emp.branchId?.branchName ||
                emp.branchId?.name ||
                "N/A",

            employmentStatus: emp.employeeStatus || "ACTIVE",

            joiningDate: emp.hireDate || null,

            basicSalary,
            allowances,
            totalSalary: basicSalary + allowances,

            manager:
                emp.directManagerId?.fullName ||
                emp.directManagerId?.name ||
                "N/A",

            contractEndDate: emp.contractEndDate || null,
        };
    });
};

module.exports = { getEmployeeSummaryReport };
