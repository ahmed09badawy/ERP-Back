const GoodsReceipt = require("./goodsReceipts.model");
const PurchaseOrder = require("../purchaseOrders/purchaseOrder.model");
const Warehouse = require("../warehouses/warehouse.model");
const stockService = require("../stock/stock.service");
const generateCode = require("../../common/utils/generate-code");
const { withTransaction } = require("../../common/utils/transaction");
const eventBus = require("../../common/events/eventBus");
const EVENTS = require("../../common/events/eventTypes");

const createGoodsReceipt = async (payload, currentUserId) => {
    const grnNumber = await generateCode("goods_receipt", "GRN");

    const po = await PurchaseOrder.findById(payload.purchaseOrderId);
    if (!po) {
        const error = new Error("Purchase order not found");
        error.statusCode = 404;
        throw error;
    }

    const warehouse = await Warehouse.findById(payload.warehouseId);
    if (!warehouse) {
        const error = new Error("Warehouse not found");
        error.statusCode = 404;
        throw error;
    }

    const items = [];

    for (const item of payload.items) {
        const poItem = po.items.find(
            (x) => x.productId.toString() === item.productId.toString()
        );

        if (!poItem) {
            const error = new Error("Product does not exist in purchase order");
            error.statusCode = 400;
            throw error;
        }

        if (item.receivedQuantity > poItem.pendingQuantity) {
            const error = new Error("Received quantity exceeds pending quantity");
            error.statusCode = 400;
            throw error;
        }

        items.push({
            productId: item.productId,
            sku: item.sku || poItem.sku,
            orderedQuantity: item.orderedQuantity,
            receivedQuantity: item.receivedQuantity,
            unitPrice: item.unitPrice,
            total: item.receivedQuantity * item.unitPrice,
        });
    }

    const grn = await withTransaction(async (session) => {
        for (const item of items) {
            const poItem = po.items.find(
                (x) => x.productId.toString() === item.productId.toString()
            );

            poItem.receivedQuantity += item.receivedQuantity;
            poItem.pendingQuantity -= item.receivedQuantity;

            await stockService.stockIn(
                {
                    productId: item.productId,
                    warehouseId: payload.warehouseId,
                    qty: item.receivedQuantity,
                    unitCost: item.unitPrice,
                    referenceType: "goods_receipt",
                    referenceId: grnNumber,
                    notes: payload.notes || "",
                },
                session
            );
        }

        const allDelivered = po.items.every((poItem) => poItem.pendingQuantity === 0);
        const anyReceived = po.items.some((poItem) => poItem.receivedQuantity > 0);

        if (allDelivered) {
            po.deliveryStatus = "DELIVERED";
        } else if (anyReceived) {
            po.deliveryStatus = "PARTIALLY_DELIVERED";
        } else {
            po.deliveryStatus = "PENDING";
        }

        await po.save({ session });

        const created = await GoodsReceipt.create(
            [
                {
                    grnNumber,
                    purchaseOrderId: payload.purchaseOrderId,
                    supplierId: payload.supplierId,
                    receiptDate: payload.receiptDate || new Date(),
                    warehouseId: payload.warehouseId,
                    branchId: payload.branchId || null,
                    receivedBy: currentUserId || null,
                    items,
                    notes: payload.notes || "",
                },
            ],
            { session }
        );

        return created[0];
    });

    eventBus.emitAsync(EVENTS.GOODS_RECEIPT_POSTED, grn.toObject());

    return GoodsReceipt.findById(grn._id).populate(
        "purchaseOrderId supplierId warehouseId branchId receivedBy items.productId"
    );
};

const getGoodsReceipts = async () => {
    return GoodsReceipt.find()
        .populate("purchaseOrderId supplierId warehouseId branchId receivedBy items.productId")
        .sort({ createdAt: -1 });
};

const getGoodsReceiptById = async (id) => {
    const gr = await GoodsReceipt.findById(id).populate(
        "purchaseOrderId supplierId warehouseId branchId receivedBy items.productId"
    );
    if (!gr) {
        const error = new Error("Goods receipt not found");
        error.statusCode = 404;
        throw error;
    }
    return gr;
};

const updateGoodsReceipt = async (id, payload) => {
    delete payload.grnNumber;

    const gr = await GoodsReceipt.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    }).populate("purchaseOrderId supplierId warehouseId branchId receivedBy items.productId");

    if (!gr) {
        const error = new Error("Goods receipt not found");
        error.statusCode = 404;
        throw error;
    }
    return gr;
};

const deleteGoodsReceipt = async (id) => {
    const gr = await GoodsReceipt.findById(id);
    if (!gr) {
        const error = new Error("Goods receipt not found");
        error.statusCode = 404;
        throw error;
    }

    eventBus.emitAsync(EVENTS.GOODS_RECEIPT_DELETED, gr.toObject());
    await GoodsReceipt.findByIdAndDelete(id);

    return { message: "Goods receipt deleted successfully" };
};

module.exports = {
    createGoodsReceipt,
    getGoodsReceipts,
    getGoodsReceiptById,
    updateGoodsReceipt,
    deleteGoodsReceipt,
};
