const purchaseReturnService = require("./purchaseReturn.service");
const {
    createPurchaseReturnSchema,
    updatePurchaseReturnSchema,
} = require("./purchaseReturn.validation");

const createPurchaseReturn = async (req, res) => {
    const validatedData = createPurchaseReturnSchema.parse(req.body);
    const result = await purchaseReturnService.createPurchaseReturn(validatedData);

    res.status(201).json({
        success: true,
        message: "Purchase return created successfully",
        data: result,
    });
};

const getPurchaseReturns = async (req, res) => {
    const result = await purchaseReturnService.getPurchaseReturns();

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

const getPurchaseReturnById = async (req, res) => {
    const result = await purchaseReturnService.getPurchaseReturnById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updatePurchaseReturn = async (req, res) => {
    const validatedData = updatePurchaseReturnSchema.parse(req.body);
    const result = await purchaseReturnService.updatePurchaseReturn(
        req.params.id,
        validatedData
    );

    res.status(200).json({
        success: true,
        message: "Purchase return updated successfully",
        data: result,
    });
};

const deletePurchaseReturn = async (req, res) => {
    await purchaseReturnService.deletePurchaseReturn(req.params.id);

    res.status(200).json({
        success: true,
        message: "Purchase return deleted successfully",
    });
};

module.exports = {
    createPurchaseReturn,
    getPurchaseReturns,
    getPurchaseReturnById,
    updatePurchaseReturn,
    deletePurchaseReturn,
};
