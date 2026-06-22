const Employee = require("../../employee/employee.model");

const getDocumentsExpiryReport = async (filters) => {
    const today = new Date();
    const days = Number(filters.days || 30);

    const targetDate = new Date();
    targetDate.setDate(today.getDate() + days);

    const employees = await Employee.find({
        "documents.expiryDate": {
            $lte: targetDate,
            $gte: today,
        },
    });

    const result = [];

    employees.forEach((emp) => {
        emp.documents.forEach((doc) => {
            if (
                doc.expiryDate >= today &&
                doc.expiryDate <= targetDate
            ) {
                const diffDays = Math.ceil(
                    (new Date(doc.expiryDate) - today) /
                    (1000 * 60 * 60 * 24)
                );

                result.push({
                    employeeName: emp.fullName || emp.name,
                    documentType: doc.documentType,
                    documentNumber: doc.documentNumber,
                    issueDate: doc.issueDate,
                    expiryDate: doc.expiryDate,
                    daysLeft: diffDays,
                    status: diffDays <= 7 ? "URGENT" : "WARNING",
                });
            }
        });
    });

    return result;
};

module.exports = { getDocumentsExpiryReport };
