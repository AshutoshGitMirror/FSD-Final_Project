import { createApp } from "./app.js";
import { config } from "./config.js";
import { initializeDatabase } from "./db.js";
import { eventBus, publishEvent } from "./eventBus.js";
import { logger } from "./logger.js";
import { runLiveIngestion } from "./routes/externalDataRoutes.js";

const db = initializeDatabase(config.dbFile);
const app = createApp({ db, publishEvent, eventBus });

const server = app.listen(config.port, () => {
  logger.info(`${config.appName} listening`, { port: config.port });
});

// Automated Background Ingestion (Every 5 minutes)
const INGEST_INTERVAL_MS = 5 * 60 * 1000;
const ingestionInterval = setInterval(async () => {
  try {
    const result = await runLiveIngestion({ db, publishEvent });
    logger.info("Background AQI Ingestion Complete", { updated: result.wardsUpdated });
  } catch (error) {
    logger.error("Background AQI Ingestion Failed", { error: error.message });
  }
}, INGEST_INTERVAL_MS);

// Trigger initial ingestion after 5 seconds to ensure server is fully booted
setTimeout(() => runLiveIngestion({ db, publishEvent }).catch(e => logger.error("Initial Ingest Failed", { e: e.message })), 5000);

let isShuttingDown = false;
const shutdown = (reason = "signal") => {
  if (isShuttingDown) {
    return;
  }
  isShuttingDown = true;
  logger.info("Closing services", { reason });
  clearInterval(ingestionInterval);
  server.close(() => {
    db.close();
    process.exit(reason === "signal" ? 0 : 1);
  });
};

process.on("SIGINT", () => shutdown("signal"));
process.on("SIGTERM", () => shutdown("signal"));
process.on("uncaughtException", (error) => {
  logger.fatal("uncaughtException", { error: error.message, stack: error.stack });
  shutdown("fatal");
});
process.on("unhandledRejection", (reason) => {
  logger.fatal("unhandledRejection", { reason });
  shutdown("fatal");
});
