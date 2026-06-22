const service = require("./payrollVariance.service");

const getPayrollVarianceReport = async (req, res) => {
    const result = await service.getPayrollVarianceReport(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getPayrollVarianceReport };
