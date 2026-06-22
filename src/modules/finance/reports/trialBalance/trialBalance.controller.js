const service = require("./trialBalance.service");

const getTrialBalance = async (req, res) => {
    const result = await service.getTrialBalance(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getTrialBalance };
