const service = require("./employeeSummaryReport.service");

const getEmployeeSummaryReport = async (req, res) => {
    const result = await service.getEmployeeSummaryReport(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

module.exports = { getEmployeeSummaryReport };
