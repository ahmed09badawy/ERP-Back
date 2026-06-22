const service = require("./leaveReport.service");

const getLeaveReport = async (req, res) => {
    const result = await service.getLeaveReport(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

module.exports = { getLeaveReport };
