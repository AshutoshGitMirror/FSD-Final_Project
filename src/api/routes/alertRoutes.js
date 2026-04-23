import { Router } from "express";
import { authFromBearerOrQuery } from "../auth.js";
import { readWardOrNull } from "../http/helpers.js";

export const createAlertRouter = ({ eventBus, publishEvent }) => {
  const router = Router();

  router.get("/alerts/stream", authFromBearerOrQuery, (request, response) => {
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Connection", "keep-alive");
    response.flushHeaders();

    response.write(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`);

    const listener = (event) => {
      const wardScope = readWardOrNull(request.auth);
      const eventWard = event.payload?.wardCode ?? null;
      if (wardScope && eventWard && wardScope !== eventWard) {
        return;
      }
      response.write(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`);
    };

    const heartbeat = setInterval(() => {
      response.write(`event: heartbeat\ndata: ${JSON.stringify({ ts: new Date().toISOString() })}\n\n`);
    }, 15000);

    eventBus.on("event", listener);
    publishEvent("system.heartbeat", { source: "sse.connect" });

    request.on("close", () => {
      clearInterval(heartbeat);
      eventBus.off("event", listener);
      publishEvent("system.heartbeat", { source: "sse.disconnect" });
    });
  });

  return router;
};
