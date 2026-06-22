const Product = require("../../../modules/products/product.model");
const Customer = require("../../../modules/customers/customer.model");
const Supplier = require("../../../modules/suppliers/supplier.model");
const { createAutoJournal } = require("../../../modules/finance/journal/journal.service");
const {
    resolveCustomerReceivableAccount,
    resolveSupplierPayableAccount,
    resolveProductAccounts,
    resolveCashAccount,
} = require("../accountResolver");

const round2 = (value) => Math.round((Number(value) + Number.EPSILON) * 100) / 100;

const buildSalesJournalLines = async ({ customer, items, totalAmount, invoiceNumber, isCashSale, cashAccountId }) => {
    const receivableAccountId = await resolveCustomerReceivableAccount(customer);

    if (!receivableAccountId) {
        return null;
    }

    const journalLines = [];
    const customerAmount = round2(totalAmount);

    journalLines.push({
        accountId: receivableAccountId,
        debit: customerAmount,
        credit: 0,
        description: `Invoice ${invoiceNumber} - ${customer?.customerName || "Customer"}`,
    });

    for (const item of items) {
        const product = await Product.findById(item.productId);
        const accounts = await resolveProductAccounts(product);

        if (!accounts) {
            return null;
        }

        const lineTotal = round2(item.total ?? item.quantity * item.unitPrice);
        const itemCost = round2((product?.cost || 0) * item.quantity);

        journalLines.push({
            accountId: accounts.incomeAccountId,
            debit: 0,
            credit: lineTotal,
            description: `Sales: ${product?.productName || "Product"} (Qty: ${item.quantity})`,
        });

        if (product?.productType !== "SERVICE" && itemCost > 0) {
            journalLines.push({
                accountId: accounts.cogsAccountId,
                debit: itemCost,
                credit: 0,
                description: `COGS: ${product?.productName || "Product"}`,
            });

            journalLines.push({
                accountId: accounts.inventoryAccountId,
                debit: 0,
                credit: itemCost,
                description: `Inventory Out: ${product?.productName || "Product"}`,
            });
        }
    }

    if (isCashSale) {
        const cashId = cashAccountId || (await resolveCashAccount("CASH"));

        if (!cashId) {
            return null;
        }

        journalLines.push({
            accountId: cashId,
            debit: customerAmount,
            credit: 0,
            description: `Cash Payment - Invoice ${invoiceNumber}`,
        });

        journalLines.push({
            accountId: receivableAccountId,
            debit: 0,
            credit: customerAmount,
            description: `Payment Settlement - Invoice ${invoiceNumber}`,
        });
    }

    return journalLines;
};

const postSalesInvoiceJournal = async (invoice) => {
    const customer = await Customer.findById(invoice.customerId);
    const lines = await buildSalesJournalLines({
        customer,
        items: invoice.items,
        totalAmount: invoice.totalAmount,
        invoiceNumber: invoice.invoiceNumber,
        isCashSale: invoice.paymentStatus === "PAID",
    });

    if (!lines) return null;

    return createAutoJournal({
        entryDate: invoice.issuedDate || new Date(),
        referenceNumber: `SINV-JV-${invoice.invoiceNumber}`,
        memo: invoice.notes || `Auto-journal for sales invoice ${invoice.invoiceNumber}`,
        lines,
        status: "POSTED",
    });
};

const postPosSaleJournal = async (order) => {
    const customer = order.customerId
        ? await Customer.findById(order.customerId)
        : null;

    const items = (order.items || []).map((item) => ({
        productId: item.productId,
        quantity: item.qty,
        unitPrice: item.unitPrice,
        total: item.lineTotal ?? item.qty * item.unitPrice,
    }));

    const paymentMethod = order.payments?.[0]?.method;
    const isCard = ["CARD", "APPLE_PAY"].includes(paymentMethod);
    const cashAccountId = isCard
        ? await resolveCashAccount("BANK")
        : await resolveCashAccount("CASH");

    const lines = await buildSalesJournalLines({
        customer,
        items,
        totalAmount: order.totalAmount,
        invoiceNumber: order.orderNumber,
        isCashSale: true,
        cashAccountId,
    });

    if (!lines) return null;

    return createAutoJournal({
        entryDate: order.paidAt || new Date(),
        referenceNumber: `POS-JV-${order.orderNumber}`,
        memo: `Auto-journal for POS order ${order.orderNumber}`,
        lines,
        status: "POSTED",
    });
};

