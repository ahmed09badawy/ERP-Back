const service = require("./contractExpiryReport.service");

const getContractsExpiryReport = async (req, res) => {
    const result = await service.getContractsExpiryReport(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

module.exports = { getContractsExpiryReport };
