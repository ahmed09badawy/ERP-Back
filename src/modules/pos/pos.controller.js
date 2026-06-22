const posService = require("./pos.service");
const {
    createPosOrderSchema,
    addItemSchema,
    updateItemQtySchema,
    applyDiscountSchema,
    applyTaxSchema,
    applyShippingSchema,
    holdSchema,
    paymentSchema,
} = require("./pos.validation");

const createPosOrder = async (req, res) => {
    const validated = createPosOrderSchema.parse(req.body);
    const result = await posService.createPosOrder(validated, req.user);
    res.status(201).json({
        success: true,
        message: "POS order created",
        data: result,
    });
};

const getPosOrders = async (req, res) => {
    const result = await posService.getPosOrders({ status: req.query.status });
    res.status(200).json({ success: true, data: result });
};

const getPosOrderById = async (req, res) => {
    const result = await posService.getPosOrderById(req.params.id);
    res.status(200).json({ success: true, data: result });
};

const addItem = async (req, res) => {
    const validated = addItemSchema.parse(req.body);
    const result = await posService.addItem(req.params.id, validated);
    res.status(200).json({
        success: true,
        message: "Item added",
        data: result,
    });
};

const updateItemQty = async (req, res) => {
    const validated = updateItemQtySchema.parse(req.body);
    const result = await posService.updateItemQty(req.params.id, req.params.itemId, validated);
    res.status(200).json({
        success: true,
        message: "Item updated",
        data: result,
    });
};

const removeItem = async (req, res) => {
    const result = await posService.removeItem(req.params.id, req.params.itemId);
    res.status(200).json({
        success: true,
        message: "Item removed",
    });
};

const setDiscount = async (req, res) => {
    const validated = applyDiscountSchema.parse(req.body);
    const result = await posService.setDiscount(req.params.id, validated.discount);
    res.status(200).json({
        success: true,
        message: "Discount applied",
        data: result,
    });
};

const setTax = async (req, res) => {
    const validated = applyTaxSchema.parse(req.body);
    const result = await posService.setTax(req.params.id, validated.tax);
    res.status(200).json({
        success: true,
        message: "Tax applied",
        data: result,
    });
};

const setShipping = async (req, res) => {
    const validated = applyShippingSchema.parse(req.body);
    const result = await posService.setShipping(req.params.id, validated.shippingAmount);
    res.status(200).json({
        success: true,
        message: "Shipping applied",
        data: result,
    });
};

const holdOrder = async (req, res) => {
    const validated = holdSchema.parse(req.body);
    const result = await posService.holdOrder(req.params.id, validated.reference);
    res.status(200).json({
        success: true,
        message: "Order held",
        data: result,
    });
};

const cancelOrder = async (req, res) => {
    const result = await posService.cancelOrder(req.params.id);
    res.status(200).json({
        success: true,
        message: "Order cancelled",
        data: result,
    });
};

const payOrder = async (req, res) => {
    const validated = paymentSchema.parse(req.body);
    const result = await posService.payOrder(req.params.id, validated, req.user);
    res.status(200).json({
        success: true,
        message: "Payment confirmed",
        data: result,
    });
};

const getReceipt = async (req, res) => {
    const result = await posService.getReceipt(req.params.id);
    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = {
    createPosOrder,
    getPosOrders,
    getPosOrderById,
    addItem,
    updateItemQty,
    removeItem,
    setDiscount,
    setTax,
    setShipping,
    holdOrder,
    cancelOrder,
    payOrder,
    getReceipt,
};

