const Contact = require("./contact.model");
const Counter = require("../../assets/counter.model");
const ChartOfAccount = require("../../finance/chartOfAccounts/coa.model");

const generateContactCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "contact" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `CNT-${String(counter.seq).padStart(4, "0")}`;
};

const getOrCreateParentAccount = async (accountName, accountType, accountCode) => {
    let account = await ChartOfAccount.findOne({ accountName });
    if (!account) {
        // Check if code already exists with a different name
        const existingCode = await ChartOfAccount.findOne({ accountCode: accountCode.toUpperCase() });
        if (existingCode) return existingCode;

        account = await ChartOfAccount.create({
            accountName,
            accountType,
            accountCode: accountCode.toUpperCase(),
            level: 1
        });
    }
    return account;
};

const createSubAccount = async (parentAccount, contactName) => {
    const counter = await Counter.findOneAndUpdate(
        { name: `account_${parentAccount.accountCode}` },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    const subCode = `${parentAccount.accountCode}-${String(counter.seq).padStart(4, "0")}`;

    return await ChartOfAccount.create({
        accountName: contactName,
        accountType: parentAccount.accountType,
        accountCode: subCode,
        parentAccountId: parentAccount._id,
        level: parentAccount.level + 1
    });
};

const createContact = async (data) => {
    data.contactCode = await generateContactCode();

    const contact = new Contact(data);

    if (data.isCustomer) {
        const parent = await getOrCreateParentAccount("Customers Receivable", "ASSET", "1200");
        const account = await createSubAccount(parent, data.name);
        contact.receivableAccountId = account._id;
    }

    if (data.isSupplier) {
        const parent = await getOrCreateParentAccount("Suppliers Payable", "LIABILITY", "2100");
        const account = await createSubAccount(parent, data.name);
        contact.payableAccountId = account._id;
    }

    return await contact.save();
};

const getAllContacts = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { isDeleted: false };

    // Add search filter if needed
    if (query.search) {
        filter.$or = [
            { name: { $regex: query.search, $options: "i" } },
            { nameEn: { $regex: query.search, $options: "i" } },
            { companyName: { $regex: query.search, $options: "i" } },
            { companyNameEn: { $regex: query.search, $options: "i" } },
            { phone: { $regex: query.search, $options: "i" } },
            { mobile: { $regex: query.search, $options: "i" } },
            { tags: { $regex: query.search, $options: "i" } }
        ];
    }

    if (query.groupId) filter.groupId = query.groupId;
    if (query.tags) filter.tags = { $regex: query.tags, $options: "i" };
    if (query.isCustomer !== undefined) filter.isCustomer = query.isCustomer === "true";
    if (query.isSupplier !== undefined) filter.isSupplier = query.isSupplier === "true";

    const [contacts, total] = await Promise.all([
        Contact.find(filter)
            .populate("receivableAccountId")
            .populate("payableAccountId")
            .populate("groupId")
            .populate("pricelistId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Contact.countDocuments(filter)
    ]);

    return {
        contacts,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    };
};

const getContactById = async (id) => {
    return await Contact.findById(id)
        .populate("receivableAccountId")
        .populate("payableAccountId")
        .populate("groupId")
        .populate("pricelistId");
};

const updateContact = async (id, data) => {
    const contact = await Contact.findById(id);
    if (!contact) return null;

    // Handle transition to customer
    if (data.isCustomer && !contact.isCustomer && !contact.receivableAccountId) {
        const parent = await getOrCreateParentAccount("Customers Receivable", "ASSET", "1200");
        const account = await createSubAccount(parent, data.name || contact.name);
        data.receivableAccountId = account._id;
    }

    // Handle transition to supplier
    if (data.isSupplier && !contact.isSupplier && !contact.payableAccountId) {
        const parent = await getOrCreateParentAccount("Suppliers Payable", "LIABILITY", "2100");
        const account = await createSubAccount(parent, data.name || contact.name);
        data.payableAccountId = account._id;
    }

    // If name changed, update linked accounts names
    if (data.name && data.name !== contact.name) {
        if (contact.receivableAccountId) {
            await ChartOfAccount.findByIdAndUpdate(contact.receivableAccountId, { accountName: data.name });
        }
        if (contact.payableAccountId) {
            await ChartOfAccount.findByIdAndUpdate(contact.payableAccountId, { accountName: data.name });
        }
    }

    return await Contact.findByIdAndUpdate(id, data, { returnDocument: "after" })
        .populate("receivableAccountId")
        .populate("payableAccountId")
        .populate("groupId")
        .populate("pricelistId");
};

const deleteContact = async (id) => {
    return await Contact.findByIdAndUpdate(id, { isDeleted: true });
};

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact,
};
