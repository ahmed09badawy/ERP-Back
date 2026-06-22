const Performance = require("../../performance/performance.model");

const getPerformanceReport = async (filters) => {
    const query = {};

    if (filters.period) {
        query.period = filters.period;
    }

    const records = await Performance.find(query)
        .populate("employeeId managerId");

    return records.map((record) => ({
        employeeName: record.employeeId?.fullName || record.employeeId?.name,
        manager: record.managerId?.fullName || record.managerId?.name,
        evaluationScore: record.evaluationScore,
        period: record.period,
        status: record.status,
    }));
};

module.exports = { getPerformanceReport };
