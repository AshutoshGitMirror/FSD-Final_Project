import { Router } from "express";
import { authRequired, requireRoles } from "../auth.js";
import { insertAuditLog, upsertLiveInput } from "../db.js";
import {
  deriveMumbaiSignalFromWardInputs,
  fetchMumbaiAirQualityNow,
  synthesizeWardLiveInput
} from "../services/externalDataService.js";
import { recomputeAllWardRisks } from "../services/riskService.js";
import { fetchRealMumbaiHospitals } from "../services/realDataService.js";

const resolveLiveSignal = async ({ db, fetchImpl }) => {
  try {
    return { live: await fetchMumbaiAirQualityNow(fetchImpl), degraded: false };
  } catch {
    return { live: deriveMumbaiSignalFromWardInputs(db), degraded: true };
  }
};

export const runLiveIngestion = async ({ db, publishEvent, fetchImpl = fetch, actorId = null }) => {
  const { live, degraded } = await resolveLiveSignal({ db, fetchImpl });
  const wards = db.prepare("SELECT code, vulnerability_index, density_index, tree_cover_pct FROM wards").all();

  const tx = db.transaction(() => {
    for (const ward of wards) {
      const payload = synthesizeWardLiveInput({ ward, mumbaiNow: live });
      upsertLiveInput(db, payload);
    }
  });
  tx();

  const computedCount = recomputeAllWardRisks(db, publishEvent);
  
  if (actorId) {
    insertAuditLog(db, {
      actorId,
      action: "external.live_inputs.ingest",
      entityType: "ward_live_inputs",
      entityId: null,
      payload: { source: live.source, degraded, observedAt: live.observedAt, wardsUpdated: wards.length, computedCount }
    });
  }
  
  publishEvent("input.external.ingested", { source: live.source, degraded, observedAt: live.observedAt, wardsUpdated: wards.length, computedCount });
  return { status: "ingested", source: live.source, degraded, observedAt: live.observedAt, wardsUpdated: wards.length, computedCount };
};

export const createExternalDataRouter = ({ db, publishEvent, fetchImpl }) => {
  const router = Router();

  router.get("/external/hospitals-live", authRequired, async (_request, response) => {
    try {
      const hospitals = await fetchRealMumbaiHospitals(fetchImpl);
      response.json({ hospitals });
    } catch (error) {
      response.status(502).json({ error: `Unable to fetch live hospitals: ${error.message}` });
    }
  });

  router.get(
    "/external/mumbai-live",
    authRequired,
    async (_request, response) => {
      try {
        const { live, degraded } = await resolveLiveSignal({ db, fetchImpl });
        response.json({ live, degraded });
      } catch (error) {
        response.status(502).json({ error: `Unable to fetch live Mumbai signal: ${error.message}` });
      }
    }
  );

  router.post(
    "/external/ingest-live-inputs",
    authRequired,
    requireRoles("city_admin"),
    async (request, response) => {
      try {
        const result = await runLiveIngestion({ db, publishEvent, fetchImpl, actorId: request.auth.sub });
        response.json(result);
      } catch (error) {
        response.status(502).json({ error: `Unable to ingest live external data: ${error.message}` });
      }
    }
  );

  return router;
};
