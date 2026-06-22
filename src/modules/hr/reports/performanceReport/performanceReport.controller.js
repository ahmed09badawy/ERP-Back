const service = require("./performanceReport.service");

const getPerformanceReport = async (req, res) => {
    const result = await service.getPerformanceReport(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

module.exports = { getPerformanceReport };
