const service = require("./payslip.service");
const {
    createPayslipSchema,
    updatePayslipSchema,
} = require("./payslip.validation");

const createPayslip = async (req, res) => {
    const validated = createPayslipSchema.parse(req.body);
    const result = await service.createPayslip(validated);

    res.status(201).json({
        success: true,
        message: "Payslip created successfully",
        data: result,
    });
};

const getAllPayslips = async (req, res) => {
    const result = await service.getAllPayslips(req.query);

    res.status(200).json({
        success: true,
        count: result.data.length,
        data: result,
    });
};

const getPayslipById = async (req, res) => {
    const result = await service.getPayslipById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updatePayslip = async (req, res) => {
    const validated = updatePayslipSchema.parse(req.body);
    const result = await service.updatePayslip(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Payslip updated successfully",
        data: result,
    });
};

const deletePayslip = async (req, res) => {
    await service.deletePayslip(req.params.id);

    res.status(200).json({
        success: true,
        message: "Payslip deleted successfully",
    });
};

module.exports = {
    createPayslip,
    getAllPayslips,
    getPayslipById,
    updatePayslip,
    deletePayslip,
};
