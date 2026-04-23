import { Router } from "express";
import { authRequired, requireRoles } from "../auth.js";
import { insertAuditLog, toIncidentRecord } from "../db.js";
import { parsePayload, readWardOrNull, safeWardScope } from "../http/helpers.js";
import { assignIncidentSchema, incidentSchema, statusPatchSchema } from "../http/schemas.js";

export const createIncidentRouter = ({ db, publishEvent }) => {
  const router = Router();

  router.get("/incidents", authRequired, (request, response) => {
    const requestedWard = typeof request.query.wardCode === "string" ? request.query.wardCode : null;
    const scopedWard = safeWardScope(request.auth, requestedWard);
    const status = typeof request.query.status === "string" ? request.query.status : null;

    let query = "SELECT * FROM incidents WHERE 1 = 1";
    const params = [];
    if (scopedWard) { query += " AND ward_code = ?"; params.push(scopedWard); }
    if (status) { query += " AND status = ?"; params.push(status); }
    query += " ORDER BY priority_score DESC, reported_at DESC";
    const rows = db.prepare(query).all(...params);
    response.json({ incidents: rows.map(toIncidentRecord) });
  });

  router.post(
    "/incidents",
    authRequired,
    requireRoles("citizen"),
    (request, response) => {
      const payload = parsePayload(incidentSchema, request.body, response);
      if (!payload) return;

      const wardScope = readWardOrNull(request.auth);
      if (wardScope && wardScope !== payload.wardCode) {
        response.status(403).json({ error: "Ward scope violation" });
        return;
      }

      const info = db.prepare(
        `INSERT INTO incidents(title, description, type, severity, status, ward_code, source, priority_score, reported_at, created_by)
         VALUES (?, ?, ?, ?, 'open', ?, ?, ?, ?, ?)`
      ).run(payload.title, payload.description, payload.type, payload.severity, payload.wardCode, payload.source, payload.priorityScore ?? 50, new Date().toISOString(), request.auth.sub);

      insertAuditLog(db, { actorId: request.auth.sub, action: "incident.create", entityType: "incident", entityId: String(info.lastInsertRowid), payload });
      publishEvent("incident.created", { id: info.lastInsertRowid, ...payload });
      response.status(201).json({ id: info.lastInsertRowid });
    }
  );

  router.patch(
    "/incidents/:id/status",
    authRequired,
    requireRoles("city_admin", "zone_officer", "health_advisor"),
    (request, response) => {
      const payload = parsePayload(statusPatchSchema, request.body, response);
      if (!payload) return;

      const incident = db.prepare("SELECT * FROM incidents WHERE id = ?").get(request.params.id);
      if (!incident) { response.status(404).json({ error: "Report not found" }); return; }

      const wardScope = readWardOrNull(request.auth);
      if (wardScope && wardScope !== incident.ward_code) {
        response.status(403).json({ error: "Ward scope violation" });
        return;
      }

      const isResolving = payload.status === "resolved" || payload.status === "closed";
      if (isResolving && incident.assigned_to && incident.assigned_to !== request.auth.sub && request.auth.role !== "city_admin") {
        response.status(403).json({ error: "Only the assigned officer can resolve this report" });
        return;
      }

      const resolvedAt = isResolving ? new Date().toISOString() : null;
      db.prepare("UPDATE incidents SET status = ?, resolved_at = ? WHERE id = ?").run(payload.status, resolvedAt, request.params.id);

      insertAuditLog(db, { actorId: request.auth.sub, action: "incident.status_update", entityType: "incident", entityId: String(request.params.id), payload });
      publishEvent("incident.updated", { id: Number(request.params.id), ...payload });
      response.json({ status: "updated" });
    }
  );

  router.post(
    "/incidents/:id/assign",
    authRequired,
    requireRoles("city_admin", "zone_officer"),
    (request, response) => {
      const payload = parsePayload(assignIncidentSchema, request.body, response);
      if (!payload) return;

      const incident = db.prepare("SELECT * FROM incidents WHERE id = ?").get(request.params.id);
      if (!incident) { response.status(404).json({ error: "Report not found" }); return; }

      const assignee = db.prepare("SELECT * FROM users WHERE id = ?").get(payload.assignedTo);
      if (!assignee) { response.status(404).json({ error: "Assignee not found" }); return; }

      const wardScope = readWardOrNull(request.auth);
      if (wardScope && wardScope !== incident.ward_code) {
        response.status(403).json({ error: "Ward scope violation" });
        return;
      }

      db.prepare("UPDATE incidents SET assigned_to = ?, status = 'assigned' WHERE id = ?").run(payload.assignedTo, request.params.id);
      insertAuditLog(db, { actorId: request.auth.sub, action: "incident.assign", entityType: "incident", entityId: String(request.params.id), payload });
      publishEvent("incident.assigned", { id: Number(request.params.id), assignedTo: payload.assignedTo });
      response.json({ status: "assigned" });
    }
  );

  return router;
};
