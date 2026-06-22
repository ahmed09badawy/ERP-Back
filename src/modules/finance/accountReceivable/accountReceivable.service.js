const AccountsReceivable = require("./accountReceivable.model");
const Contact = require("../../crm/contacts/contact.model");
const Product = require("../../inventoryModule/products/product.model");
const Category = require("../../inventoryModule/category/category.model");
const ChartOfAccount = require("../chartOfAccounts/coa.model");
const { isMonthClosed } = require("../monthlyClosing/monthlyClosing.service");
const { createAutoJournal } = require("../journal/journal.service");
const { calculateInvoiceStatus } = require("../../../common/utils/finance");

const createAR = async (payload) => {
    const closed = await isMonthClosed(payload.invoiceDate || new Date());
    if (closed) {
        const error = new Error("Month is closed");
        error.statusCode = 400;
        throw error;
    }

    const existing = await AccountsReceivable.findOne({
        invoiceNumber: payload.invoiceNumber.toUpperCase(),
    });

    if (existing) {
        const error = new Error("Invoice number already exists");
        error.statusCode = 400;
        throw error;
    }


    const contact = await Contact.findById(payload.contactId).populate("pricelistId");
    if (!contact || !contact.receivableAccountId) {
        const error = new Error("Contact not found or has no receivable account linked");
        error.statusCode = 400;
        throw error;
    }


    let totalInvoiceAmount = 0;
    const processedItems = [];

    for (const item of payload.items) {
        const product = await Product.findById(item.productId).populate("category");
        if (!product) throw new Error(`Product ${item.productId} not found`);

        let unitPrice = product.sellingPrice; // Default price

        // Apply Pricelist logic if exists
        if (contact.pricelistId) {
            const pricelist = contact.pricelistId;

            // Check for fixed price for this specific product
            const fixedItem = pricelist.items.find(pi => pi.productId.toString() === product._id.toString());

            if (fixedItem && fixedItem.fixedPrice !== undefined) {
                unitPrice = fixedItem.fixedPrice;
            } else if (pricelist.discountPercentage > 0) {
                // Apply general discount
                unitPrice = unitPrice * (1 - pricelist.discountPercentage / 100);
            }
        }

        const itemTotal = unitPrice * item.quantity;
        totalInvoiceAmount += itemTotal;

        processedItems.push({
            productId: product._id,
            quantity: item.quantity,
            unitPrice: unitPrice,
            total: itemTotal,
            productRef: product // Keep for journal entry logic
        });
    }

    // Use calculated total if not provided or to ensure accuracy
    const finalAmount = totalInvoiceAmount;
    const amountBase = finalAmount * (payload.exchangeRate || 1);

    // 3. Prepare Journal Lines
    const journalLines = [];


    const customerAmountBase = Math.round(amountBase * 100) / 100;
    journalLines.push({
        accountId: contact.receivableAccountId,
        debit: customerAmountBase,
        credit: 0,
        description: `Invoice ${payload.invoiceNumber} - ${contact.name}`
    });

    // 4. Process Items for Journal (Sales & COGS)
    for (const item of processedItems) {
        const category = item.productRef.category;

        if (!category || !category.incomeAccountId || !category.costOfGoodsSoldAccountId || !category.inventoryValuationAccountId) {
            throw new Error(`Product Category for ${item.productRef.productName} is missing required accounting links (Income, COGS, or Inventory)`);
        }

        const itemTotalBase = Math.round(item.total * (payload.exchangeRate || 1) * 100) / 100;
        const itemCostBase = Math.round((item.productRef.purchasePrice * item.quantity) * (payload.exchangeRate || 1) * 100) / 100;

        // Sales Line: Credit Income Account
        journalLines.push({
            accountId: category.incomeAccountId,
            debit: 0,
            credit: itemTotalBase,
            description: `Sales: ${item.productRef.productName} (Qty: ${item.quantity})`
        });

        // COGS Line: Debit COGS Account
        journalLines.push({
            accountId: category.costOfGoodsSoldAccountId,
            debit: itemCostBase,
            credit: 0,
            description: `COGS: ${item.productRef.productName}`
        });

        // Inventory Line: Credit Valuation Account
        journalLines.push({
            accountId: category.inventoryValuationAccountId,
            debit: 0,
            credit: itemCostBase,
            description: `Inventory Out: ${item.productRef.productName}`
        });
    }

    // 5. Handle CASH payment
    if (payload.paymentType === "CASH") {
        if (!payload.cashAccountId) {
            throw new Error("Cash Account is required for CASH payment type");
        }

        const cashAccount = await ChartOfAccount.findById(payload.cashAccountId);
        if (!cashAccount || !["CASH", "BANK"].includes(cashAccount.accountCategory)) {
            const error = new Error("Selected Cash Account must have account category 'CASH' or 'BANK'");
            error.statusCode = 400;
            throw error;
        }

        const finalAmountBase = Math.round(amountBase * 100) / 100;

        // Debit Cash/Bank
        journalLines.push({
            accountId: payload.cashAccountId,
            debit: finalAmountBase,
            credit: 0,
            description: `Cash Payment - Invoice ${payload.invoiceNumber}`
        });

        // Credit Customer Receivable (Settlement)
        journalLines.push({
            accountId: contact.receivableAccountId,
            debit: 0,
            credit: finalAmountBase,
            description: `Payment Settlement - Invoice ${payload.invoiceNumber}`
        });
    }

    // 6. Create Journal Entry
    const journalEntry = await createAutoJournal({
        entryDate: payload.invoiceDate || new Date(),
        referenceNumber: `INV-JV-${payload.invoiceNumber}`,
        memo: payload.notes || `Auto-journal for invoice ${payload.invoiceNumber}`,
        lines: journalLines,
        status: "POSTED"
    });

    // 7. Save Invoice
    const status = calculateInvoiceStatus(
        finalAmount,
        payload.paymentType === "CASH" ? finalAmount : (payload.paidAmount || 0),
        payload.dueDate
    );

    return AccountsReceivable.create({
        ...payload,
        items: processedItems.map(({ productRef, ...rest }) => rest),
        amount: finalAmount,
        invoiceNumber: payload.invoiceNumber.toUpperCase(),
        amountBase,
        paidAmount: payload.paymentType === "CASH" ? finalAmount : (payload.paidAmount || 0),
        status,
        journalEntryId: journalEntry._id
    });
};

