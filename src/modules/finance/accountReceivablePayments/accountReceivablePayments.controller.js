const service = require("./accountReceivablePayments.service");
const {
    createARPaymentSchema,
    updateARPaymentSchema,
} = require("./accountReceivablePayments.validation");

const createARPayment = async (req, res) => {
    const validated = createARPaymentSchema.parse(req.body);
    const result = await service.createARPayment(validated);

    res.status(201).json({
        success: true,
        data: result,
    });
};

const getAllARPayments = async (req, res) => {
    const result = await service.getAllARPayments();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getARPaymentById = async (req, res) => {
    const result = await service.getARPaymentById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateARPayment = async (req, res) => {
    const validated = updateARPaymentSchema.parse(req.body);
    const result = await service.updateARPayment(
        req.params.id,
        validated
    );

    res.status(200).json({
        success: true,
        data: result,
    });
};

const deleteARPayment = async (req, res) => {
    const result = await service.deleteARPayment(req.params.id);

    res.status(200).json({
        success: true,
        ...result,
    });
};

module.exports = {
    createARPayment,
    getAllARPayments,
    getARPaymentById,
    updateARPayment,
    deleteARPayment,
};
