const service = require("./attendanceReport.service");

const getAttendanceReport = async (req, res) => {
    const result = await service.getAttendanceReport(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

module.exports = { getAttendanceReport };
