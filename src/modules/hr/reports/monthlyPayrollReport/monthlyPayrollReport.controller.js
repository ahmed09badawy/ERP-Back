const service = require("./monthlyPayrollReport.service");

const getMonthlyPayrollReport = async (req, res) => {
    const result = await service.getMonthlyPayrollReport(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

module.exports = { getMonthlyPayrollReport };
