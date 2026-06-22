const service = require("./hiring.service");

const getHiringReport = async (req, res) => {
    const result = await service.getHiringReport(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getHiringReport };
