const service = require("./production-report.service");

const getProductionReports = async (req, res) => {
    try {
        const result = await service.getProductionReports();

        res.status(200).json({
            success: true,
            message: "Production reports fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getProductionReports,
};
