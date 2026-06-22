const purchaseOrderService = require("./purchaseOrder.service");
const { createPurchaseOrderSchema, updatePurchaseOrderSchema } = require("./purchaseOrder.validation");

const createPurchaseOrder = async (req, res) => {
    const validatedData = createPurchaseOrderSchema.parse(req.body);
    const result = await purchaseOrderService.createPurchaseOrder(validatedData);

    res.status(201).json({
        success: true,
        message: "Purchase order created successfully",
        data: result,
    });
};

const getPurchaseOrders = async (req, res) => {
    const result = await purchaseOrderService.getPurchaseOrders();

    res.status(200).json({
        success: true,
        message: "Purchase orders retrieved successfully",
        data: result,
    });
};

const getPurchaseOrderById = async (req, res) => {
    const result = await purchaseOrderService.getPurchaseOrderById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Purchase order details retrieved successfully",
        data: result,
    });
};

const deletePurchaseOrder = async (req, res) => {
    await purchaseOrderService.deletePurchaseOrder(req.params.id);

    res.status(200).json({
        success: true,
        message: "Purchase order deleted successfully",
    });
};

const updatePurchaseOrder = async (req, res) => {
    const validatedData = updatePurchaseOrderSchema.parse(req.body);
    const result = await purchaseOrderService.updatePurchaseOrder(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Purchase order updated successfully",
        data: result,
    });
};

module.exports = {
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder,
};
