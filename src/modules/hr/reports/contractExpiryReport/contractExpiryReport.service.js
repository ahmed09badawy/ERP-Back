const Employee = require("../../employee/employee.model");

const getContractsExpiryReport = async (filters) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = Number(filters.days || 30);

    const targetDate = new Date(today);
    targetDate.setDate(targetDate.getDate() + days);
    targetDate.setHours(23, 59, 59, 999);

    const records = await Employee.find({
        contractEndDate: {
            $lte: targetDate,
            $gte: today,
        },
    })
        .populate("departmentId")
        .populate("jobId");

    return records.map((emp) => {
        const diffDays = Math.ceil(
            (new Date(emp.contractEndDate) - today) / (1000 * 60 * 60 * 24)
        );

        return {
            employeeName: emp.fullName || "N/A",
            employeeId: emp._id,

            department:
                emp.departmentId?.departmentName ||
                emp.departmentId?.name ||
                "N/A",

            jobTitle:
                emp.jobId?.jobName ||
                emp.jobId?.name ||
                "N/A",

            contractStartDate: emp.contractStartDate || null,
            contractEndDate: emp.contractEndDate || null,
            daysUntilExpiry: diffDays,
            status: diffDays <= 7 ? "URGENT" : "WARNING",
        };
    });
};

module.exports = { getContractsExpiryReport };
