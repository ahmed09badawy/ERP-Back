const PayrollFileLog = require("../../hr/payrollFileLogs/payrollFileLog.models");

exports.createPayrollLog = async (req, res) => {
    try {
        const log = await PayrollFileLog.create(req.body);

        res.status(201).json({
            success: true,
            message: "Payroll log created successfully",
            data: log
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllPayrollLogs = async (req, res) => {
    try {
        const logs = await PayrollFileLog.find()
            .populate("runBy", "userName email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
