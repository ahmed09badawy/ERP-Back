const salesReturnService = require("./salesReturn.service");
const {
    createSalesReturnSchema,
    updateSalesReturnSchema,
} = require("./salesReturn.validation");

const createSalesReturn = async (req, res) => {
    const validatedData = createSalesReturnSchema.parse(req.body);
    const result = await salesReturnService.createSalesReturn(validatedData);

    res.status(201).json({
        success: true,
        message: "Sales return created successfully",
        data: result,
    });
};

const getSalesReturns = async (req, res) => {
    const result = await salesReturnService.getSalesReturns();

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

const getSalesReturnById = async (req, res) => {
    const result = await salesReturnService.getSalesReturnById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateSalesReturn = async (req, res) => {
    const validatedData = updateSalesReturnSchema.parse(req.body);
    const result = await salesReturnService.updateSalesReturn(
        req.params.id,
        validatedData
    );

    res.status(200).json({
        success: true,
        message: "Sales return updated successfully",
        data: result,
    });
};

const deleteSalesReturn = async (req, res) => {
    await salesReturnService.deleteSalesReturn(req.params.id);

    res.status(200).json({
        success: true,
        message: "Sales return deleted successfully",
    });
};

module.exports = {
    createSalesReturn,
    getSalesReturns,
    getSalesReturnById,
    updateSalesReturn,
    deleteSalesReturn,
};
