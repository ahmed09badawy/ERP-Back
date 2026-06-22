const service = require("./gosiContributionReport.service");

const getGosiContributionReport = async (req, res) => {
    const result = await service.getGosiContributionReport(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

module.exports = { getGosiContributionReport };
