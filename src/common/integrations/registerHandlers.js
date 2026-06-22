const { registerFinanceHandlers } = require("./handlers/financeHandler");
const { registerStockHandlers } = require("./handlers/stockHandler");
const { registerPurchaseHandlers } = require("./handlers/purchaseHandler");
const { registerManufacturingHandlers } = require("./handlers/manufacturingHandler");

const registerIntegrationHandlers = () => {
    registerFinanceHandlers();
    registerStockHandlers();
    registerPurchaseHandlers();
    registerManufacturingHandlers();
};

module.exports = { registerIntegrationHandlers };
