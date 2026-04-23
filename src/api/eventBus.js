import { EventEmitter } from "node:events";

export const eventBus = new EventEmitter();
eventBus.setMaxListeners(100);

export const publishEvent = (type, payload) => {
  eventBus.emit("event", {
    type,
    payload,
    emittedAt: new Date().toISOString()
  });
};
