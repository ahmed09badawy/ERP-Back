const service = require("./promotionHistory.service");

const getPromotionHistoryReport = async (req, res) => {
    const result = await service.getPromotionHistoryReport(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getPromotionHistoryReport };
