const JournalEntry = require("../../journal/journal.model");
const ChartOfAccount = require("../../chartOfAccounts/coa.model");

const getGeneralLedger = async (filters) => {
    const accountId = filters.accountId;
    const fromDate = filters.fromDate
        ? new Date(filters.fromDate)
        : new Date("2000-01-01");
    const toDate = filters.toDate
        ? new Date(filters.toDate)
        : new Date();

    if (!accountId) {
        const error = new Error("accountId is required");
        error.statusCode = 400;
        throw error;
    }

    const account = await ChartOfAccount.findById(accountId);
    if (!account) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }

    const entries = await JournalEntry.find({
        entryDate: { $gte: fromDate, $lte: toDate },
        "lines.accountId": accountId,
    }).sort({ entryDate: 1 });

    let runningBalance = 0;

    const ledgerLines = entries.map((entry) => {
        const line = entry.lines.find(
            (l) => l.accountId.toString() === accountId
        );

        const debit = line?.debit || 0;
        const credit = line?.credit || 0;

        runningBalance += debit - credit;

        return {
            entryDate: entry.entryDate,
            referenceNumber: entry.referenceNumber,
            memo: entry.memo,
            debit,
            credit,
            balance: runningBalance,
        };
    });

    return {
        account: {
            id: account._id,
            code: account.accountCode,
            name: account.accountName,
            type: account.accountType,
        },
        fromDate,
        toDate,
        totalTransactions: ledgerLines.length,
        ledgerLines,
        closingBalance: runningBalance,
    };
};

module.exports = { getGeneralLedger };
