const eventBus = require("../../events/eventBus");
const EVENTS = require("../../events/eventTypes");
const postingService = require("../posting/posting.service");

const safePost = async (label, fn) => {
    try {
        await fn();
    } catch (error) {
        console.error(`[FinanceHandler] ${label}:`, error.message);
    }
};

const registerFinanceHandlers = () => {
    eventBus.on(EVENTS.SALES_INVOICE_POSTED, (invoice) =>
        safePost("sales invoice journal", () => postingService.postSalesInvoiceJournal(invoice))
    );

    eventBus.on(EVENTS.POS_ORDER_PAID, (order) =>
        safePost("POS sale journal", () => postingService.postPosSaleJournal(order))
    );

    eventBus.on(EVENTS.SALES_RETURN_POSTED, (salesReturn) =>
        safePost("sales return journal", () =>
            postingService.postSalesReturnReversalJournal(salesReturn)
        )
    );

    eventBus.on(EVENTS.GOODS_RECEIPT_POSTED, (grn) =>
        safePost("goods receipt journal", () => postingService.postGoodsReceiptJournal(grn))
    );

    eventBus.on(EVENTS.PURCHASE_INVOICE_POSTED, (invoice) =>
        safePost("purchase invoice journal", () =>
            postingService.postPurchaseInvoiceJournal(invoice)
        )
    );

    eventBus.on(EVENTS.PURCHASE_RETURN_APPROVED, ({ purchaseReturn, grn }) =>
        safePost("purchase return journal", () => {
            if (!grn) return null;
            return postingService.postPurchaseReturnJournal(purchaseReturn, grn);
        })
    );

    eventBus.on(EVENTS.AR_PAYMENT_RECEIVED, ({ invoice, payment }) =>
        safePost("AR payment journal", () =>
            postingService.postARPaymentJournal({ invoice, payment })
        )
    );

    eventBus.on(EVENTS.AP_PAYMENT_SENT, ({ invoice, payment }) =>
        safePost("AP payment journal", () =>
            postingService.postAPPaymentJournal({ invoice, payment })
        )
    );
};

module.exports = { registerFinanceHandlers };
