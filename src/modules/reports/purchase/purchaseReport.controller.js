const purchaseReportService = require("./purchaseReport.service");

const getPurchaseReport = async (req, res) => {
    const data = await purchaseReportService.getPurchaseReport(req.query);

    res.status(200).json({
        success: true,
        count: data.length,
        data,
    });
};

module.exports = {
    getPurchaseReport,
};
