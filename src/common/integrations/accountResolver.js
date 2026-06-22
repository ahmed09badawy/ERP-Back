const ChartOfAccount = require("../../modules/finance/chartOfAccounts/coa.model");
const Contact = require("../../modules/crm/contacts/contact.model");
const Category = require("../../modules/inventoryModule/category/category.model");

const getDefaultAccount = async (accountCategory) =>
    ChartOfAccount.findOne({ accountCategory, isActive: true }).sort({ createdAt: 1 });

const resolveCustomerReceivableAccount = async (customer) => {
    if (!customer) return null;

    const filters = [{ name: customer.customerName }];

    if (customer.email) {
        filters.push({ email: customer.email });
    }

    const contact = await Contact.findOne({
        isCustomer: true,
        isDeleted: false,
        $or: filters,
    });

    if (contact?.receivableAccountId) {
        return contact.receivableAccountId;
    }

    const defaultAccount = await getDefaultAccount("RECEIVABLE");
    return defaultAccount?._id || null;
};

const resolveSupplierPayableAccount = async (supplier) => {
    if (!supplier) return null;

    const filters = [{ name: supplier.supplierName }];

    if (supplier.email) {
        filters.push({ email: supplier.email });
    }

    const contact = await Contact.findOne({
        isSupplier: true,
        isDeleted: false,
        $or: filters,
    });

    if (contact?.payableAccountId) {
        return contact.payableAccountId;
    }

    const defaultAccount = await getDefaultAccount("PAYABLE");
    return defaultAccount?._id || null;
};

const resolveProductAccounts = async (product) => {
    if (!product) return null;

    if (product.category) {
        const category = await Category.findOne({
            name: { $regex: new RegExp(`^${product.category}$`, "i") },
            isDeleted: false,
        });

        if (category) {
            return {
                incomeAccountId: category.incomeAccountId,
                cogsAccountId: category.costOfGoodsSoldAccountId,
                inventoryAccountId: category.inventoryValuationAccountId,
                expenseAccountId: category.expenseAccountId,
            };
        }
    }

    const [sales, cogs, inventory, expense] = await Promise.all([
        getDefaultAccount("SALES"),
        getDefaultAccount("COGS"),
        getDefaultAccount("INVENTORY"),
        getDefaultAccount("EXPENSE"),
    ]);

    if (!sales || !cogs || !inventory) {
        return null;
    }

    return {
        incomeAccountId: sales._id,
        cogsAccountId: cogs._id,
        inventoryAccountId: inventory._id,
        expenseAccountId: expense?._id || cogs._id,
    };
};

const resolveCashAccount = async (paymentMethod = "CASH") => {
    const category = paymentMethod === "BANK_TRANSFER" ? "BANK" : "CASH";
    const account = await getDefaultAccount(category);
    return account?._id || null;
};

module.exports = {
    getDefaultAccount,
    resolveCustomerReceivableAccount,
    resolveSupplierPayableAccount,
    resolveProductAccounts,
    resolveCashAccount,
};
