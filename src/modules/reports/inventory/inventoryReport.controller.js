const service = require("./inventoryReport.service");

const getInventoryReport = async (req, res) => {
    const data = await service.getInventoryReport(req.query);

    res.status(200).json({
        success: true,
        count: data.length,
        data,
    });
};

module.exports = {
    getInventoryReport,
};
