const purchaseInvoiceService = require("./purchaseInvoice.service");
const { createPurchaseInvoiceSchema, updatePurchaseInvoiceSchema } = require("./purchaseInvoice.validation");

const createPurchaseInvoice = async (req, res) => {
    const validatedData = createPurchaseInvoiceSchema.parse(req.body);
    const result = await purchaseInvoiceService.createPurchaseInvoice(validatedData);

    res.status(201).json({
        success: true,
        message: "Purchase invoice created successfully",
        data: result,
    });
};

const getPurchaseInvoices = async (req, res) => {
    const result = await purchaseInvoiceService.getPurchaseInvoices();

    res.status(200).json({
        success: true,
        message: "Purchase invoices retrieved successfully",
        data: result,
    });
};

const getPurchaseInvoiceById = async (req, res) => {
    const result = await purchaseInvoiceService.getPurchaseInvoiceById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Purchase invoice details retrieved successfully",
        data: result,
    });
};

const updatePurchaseInvoice = async (req, res) => {
    const validatedData = updatePurchaseInvoiceSchema.parse(req.body);
    const result = await purchaseInvoiceService.updatePurchaseInvoice(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Purchase invoice updated successfully",
        data: result,
    });
};

const deletePurchaseInvoice = async (req, res) => {
    await purchaseInvoiceService.deletePurchaseInvoice(req.params.id);

    res.status(200).json({
        success: true,
        message: "Purchase invoice deleted successfully",
    });
};

module.exports = {
    createPurchaseInvoice,
    getPurchaseInvoices,
    getPurchaseInvoiceById,
    updatePurchaseInvoice,
    deletePurchaseInvoice,
};
