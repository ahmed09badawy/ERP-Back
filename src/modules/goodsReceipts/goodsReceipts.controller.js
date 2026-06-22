const goodsReceiptService = require("./goodsReceipts.service");
const { createGoodsReceiptSchema, updateGoodsReceiptSchema } = require("./goodsReceipts.validation");

const createGoodsReceipt = async (req, res) => {
    const validatedData = createGoodsReceiptSchema.parse(req.body);
    const result = await goodsReceiptService.createGoodsReceipt(validatedData, req.user?._id);

    res.status(201).json({
        success: true,
        message: "Goods receipt created successfully",
        data: result,
    });
};

const getGoodsReceipts = async (req, res) => {
    const result = await goodsReceiptService.getGoodsReceipts();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getGoodsReceiptById = async (req, res) => {
    const result = await goodsReceiptService.getGoodsReceiptById(req.params.id);
    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateGoodsReceipt = async (req, res) => {
    const validatedData = updateGoodsReceiptSchema.parse(req.body);
    const result = await goodsReceiptService.updateGoodsReceipt(req.params.id, validatedData);
    res.status(200).json({
        success: true,
        message: "Goods receipt updated successfully",
        data: result,
    });
};

const deleteGoodsReceipt = async (req, res) => {
    await goodsReceiptService.deleteGoodsReceipt(req.params.id);
    res.status(200).json({
        success: true,
        message: "Goods receipt deleted successfully",
    });
};

module.exports = {
    createGoodsReceipt,
    getGoodsReceipts,
    getGoodsReceiptById,
    updateGoodsReceipt,
    deleteGoodsReceipt,
};
