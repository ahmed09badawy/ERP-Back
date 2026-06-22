const service = require("./profitAndloss.service");

const getProfitAndLoss = async (req, res) => {
    const result = await service.getProfitAndLoss(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getProfitAndLoss };
