const service = require("./accountPayablePayments.service");
const {
    createAPPaymentSchema,
    updateAPPaymentSchema,
} = require("./accountPayablePayments.validation");

const createAPPayment = async (req, res) => {
    const validated = createAPPaymentSchema.parse(req.body);
    const result = await service.createAPPayment(validated);

    res.status(201).json({
        success: true,
        data: result,
    });
};

const getAllAPPayments = async (req, res) => {
    const result = await service.getAllAPPayments();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getAPPaymentById = async (req, res) => {
    const result = await service.getAPPaymentById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateAPPayment = async (req, res) => {
    const validated = updateAPPaymentSchema.parse(req.body);
    const result = await service.updateAPPayment(
        req.params.id,
        validated
    );

    res.status(200).json({
        success: true,
        data: result,
    });
};

const deleteAPPayment = async (req, res) => {
    const result = await service.deleteAPPayment(req.params.id);

    res.status(200).json({
        success: true,
        ...result,
    });
};

module.exports = {
    createAPPayment,
    getAllAPPayments,
    getAPPaymentById,
    updateAPPayment,
    deleteAPPayment,
};
