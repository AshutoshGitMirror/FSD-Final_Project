import { Router } from "express";
import { authRequired, requireRoles } from "../auth.js";
import { insertAuditLog, toAdvisoryRecord } from "../db.js";
import { parsePayload, readWardOrNull } from "../http/helpers.js";
import { advisorySchema } from "../http/schemas.js";
import { fetchExternalAdvisories } from "../services/externalAdvisoryService.js";

export const createAdvisoryRouter = ({ db, publishEvent, fetchImpl }) => {
  const router = Router();

  router.get("/advisories/public", async (request, response) => {
    const wardCode = typeof request.query.wardCode === "string" ? request.query.wardCode : null;
    const rows = wardCode
      ? db.prepare("SELECT * FROM advisories WHERE public = 1 AND (ward_code = ? OR ward_code IS NULL) ORDER BY created_at DESC").all(wardCode)
      : db.prepare("SELECT * FROM advisories WHERE public = 1 ORDER BY created_at DESC").all();

    const internalAdvisories = rows.map(toAdvisoryRecord);
    let externalAdvisories = [];
    let externalStatus = "ok";
    try {
      externalAdvisories = await fetchExternalAdvisories(fetchImpl);
      if (externalAdvisories.length === 0) externalStatus = "empty";
    } catch {
      externalStatus = "unavailable";
    }

    response.json({
      advisories: [...externalAdvisories, ...internalAdvisories],
      feedMeta: { externalStatus, externalCount: externalAdvisories.length, internalCount: internalAdvisories.length }
    });
  });

  router.get("/advisories", authRequired, (request, response) => {
    const wardScope = readWardOrNull(request.auth);
    const rows = wardScope
      ? db.prepare("SELECT * FROM advisories WHERE ward_code = ? OR ward_code IS NULL ORDER BY created_at DESC").all(wardScope)
      : db.prepare("SELECT * FROM advisories ORDER BY created_at DESC").all();
    response.json({ advisories: rows.map(toAdvisoryRecord) });
  });

  router.post(
    "/advisories",
    authRequired,
    requireRoles("city_admin", "zone_officer", "health_advisor"),
    (request, response) => {
      const payload = parsePayload(advisorySchema, request.body, response);
      if (!payload) return;

      const wardScope = readWardOrNull(request.auth);
      if (wardScope && payload.wardCode && payload.wardCode !== wardScope) {
        response.status(403).json({ error: "Ward scope violation" });
        return;
      }

      const info = db.prepare(
        `INSERT INTO advisories(ward_code, title, message, language, priority, public, source_url, created_by, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(payload.wardCode ?? wardScope, payload.title, payload.message, payload.language, payload.priority, payload.public ? 1 : 0, payload.sourceUrl ?? null, request.auth.sub, new Date().toISOString());

      insertAuditLog(db, { actorId: request.auth.sub, action: "advisory.create", entityType: "advisory", entityId: String(info.lastInsertRowid), payload });
      publishEvent("advisory.created", { id: info.lastInsertRowid, ...payload });
      response.status(201).json({ id: info.lastInsertRowid });
    }
  );

  return router;
};
