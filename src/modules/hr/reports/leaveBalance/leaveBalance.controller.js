const service = require("./leaveBalance.service");

const getLeaveBalanceReport = async (req, res) => {
    const result = await service.getLeaveBalanceReport(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getLeaveBalanceReport };
