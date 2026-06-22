const router = require("express").Router();
const coaRoutes = require("./chartOfAccounts/coa.routes");
const journalRoutes = require("./journal/journal.routes");
const generalLedgerRoutes = require("./reports/generalLedger/generalLedger.routes");
const trialBalanceRoutes = require("./reports/trialBalance/trialBalance.routes");
const profitAndLossRoutes = require("./reports/profitAndloss/profitAndloss.routes");
const balanceSheetRoutes = require("./reports/balanceSheet/balanceSheet.routes");
const accountReceivableRoutes = require("./accountReceivable/accountReceivable.routes");
const accountReceivablePaymentsRoutes = require("./accountReceivablePayments/accountReceivablePayments.routes");
const accountPayableRoutes = require("./accountPayable/accountPayable.routes");
const accountPayablePaymentRoutes = require("./accountPayablePayments/accountPayablePayments.routes");
const taxRoutes = require("./tax/tax.routes");
const budgetRoutes = require("./budget/budget.routes");
const incomeRoutes = require("./income/income.routes");
const expensesRoutes = require("./expenses/expenses.routes");
const bankRoutes = require("./bankAccount/bankAccount.routes");
const currencyRoutes = require("./currency/currency.routes");
const exchangeRateRoutes = require("./exchangeRate/exchangeRate.routes");
const closingRoutes = require("./monthlyClosing/monthlyClosing.routes");




router.use("/chart-of-accounts", coaRoutes);
router.use("/journal-entries", journalRoutes);
router.use("/reports/general-ledger", generalLedgerRoutes);
router.use("/reports/trial-balance", trialBalanceRoutes);
router.use("/reports/profit-loss", profitAndLossRoutes);
router.use("/reports/balance-sheet", balanceSheetRoutes);
router.use("/accounts-receivable", accountReceivableRoutes);
router.use("/accounts-receivable-payments", accountReceivablePaymentsRoutes);
router.use("/accounts-payable", accountPayableRoutes);      
router.use("/accounts-payable-payments", accountPayablePaymentRoutes);
router.use("/taxes", taxRoutes);
router.use("/budgets", budgetRoutes);
router.use("/income", incomeRoutes);
router.use("/expenses", expensesRoutes);
router.use("/bank-accounts", bankRoutes);
router.use("/currencies", currencyRoutes);
router.use("/exchange-rates", exchangeRateRoutes);
router.use("/closing", closingRoutes);

module.exports = router;
