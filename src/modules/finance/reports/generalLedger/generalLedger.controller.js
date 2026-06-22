const service = require("./generalLedger.service");

const getGeneralLedger = async (req, res) => {
    const result = await service.getGeneralLedger(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getGeneralLedger };
