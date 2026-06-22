const service = require("./salaryTrend.service");

const getSalaryTrendReport = async (req, res) => {
    const result = await service.getSalaryTrendReport(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getSalaryTrendReport };
