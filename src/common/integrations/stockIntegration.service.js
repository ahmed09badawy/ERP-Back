const stockService = require("../../modules/stock/stock.service");

const reverseSalesInvoiceStock = async (invoice) => {
    if (!invoice.warehouseId) return;

    for (const item of invoice.items) {
        await stockService.stockIn({
            productId: item.productId,
            warehouseId: invoice.warehouseId,
            qty: item.quantity,
            unitCost: item.unitPrice,
            referenceType: "sales_invoice_reversal",
            referenceId: invoice.invoiceNumber,
            notes: "Sales invoice reversal",
        });
    }
};

const reverseSalesReturnStock = async (salesReturn) => {
    for (const item of salesReturn.items) {
        await stockService.stockOut({
            productId: item.productId,
            warehouseId: salesReturn.warehouseId,
            qty: item.returnQuantity,
            referenceType: "sales_return_reversal",
            referenceId: salesReturn.returnNumber,
            notes: "Sales return reversal",
        });
    }
};

const reverseGoodsReceiptStock = async (grn) => {
    for (const item of grn.items) {
        await stockService.stockOut({
            productId: item.productId,
            warehouseId: grn.warehouseId,
            qty: item.receivedQuantity,
            referenceType: "goods_receipt_reversal",
            referenceId: grn.grnNumber,
            notes: "Goods receipt reversal",
        });
    }
};

const releaseSalesOrderStock = async (order) => {
    if (!order.warehouseId || order.status === "DRAFT") return;

    for (const item of order.items) {
        try {
            await stockService.releaseStock({
                productId: item.productId,
                warehouseId: order.warehouseId,
                qty: item.quantity,
                referenceType: "sales_order",
                referenceId: order.orderNo,
                notes: "Sales order release on cancel/delete",
            });
        } catch (error) {
            if (!error.message?.includes("Insufficient reserved stock")) {
                throw error;
            }
        }
    }
};

const reconcileSalesOrderReservations = async (previousOrder, updatedOrder) => {
    if (!updatedOrder.warehouseId) return;

    if (previousOrder.warehouseId && previousOrder.status !== "DRAFT") {
        for (const item of previousOrder.items) {
            await stockService.releaseStock({
                productId: item.productId,
                warehouseId: previousOrder.warehouseId,
                qty: item.quantity,
                referenceType: "sales_order",
                referenceId: previousOrder.orderNo,
                notes: "Sales order reservation adjustment",
            });
        }
    }

    if (updatedOrder.status !== "DRAFT" && updatedOrder.status !== "CANCELLED") {
        for (const item of updatedOrder.items) {
            await stockService.reserveStock({
                productId: item.productId,
                warehouseId: updatedOrder.warehouseId,
                qty: item.quantity,
                referenceType: "sales_order",
                referenceId: updatedOrder.orderNo,
                notes: "Sales order reservation adjustment",
            });
        }
    }
};

module.exports = {
    reverseSalesInvoiceStock,
    reverseSalesReturnStock,
    reverseGoodsReceiptStock,
    releaseSalesOrderStock,
    reconcileSalesOrderReservations,
};
