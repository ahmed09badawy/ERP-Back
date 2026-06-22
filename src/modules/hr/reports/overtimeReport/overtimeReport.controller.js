const service = require("../overtimeReport/overtimeReport.service");

const getOvertimeReport = async (req, res) => {
    const result = await service.getOvertimeReport(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

module.exports = { getOvertimeReport };
