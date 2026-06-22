const CareerHistory = require("../../careerHistory/careerHistory.model");

const getPromotionHistoryReport = async (filters) => {
    const year = Number(filters.year || new Date().getFullYear());

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const promotions = await CareerHistory.find({
        changeType: "PROMOTION",
        effectiveDate: {
            $gte: startDate,
            $lte: endDate,
        },
    })
        .populate("employeeId", "fullName employeeCode")
        .populate("previousJobId", "jobName")
        .populate("newJobId", "jobName")
        .sort({ effectiveDate: -1 });

    const totalPromotions = promotions.length;

    const totalSalaryIncrease = promotions.reduce((sum, item) => {
        return sum + ((item.newSalary || 0) - (item.previousSalary || 0));
    }, 0);

    const averageSalaryIncrease =
        totalPromotions === 0
            ? 0
            : Number((totalSalaryIncrease / totalPromotions).toFixed(2));

    return {
        year,
        totalPromotions,
        totalSalaryIncrease,
        averageSalaryIncrease,
        promotions,
    };
};

module.exports = { getPromotionHistoryReport };
