const salesInvoiceService = require("./salesInvoices.service");
const {
    createSalesInvoiceSchema,
    updateSalesInvoiceSchema,
} = require("./salesInvoices.validation");

const createSalesInvoice = async (req, res) => {
    const validatedData = createSalesInvoiceSchema.parse(req.body);
    const result = await salesInvoiceService.createSalesInvoice(
        validatedData,
        req.user?._id
    );

    res.status(201).json({
        success: true,
        message: "Sales invoice created successfully",
        data: result,
    });
};

const getSalesInvoices = async (req, res) => {
    const result = await salesInvoiceService.getSalesInvoices();

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

const getSalesInvoiceById = async (req, res) => {
    const result = await salesInvoiceService.getSalesInvoiceById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateSalesInvoice = async (req, res) => {
    const validatedData = updateSalesInvoiceSchema.parse(req.body);
    const result = await salesInvoiceService.updateSalesInvoice(
        req.params.id,
        validatedData
    );

    res.status(200).json({
        success: true,
        message: "Sales invoice updated successfully",
        data: result,
    });
};

const deleteSalesInvoice = async (req, res) => {
    await salesInvoiceService.deleteSalesInvoice(req.params.id);

    res.status(200).json({
        success: true,
        message: "Sales invoice deleted successfully",
    });
};

module.exports = {
    createSalesInvoice,
    getSalesInvoices,
    getSalesInvoiceById,
    updateSalesInvoice,
    deleteSalesInvoice,
};
