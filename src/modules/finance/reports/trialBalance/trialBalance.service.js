const JournalEntry = require("../../journal/journal.model");
const ChartOfAccount = require("../../chartOfAccounts/coa.model");

const getTrialBalance = async (filters) => {
    const fromDate = filters.fromDate
        ? new Date(filters.fromDate)
        : new Date("2000-01-01");

    const toDate = filters.toDate
        ? new Date(filters.toDate)
        : new Date();

    const accounts = await ChartOfAccount.find().sort({ accountCode: 1 });

    const entries = await JournalEntry.find({
        entryDate: { $gte: fromDate, $lte: toDate },
    });

    const reportLines = [];
    let totalDebit = 0;
    let totalCredit = 0;

    for (const account of accounts) {
        let debit = 0;
        let credit = 0;

        for (const entry of entries) {
            for (const line of entry.lines) {
                if (line.accountId.toString() === account._id.toString()) {
                    debit += line.debit || 0;
                    credit += line.credit || 0;
                }
            }
        }

        if (debit > 0 || credit > 0) {
            reportLines.push({
                accountId: account._id,
                accountCode: account.accountCode,
                accountName: account.accountName,
                accountType: account.accountType,
                debit,
                credit,
            });

            totalDebit += debit;
            totalCredit += credit;
        }
    }

    return {
        fromDate,
        toDate,
        totalAccounts: reportLines.length,
        totalDebit,
        totalCredit,
        isBalanced: totalDebit === totalCredit,
        lines: reportLines,
    };
};

module.exports = { getTrialBalance };
