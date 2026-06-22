const service = require("./payroll.service");
const { createPayrollSchema, updatePayrollSchema } = require("./payroll.validation");

const createPayroll = async (req, res) => {
    const validatedData = createPayrollSchema.parse(req.body);
    const result = await service.createPayroll(validatedData);

    res.status(201).json({
        success: true,
        message: "Payroll created successfully",
        data: result,
    });
};

const getPayrolls = async (req, res) => {
    const result = await service.getPayrolls();

    res.status(200).json({
        success: true,
        message: "Payrolls retrieved successfully",
        data: result,
    });
};

const getPayrollById = async (req, res) => {
    const result = await service.getPayrollById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Payroll details retrieved successfully",
        data: result,
    });
};

const updatePayroll = async (req, res) => {
    const validatedData = updatePayrollSchema.parse(req.body);
    const result = await service.updatePayroll(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Payroll updated successfully",
        data: result,
    });
};

const deletePayroll = async (req, res) => {
    await service.deletePayroll(req.params.id);

    res.status(200).json({
        success: true,
        message: "Payroll deleted successfully",
    });
};

module.exports = {
    createPayroll,
    getPayrolls,
    getPayrollById,
    updatePayroll,
    deletePayroll,
};
