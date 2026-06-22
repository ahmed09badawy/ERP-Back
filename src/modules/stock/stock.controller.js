const stockService = require("./stock.service");
const {
    stockInSchema,
    stockOutSchema,
    reserveStockSchema,
    releaseStockSchema,
} = require("./stock.validation");

const stockIn = async (req, res) => {
    const validatedData = stockInSchema.parse(req.body);
    const result = await stockService.stockIn(validatedData);

    res.status(200).json({
        success: true,
        message: "Stock added successfully",
        data: result,
    });
};

const stockOut = async (req, res) => {
    const validatedData = stockOutSchema.parse(req.body);
    const result = await stockService.stockOut(validatedData);

    res.status(200).json({
        success: true,
        message: "Stock removed successfully",
        data: result,
    });
};

const reserveStock = async (req, res) => {
    const validatedData = reserveStockSchema.parse(req.body);
    const result = await stockService.reserveStock(validatedData);

    res.status(200).json({
        success: true,
        message: "Stock reserved successfully",
        data: result,
    });
};

const releaseStock = async (req, res) => {
    const validatedData = releaseStockSchema.parse(req.body);
    const result = await stockService.releaseStock(validatedData);

    res.status(200).json({
        success: true,
        message: "Reserved stock released successfully",
        data: result,
    });
};

const getStockList = async (req, res) => {
    const result = await stockService.getStockList();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getProductMovements = async (req, res) => {
    const result = await stockService.getProductMovements(req.params.productId);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getAllMovements = async (req, res) => {
    const result = await stockService.getAllMovements(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = {
    stockIn,
    stockOut,
    reserveStock,
    releaseStock,
    getStockList,
    getProductMovements,
    getAllMovements,
};
