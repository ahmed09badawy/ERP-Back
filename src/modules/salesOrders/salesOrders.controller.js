const salesOrderService = require("./salesOrders.service");
const {
    createSalesOrderSchema,
    updateSalesOrderSchema,
} = require("./salesOrders.validation");

const createSalesOrder = async (req, res) => {
    const validatedData = createSalesOrderSchema.parse(req.body);
    const result = await salesOrderService.createSalesOrder(validatedData, req.user?._id);

    res.status(201).json({
        success: true,
        message: "Sales order created successfully",
        data: result,
    });
};

const getSalesOrders = async (req, res) => {
    const result = await salesOrderService.getSalesOrders();

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

const getSalesOrderById = async (req, res) => {
    const result = await salesOrderService.getSalesOrderById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateSalesOrder = async (req, res) => {
    const validatedData = updateSalesOrderSchema.parse(req.body);
    const result = await salesOrderService.updateSalesOrder(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Sales order updated successfully",
        data: result,
    });
};

const deleteSalesOrder = async (req, res) => {
    await salesOrderService.deleteSalesOrder(req.params.id);

    res.status(200).json({
        success: true,
        message: "Sales order deleted successfully",
    });
};

module.exports = {
    createSalesOrder,
    getSalesOrders,
    getSalesOrderById,
    updateSalesOrder,
    deleteSalesOrder,
};
