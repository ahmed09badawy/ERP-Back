const JournalEntry = require("../../journal/journal.model");
const ChartOfAccount = require("../../chartOfAccounts/coa.model");

const getProfitAndLoss = async (filters) => {
    const fromDate = filters.fromDate
        ? new Date(filters.fromDate)
        : new Date("2000-01-01");

    const toDate = filters.toDate
        ? new Date(filters.toDate)
        : new Date();

    const revenueAccounts = await ChartOfAccount.find({
        accountType: "REVENUE",
    });

    const expenseAccounts = await ChartOfAccount.find({
        accountType: "EXPENSE",
    });

    const entries = await JournalEntry.find({
        entryDate: { $gte: fromDate, $lte: toDate },
    });

    let totalRevenue = 0;
    let totalExpense = 0;

    const revenueLines = [];
    const expenseLines = [];

    for (const account of revenueAccounts) {
        let amount = 0;

        for (const entry of entries) {
            for (const line of entry.lines) {
                if (line.accountId.toString() === account._id.toString()) {
                    amount += line.credit || 0;
                    amount -= line.debit || 0;
                }
            }
        }

        if (amount !== 0) {
            revenueLines.push({
                accountCode: account.accountCode,
                accountName: account.accountName,
                amount,
            });

            totalRevenue += amount;
        }
    }

    for (const account of expenseAccounts) {
        let amount = 0;

        for (const entry of entries) {
            for (const line of entry.lines) {
                if (line.accountId.toString() === account._id.toString()) {
                    amount += line.debit || 0;
                    amount -= line.credit || 0;
                }
            }
        }

        if (amount !== 0) {
            expenseLines.push({
                accountCode: account.accountCode,
                accountName: account.accountName,
                amount,
            });

            totalExpense += amount;
        }
    }

    return {
        fromDate,
        toDate,
        revenues: revenueLines,
        expenses: expenseLines,
        totalRevenue,
        totalExpense,
        netProfit: totalRevenue - totalExpense,
    };
};

module.exports = { getProfitAndLoss };
