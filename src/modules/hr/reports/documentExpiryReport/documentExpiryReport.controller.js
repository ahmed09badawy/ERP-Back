const service = require("./documentExpiryReport.service");

const getDocumentsExpiryReport = async (req, res) => {
    const result = await service.getDocumentsExpiryReport(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

module.exports = { getDocumentsExpiryReport };
