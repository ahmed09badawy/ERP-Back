const JournalEntry = require("./journal.model");
const ChartOfAccount = require("../chartOfAccounts/coa.model");
const { isMonthClosed } = require("../monthlyClosing/monthlyClosing.service");

const validateBalancedEntry = (lines) => {
    const totalDebit = lines.reduce((sum, line) => sum + (line.debit || 0), 0);
    const totalCredit = lines.reduce((sum, line) => sum + (line.credit || 0), 0);

    if (totalDebit !== totalCredit) {
        const error = new Error("Journal entry is not balanced");
        error.statusCode = 400;
        throw error;
    }
};


const validateAccounts = async (lines) => {
    for (const line of lines) {
        const account = await ChartOfAccount.findById(line.accountId);
        if (!account) {
            const error = new Error(`Account not found: ${line.accountId}`);
            error.statusCode = 404;
            throw error;
        }
    }
};

const createJournal = async (payload) => {

    const closed = await isMonthClosed(payload.entryDate);
    if (closed) {
        const error = new Error("Month is closed");
        error.statusCode = 400;
        throw error;
    }

    validateBalancedEntry(payload.lines);
    await validateAccounts(payload.lines);

    return JournalEntry.create({
        ...payload,
        referenceNumber: payload.referenceNumber.toUpperCase(),
    });
};

const createAutoJournal = async (payload) => {
    return await createJournal(payload);
};

const getAllJournal = async () => {
    return JournalEntry.find()
        .populate("lines.accountId")
        .sort({ createdAt: -1 });
};

const getJournalById = async (id) => {
    const entry = await JournalEntry.findById(id).populate("lines.accountId");

    if (!entry) {
        const error = new Error("Journal entry not found");
        error.statusCode = 404;
        throw error;
    }

    return entry;
};

const updateJournal = async (id, payload) => {
    const entry = await JournalEntry.findById(id);

    if (!entry) {
        const error = new Error("Journal entry not found");
        error.statusCode = 404;
        throw error;
    }

    const dateToCheck = payload.entryDate || entry.entryDate;

    const closed = await isMonthClosed(dateToCheck);
    if (closed) {
        const error = new Error("Month is closed");
        error.statusCode = 400;
        throw error;
    }

    if (payload.lines) {
        validateBalancedEntry(payload.lines);
        await validateAccounts(payload.lines);
    }

    Object.assign(entry, payload);

    if (payload.referenceNumber) {
        entry.referenceNumber = payload.referenceNumber.toUpperCase();
    }

    await entry.save();

    return JournalEntry.findById(id).populate("lines.accountId");
};

const deleteJournal = async (id) => {
    const entry = await JournalEntry.findById(id);

    if (!entry) {
        const error = new Error("Journal entry not found");
        error.statusCode = 404;
        throw error;
    }

    const closed = await isMonthClosed(entry.entryDate);
    if (closed) {
        const error = new Error("Cannot delete entry in closed month");
        error.statusCode = 400;
        throw error;
    }

    await JournalEntry.findByIdAndDelete(id);

    return { message: "Journal entry deleted successfully" };
};

module.exports = {
    createJournal,
    createAutoJournal,
    getAllJournal,
    getJournalById,
    updateJournal,
    deleteJournal,
};