const postSalesReturnReversalJournal = async (salesReturn) => {
    const customer = await Customer.findById(salesReturn.customerId);
    const receivableAccountId = await resolveCustomerReceivableAccount(customer);

    if (!receivableAccountId) return null;

    const journalLines = [];
    let totalReturn = 0;

    for (const item of salesReturn.items) {
        const product = await Product.findById(item.productId);
        const accounts = await resolveProductAccounts(product);

        if (!accounts) return null;

        const lineTotal = round2(item.totalReturnAmount);
        totalReturn += lineTotal;
        const itemCost = round2((product?.cost || 0) * item.returnQuantity);

        journalLines.push({
            accountId: accounts.incomeAccountId,
            debit: lineTotal,
            credit: 0,
            description: `Sales Return: ${product?.productName || "Product"}`,
        });

        if (product?.productType !== "SERVICE" && itemCost > 0) {
            journalLines.push({
                accountId: accounts.cogsAccountId,
                debit: 0,
                credit: itemCost,
                description: `COGS Reversal: ${product?.productName || "Product"}`,
            });

            journalLines.push({
                accountId: accounts.inventoryAccountId,
                debit: itemCost,
                credit: 0,
                description: `Inventory In: ${product?.productName || "Product"}`,
            });
        }
    }

    journalLines.push({
        accountId: receivableAccountId,
        debit: 0,
        credit: round2(totalReturn),
        description: `Sales Return ${salesReturn.returnNumber}`,
    });

    return createAutoJournal({
        entryDate: salesReturn.returnDate || new Date(),
        referenceNumber: `SRT-JV-${salesReturn.returnNumber}`,
        memo: salesReturn.notes || `Auto-journal for sales return ${salesReturn.returnNumber}`,
        lines: journalLines,
        status: "POSTED",
    });
};

const postGoodsReceiptJournal = async (grn) => {
    const payableAccountId = await resolveSupplierPayableAccount(
        await Supplier.findById(grn.supplierId)
    );

    if (!payableAccountId) return null;

    const journalLines = [];
    let totalAmount = 0;

    for (const item of grn.items) {
        const product = await Product.findById(item.productId);
        const accounts = await resolveProductAccounts(product);

        if (!accounts) return null;

        const lineTotal = round2(item.total ?? item.receivedQuantity * item.unitPrice);
        totalAmount += lineTotal;

        journalLines.push({
            accountId: accounts.inventoryAccountId,
            debit: lineTotal,
            credit: 0,
            description: `GRN Receipt: ${product?.productName || "Product"}`,
        });
    }

    journalLines.push({
        accountId: payableAccountId,
        debit: 0,
        credit: round2(totalAmount),
        description: `GRN ${grn.grnNumber} - Goods Received Not Invoiced`,
    });

    return createAutoJournal({
        entryDate: grn.receiptDate || new Date(),
        referenceNumber: `GRN-JV-${grn.grnNumber}`,
        memo: grn.notes || `Auto-journal for goods receipt ${grn.grnNumber}`,
        lines: journalLines,
        status: "POSTED",
    });
};

const postPurchaseInvoiceJournal = async (invoice) => {
    const supplier = await Supplier.findById(invoice.supplierId);
    const payableAccountId = await resolveSupplierPayableAccount(supplier);

    if (!payableAccountId) return null;

    const journalLines = [];
    let totalAmount = 0;

    for (const item of invoice.items) {
        const product = await Product.findById(item.productId);
        const accounts = await resolveProductAccounts(product);

        if (!accounts) return null;

        const lineTotal = round2(item.total ?? item.quantity * item.unitCost);
        totalAmount += lineTotal;

        journalLines.push({
            accountId: accounts.expenseAccountId,
            debit: lineTotal,
            credit: 0,
            description: `Purchase: ${product?.productName || "Product"}`,
        });
    }

    journalLines.push({
        accountId: payableAccountId,
        debit: 0,
        credit: round2(totalAmount),
        description: `Purchase Invoice ${invoice.invoiceNo}`,
    });

    return createAutoJournal({
        entryDate: invoice.invoiceDate || new Date(),
        referenceNumber: `PINV-JV-${invoice.invoiceNo}`,
        memo: invoice.notes || `Auto-journal for purchase invoice ${invoice.invoiceNo}`,
        lines: journalLines,
        status: "POSTED",
    });
};

