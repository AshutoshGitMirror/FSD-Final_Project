import { Router } from "express";
import { authRequired, requireRoles } from "../auth.js";
import { insertAuditLog, upsertLiveInput } from "../db.js";
import { parsePayload, readWardOrNull } from "../http/helpers.js";
import { liveInputSchema } from "../http/schemas.js";
import { recomputeAllWardRisks, resolveLatestRiskByWard } from "../services/riskService.js";

export const createRiskRouter = ({ db, publishEvent }) => {
  const router = Router();

  router.post(
    "/live-inputs",
    authRequired,
    requireRoles("city_admin", "zone_officer"),
    (request, response) => {
      const payload = parsePayload(liveInputSchema, request.body, response);
      if (!payload) return;

      const scopedWard = readWardOrNull(request.auth);
      if (scopedWard && scopedWard !== payload.wardCode) {
        response.status(403).json({ error: "Zone officers can update only their ward" });
        return;
      }

      const ward = db.prepare("SELECT code FROM wards WHERE code = ?").get(payload.wardCode);
      if (!ward) {
        response.status(404).json({ error: "Ward not found" });
        return;
      }

      upsertLiveInput(db, payload);
      insertAuditLog(db, {
        actorId: request.auth.sub,
        action: "ward_live_inputs.upsert",
        entityType: "ward",
        entityId: payload.wardCode,
        payload
      });
      publishEvent("input.updated", payload);
      response.status(200).json({ status: "updated" });
    }
  );

  router.post(
    "/aqi/recompute",
    authRequired,
    requireRoles("city_admin", "zone_officer", "health_advisor"),
    (request, response) => {
      const computedCount = recomputeAllWardRisks(db, publishEvent);
      insertAuditLog(db, {
        actorId: request.auth.sub,
        action: "aqi.recompute",
        entityType: "risk_snapshot",
        entityId: null,
        payload: { computedCount }
      });
      response.json({ computedCount });
    }
  );

  router.get("/aqi/overview", authRequired, (request, response) => {
    const wardScope = readWardOrNull(request.auth);
    const rows = Array.from(resolveLatestRiskByWard(db).values());
    const filtered = wardScope ? rows.filter((entry) => entry.wardCode === wardScope) : rows;
    const sorted = filtered.sort((a, b) => b.computedScore - a.computedScore);
    const distribution = sorted.reduce(
      (acc, row) => {
        acc[row.computedLevel] += 1;
        return acc;
      },
      { good: 0, moderate: 0, unhealthy: 0, hazardous: 0 }
    );

    response.json({
      generatedAt: new Date().toISOString(),
      topRisks: sorted.slice(0, 8),
      distribution
    });
  });

  // Keep old path for compat
  router.get("/risk/overview", authRequired, (request, response) => {
    const wardScope = readWardOrNull(request.auth);
    const rows = Array.from(resolveLatestRiskByWard(db).values());
    const filtered = wardScope ? rows.filter((entry) => entry.wardCode === wardScope) : rows;
    const sorted = filtered.sort((a, b) => b.computedScore - a.computedScore);
    const distribution = sorted.reduce(
      (acc, row) => {
        acc[row.computedLevel] += 1;
        return acc;
      },
      { good: 0, moderate: 0, unhealthy: 0, hazardous: 0 }
    );
    response.json({ generatedAt: new Date().toISOString(), topRisks: sorted.slice(0, 8), distribution });
  });

  router.post("/risk/recompute", authRequired, requireRoles("city_admin", "zone_officer", "health_advisor"), (request, response) => {
    const computedCount = recomputeAllWardRisks(db, publishEvent);
    response.json({ computedCount });
  });

  return router;
};
