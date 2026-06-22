const { EventEmitter } = require("events");

class ErpEventBus extends EventEmitter {
    emitAsync(event, payload) {
        const listeners = this.listeners(event);

        return Promise.allSettled(
            listeners.map((handler) =>
                Promise.resolve().then(() => handler(payload))
            )
        ).then((results) => {
            for (const result of results) {
                if (result.status === "rejected") {
                    console.error(
                        `[EventBus] Handler failed for "${event}":`,
                        result.reason?.message || result.reason
                    );
                }
            }
            return results;
        });
    }
}

const eventBus = new ErpEventBus();
eventBus.setMaxListeners(50);

module.exports = eventBus;