const postPurchaseReturnJournal = async (purchaseReturn, grn) => {
    const supplier = await Supplier.findById(purchaseReturn.supplierId);
    const payableAccountId = await resolveSupplierPayableAccount(supplier);

    if (!payableAccountId) return null;

    const journalLines = [];
    let totalAmount = 0;

    for (const item of purchaseReturn.items) {
        const grnItem = grn.items.find(
            (x) => x.productId.toString() === item.productId.toString()
        );
        const product = await Product.findById(item.productId);
        const accounts = await resolveProductAccounts(product);

        if (!accounts) return null;

        const unitCost = grnItem?.unitPrice || product?.cost || 0;
        const lineTotal = round2(item.returnQuantity * unitCost);
        totalAmount += lineTotal;

        journalLines.push({
            accountId: accounts.expenseAccountId,
            debit: 0,
            credit: lineTotal,
            description: `Purchase Return: ${product?.productName || "Product"}`,
        });

        journalLines.push({
            accountId: accounts.inventoryAccountId,
            debit: 0,
            credit: lineTotal,
            description: `Inventory Out: ${product?.productName || "Product"}`,
        });
    }

    journalLines.push({
        accountId: payableAccountId,
        debit: round2(totalAmount),
        credit: 0,
        description: `Purchase Return ${purchaseReturn.returnNumber}`,
    });

    return createAutoJournal({
        entryDate: purchaseReturn.returnDate || new Date(),
        referenceNumber: `PRT-JV-${purchaseReturn.returnNumber}`,
        memo: purchaseReturn.notes || `Auto-journal for purchase return ${purchaseReturn.returnNumber}`,
        lines: journalLines,
        status: "POSTED",
    });
};

const postARPaymentJournal = async ({ invoice, payment }) => {
    const contact = invoice.contactId;
    const receivableAccountId =
        (typeof contact === "object" && contact?.receivableAccountId) ||
        contact?.receivableAccountId ||
        null;

    if (!receivableAccountId) return null;

    const cashAccountId = await resolveCashAccount(payment.paymentMethod);
    if (!cashAccountId) return null;

    const amount = round2(payment.amount);

    return createAutoJournal({
        entryDate: payment.paymentDate,
        referenceNumber: `AR-PAY-${payment.referenceNumber || payment._id}`,
        memo: payment.notes || `AR payment for invoice ${invoice.invoiceNumber}`,
        lines: [
            {
                accountId: cashAccountId,
                debit: amount,
                credit: 0,
                description: `Payment received - ${invoice.invoiceNumber}`,
            },
            {
                accountId: receivableAccountId,
                debit: 0,
                credit: amount,
                description: `AR settlement - ${invoice.invoiceNumber}`,
            },
        ],
        status: "POSTED",
    });
};

const postAPPaymentJournal = async ({ invoice, payment }) => {
    const payableAccountId = await resolveSupplierPayableAccount({
        supplierName: invoice.vendorName,
    });

    if (!payableAccountId) return null;

    const cashAccountId = await resolveCashAccount(payment.paymentMethod);
    if (!cashAccountId) return null;

    const amount = round2(payment.amount);

    return createAutoJournal({
        entryDate: payment.paymentDate,
        referenceNumber: `AP-PAY-${payment.referenceNumber || payment._id}`,
        memo: payment.notes || `AP payment for invoice ${invoice.invoiceNumber}`,
        lines: [
            {
                accountId: payableAccountId,
                debit: amount,
                credit: 0,
                description: `AP settlement - ${invoice.invoiceNumber}`,
            },
            {
                accountId: cashAccountId,
                debit: 0,
                credit: amount,
                description: `Payment sent - ${invoice.invoiceNumber}`,
            },
        ],
        status: "POSTED",
    });
};

module.exports = {
    postSalesInvoiceJournal,
    postPosSaleJournal,
    postSalesReturnReversalJournal,
    postGoodsReceiptJournal,
    postPurchaseInvoiceJournal,
    postPurchaseReturnJournal,
    postARPaymentJournal,
    postAPPaymentJournal,
};
