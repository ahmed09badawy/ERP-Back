const eventBus = require("../../events/eventBus");
const EVENTS = require("../../events/eventTypes");
const stockIntegration = require("../stockIntegration.service");
const PurchaseOrder = require("../../../modules/purchaseOrders/purchaseOrder.model");
const PurchaseRequest = require("../../../modules/purchaseRequests/purchaseRequest.model");

const safeRun = async (label, fn) => {
    try {
        await fn();
    } catch (error) {
        console.error(`[StockHandler] ${label}:`, error.message);
    }
};

const registerStockHandlers = () => {
    eventBus.on(EVENTS.SALES_INVOICE_DELETED, (invoice) =>
        safeRun("reverse sales invoice stock", () =>
            stockIntegration.reverseSalesInvoiceStock(invoice)
        )
    );

    eventBus.on(EVENTS.SALES_RETURN_POSTED, (salesReturn) => {
        // Stock-in is handled synchronously in salesReturn service.
    });

    eventBus.on(EVENTS.SALES_ORDER_CANCELLED, (order) =>
        safeRun("release sales order stock", () =>
            stockIntegration.releaseSalesOrderStock(order)
        )
    );

    eventBus.on(EVENTS.GOODS_RECEIPT_DELETED, async (grn) => {
        await safeRun("reverse goods receipt stock", () =>
            stockIntegration.reverseGoodsReceiptStock(grn)
        );

        await safeRun("revert PO quantities", async () => {
            const po = await PurchaseOrder.findById(grn.purchaseOrderId);
            if (!po) return;

            for (const grnItem of grn.items) {
                const poItem = po.items.find(
                    (x) => x.productId.toString() === grnItem.productId.toString()
                );

                if (!poItem) continue;

                poItem.receivedQuantity = Math.max(
                    0,
                    poItem.receivedQuantity - grnItem.receivedQuantity
                );
                poItem.pendingQuantity += grnItem.receivedQuantity;
            }

            const allDelivered = po.items.every((item) => item.pendingQuantity === 0);
            const anyReceived = po.items.some((item) => item.receivedQuantity > 0);

            if (allDelivered) {
                po.deliveryStatus = "DELIVERED";
            } else if (anyReceived) {
                po.deliveryStatus = "PARTIALLY_DELIVERED";
            } else {
                po.deliveryStatus = "PENDING";
            }

            await po.save();
        });
    });
};

module.exports = { registerStockHandlers };
