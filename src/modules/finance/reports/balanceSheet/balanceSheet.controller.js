const service = require("./balanceSheet.service");

const getBalanceSheet = async (req, res) => {
    const result = await service.getBalanceSheet(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getBalanceSheet };
