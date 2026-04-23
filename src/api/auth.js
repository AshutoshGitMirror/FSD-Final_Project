import jwt from "jsonwebtoken";
import { config } from "./config.js";

const bearerPrefix = "Bearer ";

export const verifyAccessToken = (token) => jwt.verify(token, config.jwtSecret);

export const signAccessToken = (user) =>
  jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      wardCode: user.wardCode ?? null
    },
    config.jwtSecret,
    { expiresIn: config.jwtTtl }
  );

export const authRequired = (request, response, next) => {
  const header = request.headers.authorization;
  if (!header || !header.startsWith(bearerPrefix)) {
    return response.status(401).json({ error: "Missing bearer token" });
  }

  const token = header.slice(bearerPrefix.length);
  try {
    request.auth = verifyAccessToken(token);
    return next();
  } catch {
    return response.status(401).json({ error: "Invalid or expired token" });
  }
};

export const authFromBearerOrQuery = (request, response, next) => {
  const header = request.headers.authorization;
  const queryToken = typeof request.query.token === "string" ? request.query.token : null;

  const token = header?.startsWith(bearerPrefix)
    ? header.slice(bearerPrefix.length)
    : queryToken;

  if (!token) {
    return response.status(401).json({ error: "Missing auth token" });
  }

  try {
    request.auth = verifyAccessToken(token);
    return next();
  } catch {
    return response.status(401).json({ error: "Invalid or expired token" });
  }
};

export const requireRoles = (...roles) => (request, response, next) => {
  if (!request.auth) {
    return response.status(401).json({ error: "Authentication required" });
  }

  if (!roles.includes(request.auth.role)) {
    return response.status(403).json({ error: "Insufficient permissions" });
  }

  return next();
};