const getAllAR = async (query = {}) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (query.contactId) filter.contactId = query.contactId;
    if (query.status) filter.status = query.status;
    if (query.paymentType) filter.paymentType = query.paymentType;

    const [invoices, total] = await Promise.all([
        AccountsReceivable.find(filter)
            .populate("contactId")
            .populate("currencyId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        AccountsReceivable.countDocuments(filter)
    ]);

    const data = invoices.map((invoice) => {
        invoice.status = calculateInvoiceStatus(
            invoice.amount,
            invoice.paidAmount,
            invoice.dueDate
        );
        return invoice;
    });

    return {
        invoices: data,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    };
};

const getARById = async (id) => {
    const invoice = await AccountsReceivable.findById(id);

    if (!invoice) {
        const error = new Error("AR invoice not found");
        error.statusCode = 404;
        throw error;
    }

    invoice.status = calculateInvoiceStatus(
        invoice.amount,
        invoice.paidAmount,
        invoice.dueDate
    );

    return invoice;
};

const updateAR = async (id, payload) => {
    const invoice = await AccountsReceivable.findById(id);

    if (!invoice) {
        const error = new Error("AR invoice not found");
        error.statusCode = 404;
        throw error;
    }

    const dateToCheck = payload.invoiceDate || invoice.invoiceDate;
    const closed = await isMonthClosed(dateToCheck);
    if (closed) {
        const error = new Error("Month is closed");
        error.statusCode = 400;
        throw error;
    }

    Object.assign(invoice, payload);

    invoice.status = calculateInvoiceStatus(
        invoice.amount,
        invoice.paidAmount,
        invoice.dueDate
    );

    await invoice.save();
    return invoice;
};

const deleteAR = async (id) => {
    const invoice = await AccountsReceivable.findById(id);

    if (!invoice) {
        const error = new Error("AR invoice not found");
        error.statusCode = 404;
        throw error;
    }

    const closed = await isMonthClosed(invoice.invoiceDate);
    if (closed) {
        const error = new Error("Cannot delete invoice in closed month");
        error.statusCode = 400;
        throw error;
    }

    await AccountsReceivable.findByIdAndDelete(id);

    return { message: "AR invoice deleted successfully" };
};

module.exports = {
    createAR,
    getAllAR,
    getARById,
    updateAR,
    deleteAR,
};
