const BankAccount = require("./bankAccount.model");

const createBankAccount = async (payload) => {
    const exists = await BankAccount.findOne({
        accountNumber: payload.accountNumber,
    });

    if (exists) {
        const error = new Error("Account number already exists");
        error.statusCode = 400;
        throw error;
    }

    return BankAccount.create(payload);
};

const getAllBankAccounts = async () => {
    return BankAccount.find({ isDeleted: false })
        .sort({ createdAt: -1 });
};

const getBankById = async (id) => {
    const account = await BankAccount.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!account) {
        const error = new Error("Bank account not found");
        error.statusCode = 404;
        throw error;
    }

    return account;
};

const updateBankAccount = async (id, payload) => {
    const account = await BankAccount.findById(id);

    if (!account || account.isDeleted) {
        const error = new Error("Bank account not found");
        error.statusCode = 404;
        throw error;
    }

    Object.assign(account, payload);
    await account.save();

    return account;
};

const deleteBankAccount = async (id) => {
    const account = await BankAccount.findById(id);

    if (!account || account.isDeleted) {
        const error = new Error("Bank account not found");
        error.statusCode = 404;
        throw error;
    }

    account.isDeleted = true;
    await account.save();

    return { message: "Bank account deleted successfully" };
};

module.exports = {
    createBankAccount,
    getAllBankAccounts,
    getBankById,
    updateBankAccount,
    deleteBankAccount,
};
