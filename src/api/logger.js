const log = (level, message, context = {}) => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context
  };

  // Redaction for common sensitive keys
  const sensitiveKeys = ["token", "password", "secret", "authorization"];
  const safeEntry = JSON.parse(JSON.stringify(entry));

  const redact = (obj) => {
    for (const key in obj) {
      if (sensitiveKeys.includes(key.toLowerCase())) {
        obj[key] = "[REDACTED]";
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        redact(obj[key]);
      }
    }
  };
  redact(safeEntry);

  if (level === "error" || level === "fatal") {
    process.stderr.write(JSON.stringify(safeEntry) + "\n");
  } else {
    process.stdout.write(JSON.stringify(safeEntry) + "\n");
  }
};

export const logger = {
  info: (message, context) => log("info", message, context),
  warn: (message, context) => log("warn", message, context),
  error: (message, context) => log("error", message, context),
  fatal: (message, context) => log("fatal", message, context)
};
