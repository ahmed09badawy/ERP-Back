const eventBus = require("../../events/eventBus");
const EVENTS = require("../../events/eventTypes");
const { processManufacturingCompletion } = require("../manufacturingIntegration.service");

const registerManufacturingHandlers = () => {
    eventBus.on(EVENTS.MANUFACTURING_ORDER_DONE, async (order) => {
        try {
            await processManufacturingCompletion(order);
        } catch (error) {
            console.error("[ManufacturingHandler] MO completion:", error.message);
        }
    });
};

module.exports = { registerManufacturingHandlers };
