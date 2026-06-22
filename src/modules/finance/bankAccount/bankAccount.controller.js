const service = require("./bankAccount.service");
const {
    createBankSchema,
    updateBankSchema,
} = require("./bankAccount.validation");

const createBankAccount = async (req, res) => {
    const validated = createBankSchema.parse(req.body);
    const result = await service.createBankAccount(validated);

    res.status(201).json({ success: true, data: result });
};

const getAllBankAccounts = async (req, res) => {
    const result = await service.getAllBankAccounts();
    res.status(200).json({ success: true, data: result });
};

const getBankById = async (req, res) => {
    const result = await service.getBankById(req.params.id);
    res.status(200).json({ success: true, data: result });
};

const updateBankAccount = async (req, res) => {
    const validated = updateBankSchema.parse(req.body);
    const result = await service.updateBankAccount(req.params.id, validated);

    res.status(200).json({ success: true, data: result });
};

const deleteBankAccount = async (req, res) => {
    const result = await service.deleteBankAccount(req.params.id);
    res.status(200).json({ success: true, ...result });
};

module.exports = {
    createBankAccount,
    getAllBankAccounts,
    getBankById,
    updateBankAccount,
    deleteBankAccount,
};
