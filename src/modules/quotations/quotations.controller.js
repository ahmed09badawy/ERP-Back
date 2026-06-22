const quotationService = require("./quotations.service");
const {
    createQuotationSchema,
    updateQuotationSchema,
} = require("./quotations.validation");

const createQuotation = async (req, res) => {
    const validatedData = createQuotationSchema.parse(req.body);
    const result = await quotationService.createQuotation(validatedData, req.user?._id);

    res.status(201).json({
        success: true,
        message: "Quotation created successfully",
        data: result,
    });
};

const getQuotations = async (req, res) => {
    const result = await quotationService.getQuotations();

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

const getQuotationById = async (req, res) => {
    const result = await quotationService.getQuotationById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateQuotation = async (req, res) => {
    const validatedData = updateQuotationSchema.parse(req.body);
    const result = await quotationService.updateQuotation(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Quotation updated successfully",
        data: result,
    });
};

const deleteQuotation = async (req, res) => {
    await quotationService.deleteQuotation(req.params.id);

    res.status(200).json({
        success: true,
        message: "Quotation deleted successfully",
    });
};

module.exports = {
    createQuotation,
    getQuotations,
    getQuotationById,
    updateQuotation,
    deleteQuotation,
};
