const eventBus = require("../../events/eventBus");
const EVENTS = require("../../events/eventTypes");
const PurchaseOrder = require("../../../modules/purchaseOrders/purchaseOrder.model");
const PurchaseRequest = require("../../../modules/purchaseRequests/purchaseRequest.model");
const Supplier = require("../../../modules/suppliers/supplier.model");

const safeRun = async (label, fn) => {
    try {
        await fn();
    } catch (error) {
        console.error(`[PurchaseHandler] ${label}:`, error.message);
    }
};

const registerPurchaseHandlers = () => {
    eventBus.on(EVENTS.PURCHASE_INVOICE_POSTED, async (invoice) => {
        await safeRun("sync AP record", async () => {
            const supplier = await Supplier.findById(invoice.supplierId);
            if (!supplier) return;

            const apModule = require("../../../modules/finance/accountPayable/accountPayable.service");

            try {
                await apModule.createAP({
                    vendorName: supplier.supplierName,
                    invoiceNumber: invoice.invoiceNo,
                    invoiceDate: invoice.invoiceDate,
                    dueDate: invoice.dueDate || invoice.invoiceDate,
                    amount: invoice.totalAmount,
                    paidAmount: invoice.paymentStatus === "PAID" ? invoice.totalAmount : 0,
                    notes: invoice.notes || `Linked to purchase invoice ${invoice.invoiceNo}`,
                });
            } catch (error) {
                if (!error.message?.includes("already exists")) {
                    throw error;
                }
            }
        });

        await safeRun("update PO payment status", async () => {
            if (!invoice.purchaseOrderId) return;

            const po = await PurchaseOrder.findById(invoice.purchaseOrderId);
            if (!po) return;

            po.paymentStatus = invoice.paymentStatus || po.paymentStatus;
            await po.save();
        });
    });

    eventBus.on(EVENTS.PURCHASE_ORDER_CREATED, async (po) => {
        await safeRun("update purchase request status", async () => {
            if (!po.linkedPurchaseRequestId) return;

            const pr = await PurchaseRequest.findById(po.linkedPurchaseRequestId);
            if (!pr) return;

            pr.status = "APPROVED";
            await pr.save();
        });
    });

    eventBus.on(EVENTS.GOODS_RECEIPT_POSTED, async (grn) => {
        // PO delivery status is updated synchronously in goodsReceipts service.
    });
};

module.exports = { registerPurchaseHandlers };
