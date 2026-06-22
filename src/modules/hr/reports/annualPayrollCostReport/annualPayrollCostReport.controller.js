const service = require("./annualPayrollCostReport.service");

const getAnnualPayrollCostReport = async (req, res) => {
    const result = await service.getAnnualPayrollCostReport(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

module.exports = { getAnnualPayrollCostReport };
