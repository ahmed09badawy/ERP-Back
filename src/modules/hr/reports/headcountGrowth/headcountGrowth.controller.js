const service = require("./headcountGrowth.service");

const getHeadcountGrowthReport = async (req, res) => {
    const result = await service.getHeadcountGrowthReport(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getHeadcountGrowthReport };
