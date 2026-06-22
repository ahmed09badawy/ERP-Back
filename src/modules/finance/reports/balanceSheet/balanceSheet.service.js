const JournalEntry = require("../../journal/journal.model");
const ChartOfAccount = require("../../chartOfAccounts/coa.model");

const calculateAccountBalance = (entries, accountId, accountType) => {
    let balance = 0;

    for (const entry of entries) {
        for (const line of entry.lines) {
            if (line.accountId.toString() === accountId.toString()) {
                if (["ASSET", "EXPENSE"].includes(accountType)) {
                    balance += (line.debit || 0) - (line.credit || 0);
                } else {
                    balance += (line.credit || 0) - (line.debit || 0);
                }
            }
        }
    }

    return balance;
};

const getBalanceSheet = async (filters) => {
    const asOfDate = filters.asOfDate
        ? new Date(filters.asOfDate)
        : new Date();

    const entries = await JournalEntry.find({
        entryDate: { $lte: asOfDate },
    });

    const assets = await ChartOfAccount.find({ accountType: "ASSET" });
    const liabilities = await ChartOfAccount.find({
        accountType: "LIABILITY",
    });
    const equity = await ChartOfAccount.find({ accountType: "EQUITY" });

    const assetLines = [];
    const liabilityLines = [];
    const equityLines = [];

    let totalAssets = 0;
    let totalLiabilities = 0;
    let totalEquity = 0;

    for (const account of assets) {
        const amount = calculateAccountBalance(
            entries,
            account._id,
            account.accountType
        );

        if (amount !== 0) {
            assetLines.push({
                accountCode: account.accountCode,
                accountName: account.accountName,
                amount,
            });

            totalAssets += amount;
        }
    }

    for (const account of liabilities) {
        const amount = calculateAccountBalance(
            entries,
            account._id,
            account.accountType
        );

        if (amount !== 0) {
            liabilityLines.push({
                accountCode: account.accountCode,
                accountName: account.accountName,
                amount,
            });

            totalLiabilities += amount;
        }
    }

    for (const account of equity) {
        const amount = calculateAccountBalance(
            entries,
            account._id,
            account.accountType
        );

        if (amount !== 0) {
            equityLines.push({
                accountCode: account.accountCode,
                accountName: account.accountName,
                amount,
            });

            totalEquity += amount;
        }
    }

    return {
        asOfDate,
        assets: assetLines,
        liabilities: liabilityLines,
        equity: equityLines,
        totalAssets,
        totalLiabilities,
        totalEquity,
        isBalanced: totalAssets === totalLiabilities + totalEquity,
    };
};

module.exports = { getBalanceSheet };
