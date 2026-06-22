const service = require("./turnoverReport.service");

const getTurnoverReport = async (req, res) => {
    const result = await service.getTurnoverReport(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getTurnoverReport };
