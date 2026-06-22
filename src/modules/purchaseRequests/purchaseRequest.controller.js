const purchaseRequestService = require("./purchaseRequest.service");
const {
    createPurchaseRequestSchema,
    updatePurchaseRequestSchema,
} = require("./purchaseRequest.validation");

const createPurchaseRequest = async (req, res) => {
    const validatedData = createPurchaseRequestSchema.parse(req.body);
    const result = await purchaseRequestService.createPurchaseRequest(
        validatedData,
        req.user?._id
    );

    res.status(201).json({
        success: true,
        message: "Purchase request created successfully",
        data: result,
    });
};

const getPurchaseRequests = async (req, res) => {
    const result = await purchaseRequestService.getPurchaseRequests();

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

const getPurchaseRequestById = async (req, res) => {
    const result = await purchaseRequestService.getPurchaseRequestById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updatePurchaseRequest = async (req, res) => {
    const validatedData = updatePurchaseRequestSchema.parse(req.body);
    const result = await purchaseRequestService.updatePurchaseRequest(
        req.params.id,
        validatedData
    );

    res.status(200).json({
        success: true,
        message: "Purchase request updated successfully",
        data: result,
    });
};

const deletePurchaseRequest = async (req, res) => {
    await purchaseRequestService.deletePurchaseRequest(req.params.id);

    res.status(200).json({
        success: true,
        message: "Purchase request deleted successfully",
    });
};

module.exports = {
    createPurchaseRequest,
    getPurchaseRequests,
    getPurchaseRequestById,
    updatePurchaseRequest,
    deletePurchaseRequest,
};
