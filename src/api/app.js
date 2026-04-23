import cors from "cors";
import express from "express";
import helmet from "helmet";
import { logger } from "./logger.js";
import { createApiRouter } from "./routes/index.js";

export const createApp = ({ db, publishEvent, eventBus, fetchImpl }) => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use("/api", createApiRouter({ db, publishEvent, eventBus, fetchImpl }));

  app.use((error, _request, response, _next) => {
    logger.error("Unhandled request error", { error: error.message, stack: error.stack });
    response.status(500).json({ error: "Internal server error" });
  });

  return app;
};
