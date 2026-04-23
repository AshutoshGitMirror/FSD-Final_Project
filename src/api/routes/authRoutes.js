import bcrypt from "bcryptjs";
import { Router } from "express";
import { authRequired, requireRoles, signAccessToken } from "../auth.js";
import { insertAuditLog, toPublicUser } from "../db.js";
import { parsePayload } from "../http/helpers.js";
import { createRateLimiter } from "../http/rateLimit.js";
import { loginSchema, registerSchema } from "../http/schemas.js";

export const createAuthRouter = ({ db, publishEvent }) => {
  const router = Router();
  const authLimiter = createRateLimiter({
    windowMs: 60_000,
    max: 20,
    keyFromRequest: (request) => `${request.ip}:${request.path}`
  });

  router.post("/auth/register", authLimiter, (request, response) => {
    const payload = parsePayload(registerSchema, request.body, response);
    if (!payload) return;

    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(payload.email);
    if (existing) { response.status(409).json({ error: "Email already registered" }); return; }

    const hash = bcrypt.hashSync(payload.password, 10);
    const role = "citizen";
    const info = db.prepare(
      `INSERT INTO users(name, email, password_hash, role, ward_code, created_at) VALUES (?, ?, ?, ?, ?, ?)`
    ).run(payload.name, payload.email, hash, role, payload.wardCode ?? null, new Date().toISOString());

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(info.lastInsertRowid);
    insertAuditLog(db, { actorId: user.id, action: "user.register", entityType: "user", entityId: String(user.id), payload: { role: user.role, wardCode: user.ward_code } });
    const publicUser = toPublicUser(user);
    response.status(201).json({ user: publicUser, token: signAccessToken(publicUser) });
  });

  router.post("/auth/login", authLimiter, (request, response) => {
    const payload = parsePayload(loginSchema, request.body, response);
    if (!payload) return;

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(payload.email);
    if (!user) { response.status(401).json({ error: "Invalid credentials" }); return; }
    const match = bcrypt.compareSync(payload.password, user.password_hash);
    if (!match) { response.status(401).json({ error: "Invalid credentials" }); return; }

    const publicUser = toPublicUser(user);
    response.json({ user: publicUser, token: signAccessToken(publicUser) });
  });

  router.get("/auth/me", authRequired, (request, response) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(request.auth.sub);
    if (!user) { response.status(404).json({ error: "User not found" }); return; }
    response.json({ user: toPublicUser(user) });
  });

  // ─── User Management (Admin only) ───
  router.get("/users", authRequired, requireRoles("city_admin"), (_request, response) => {
    const rows = db.prepare("SELECT id, name, email, role, ward_code, created_at FROM users ORDER BY created_at DESC").all();
    response.json({ users: rows.map(toPublicUser) });
  });

  router.patch("/users/:id/role", authRequired, requireRoles("city_admin"), (request, response) => {
    const { role, wardCode } = request.body;
    const validRoles = ["city_admin", "zone_officer", "health_advisor", "citizen"];
    if (!role || !validRoles.includes(role)) {
      response.status(400).json({ error: `Invalid role. Must be one of: ${validRoles.join(", ")}` });
      return;
    }

    const target = db.prepare("SELECT * FROM users WHERE id = ?").get(request.params.id);
    if (!target) { response.status(404).json({ error: "User not found" }); return; }

    if (Number(request.params.id) === request.auth.sub) {
      response.status(400).json({ error: "Cannot change your own role" });
      return;
    }

    db.prepare("UPDATE users SET role = ?, ward_code = ? WHERE id = ?")
      .run(role, wardCode ?? null, request.params.id);

    insertAuditLog(db, {
      actorId: request.auth.sub,
      action: "user.role_change",
      entityType: "user",
      entityId: String(request.params.id),
      payload: { previousRole: target.role, newRole: role, wardCode }
    });
    publishEvent("user.role_changed", { userId: Number(request.params.id), role, wardCode });
    response.json({ status: "updated" });
  });

  return router;
};
