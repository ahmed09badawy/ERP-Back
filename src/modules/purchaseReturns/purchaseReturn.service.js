const PurchaseReturn = require("./purchaseReturn.model");
const GoodsReceipt = require("../goodsReceipts/goodsReceipts.model");
const Supplier = require("../suppliers/supplier.model");
const stockService = require("../stock/stock.service");
const generateCode = require("../../common/utils/generate-code");
const eventBus = require("../../common/events/eventBus");
const EVENTS = require("../../common/events/eventTypes");

const validateAndBuildItems = async (payload) => {
    const supplier = await Supplier.findById(payload.supplierId);
    if (!supplier) {
        const error = new Error("Supplier not found");
        error.statusCode = 404;
        throw error;
    }

    const grn = await GoodsReceipt.findById(payload.goodsReceiptId);
    if (!grn) {
        const error = new Error("Goods receipt not found");
        error.statusCode = 404;
        throw error;
    }

    const items = [];

    for (const item of payload.items) {
        const grnItem = grn.items.find(
            (x) => x.productId.toString() === item.productId.toString()
        );

        if (!grnItem) {
            const error = new Error("Product does not exist in goods receipt");
            error.statusCode = 400;
            throw error;
        }

        if (item.returnQuantity > item.receivedQuantity) {
            const error = new Error("Return quantity cannot exceed received quantity");
            error.statusCode = 400;
            throw error;
        }

        if (item.returnQuantity > grnItem.receivedQuantity) {
            const error = new Error("Return quantity exceeds GRN received quantity");
            error.statusCode = 400;
            throw error;
        }

        items.push({
            productId: item.productId,
            sku: item.sku || grnItem.sku,
            receivedQuantity: item.receivedQuantity,
            returnQuantity: item.returnQuantity,
            reasonForReturn: item.reasonForReturn,
        });
    }

    return items;
};

const applyStockOut = async (purchaseReturn) => {
    for (const item of purchaseReturn.items) {
        await stockService.stockOut({
            productId: item.productId,
            warehouseId: purchaseReturn.warehouseId,
            qty: item.returnQuantity,
            referenceType: "purchase_return",
            referenceId: purchaseReturn.returnNumber,
            notes: item.reasonForReturn,
        });
    }
};

const createPurchaseReturn = async (payload) => {
    const returnNumber = await generateCode("purchase_return", "PRT");

    const items = await validateAndBuildItems(payload);

    const purchaseReturn = await PurchaseReturn.create({
        returnNumber,
        returnDate: payload.returnDate || new Date(),
        supplierId: payload.supplierId,
        goodsReceiptId: payload.goodsReceiptId,
        warehouseId: payload.warehouseId,
        branchId: payload.branchId || null,
        items,
        status: payload.status || "PENDING",
        notes: payload.notes || "",
    });

    if (purchaseReturn.status === "APPROVED") {
        await applyStockOut(purchaseReturn);
        const grn = await GoodsReceipt.findById(purchaseReturn.goodsReceiptId);
        eventBus.emitAsync(EVENTS.PURCHASE_RETURN_APPROVED, {
            purchaseReturn: purchaseReturn.toObject(),
            grn: grn?.toObject(),
        });
    }

    return PurchaseReturn.findById(purchaseReturn._id).populate(
        "supplierId goodsReceiptId warehouseId branchId items.productId"
    );
};

const getPurchaseReturns = async () => {
    return PurchaseReturn.find()
        .populate("supplierId goodsReceiptId warehouseId branchId items.productId")
        .sort({ createdAt: -1 });
};

const getPurchaseReturnById = async (id) => {
    const purchaseReturn = await PurchaseReturn.findById(id).populate(
        "supplierId goodsReceiptId warehouseId branchId items.productId"
    );

    if (!purchaseReturn) {
        const error = new Error("Purchase return not found");
        error.statusCode = 404;
        throw error;
    }

    return purchaseReturn;
};

const updatePurchaseReturn = async (id, payload) => {
    const purchaseReturn = await PurchaseReturn.findById(id);

    if (!purchaseReturn) {
        const error = new Error("Purchase return not found");
        error.statusCode = 404;
        throw error;
    }

    const previousStatus = purchaseReturn.status;

    if (payload.returnDate !== undefined) purchaseReturn.returnDate = payload.returnDate;
    if (payload.supplierId !== undefined) purchaseReturn.supplierId = payload.supplierId;
    if (payload.goodsReceiptId !== undefined) purchaseReturn.goodsReceiptId = payload.goodsReceiptId;
    if (payload.warehouseId !== undefined) purchaseReturn.warehouseId = payload.warehouseId;
    if (payload.branchId !== undefined) purchaseReturn.branchId = payload.branchId || null;
    if (payload.notes !== undefined) purchaseReturn.notes = payload.notes;
    if (payload.status !== undefined) purchaseReturn.status = payload.status;

    if (payload.items !== undefined) {
        purchaseReturn.items = await validateAndBuildItems({
            supplierId: payload.supplierId || purchaseReturn.supplierId,
            goodsReceiptId: payload.goodsReceiptId || purchaseReturn.goodsReceiptId,
            items: payload.items,
        });
    }

    await purchaseReturn.save();

    if (previousStatus !== "APPROVED" && purchaseReturn.status === "APPROVED") {
        await applyStockOut(purchaseReturn);
        const grn = await GoodsReceipt.findById(purchaseReturn.goodsReceiptId);
        eventBus.emitAsync(EVENTS.PURCHASE_RETURN_APPROVED, {
            purchaseReturn: purchaseReturn.toObject(),
            grn: grn?.toObject(),
        });
    }

    return PurchaseReturn.findById(purchaseReturn._id).populate(
        "supplierId goodsReceiptId warehouseId branchId items.productId"
    );
};

const deletePurchaseReturn = async (id) => {
    const purchaseReturn = await PurchaseReturn.findById(id);

    if (!purchaseReturn) {
        const error = new Error("Purchase return not found");
        error.statusCode = 404;
        throw error;
    }

    await PurchaseReturn.findByIdAndDelete(id);

    return true;
};

module.exports = {
    createPurchaseReturn,
    getPurchaseReturns,
    getPurchaseReturnById,
    updatePurchaseReturn,
    deletePurchaseReturn,
};
