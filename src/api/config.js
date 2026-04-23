import { logger } from "./logger.js";

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const config = {
  port: toInt(process.env.API_PORT, 4000),
  dbFile: process.env.DB_FILE ?? "./vayusetu.sqlite",
  jwtSecret: process.env.JWT_SECRET ?? "replace-this-secret-in-production",
  jwtTtl: process.env.JWT_TTL ?? "12h",
  appName: "VayuSetu Mumbai API"
};

if (config.jwtSecret === "replace-this-secret-in-production") {
  logger.warn("Using default JWT secret. Set JWT_SECRET for production deployments.");
}
