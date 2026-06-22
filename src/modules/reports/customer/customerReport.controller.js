const service = require("./customerReport.service");

const getCustomerReport = async (req, res) => {
    const data = await service.getCustomerReport(req.query);

    res.status(200).json({
        success: true,
        count: data.length,
        data,
    });
};

module.exports = {
    getCustomerReport,
};
