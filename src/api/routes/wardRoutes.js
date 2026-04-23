import { Router } from "express";
import { authRequired } from "../auth.js";
import { readWardOrNull, safeWardScope } from "../http/helpers.js";
import { WARD_GEO_INDEX } from "../wardGeoCatalog.js";
import { resolveLatestRiskByWard } from "../services/riskService.js";

export const createWardRouter = ({ db }) => {
  const router = Router();

  router.get("/wards", authRequired, (request, response) => {
    const requestWardCode =
      typeof request.query.wardCode === "string" ? request.query.wardCode : null;
    const wardFilter = safeWardScope(request.auth, requestWardCode);
    const latestByWard = resolveLatestRiskByWard(db);

    const rows = wardFilter
      ? db.prepare("SELECT * FROM wards WHERE code = ?").all(wardFilter)
      : db.prepare("SELECT * FROM wards ORDER BY code").all();

    const wards = rows.map((ward) => ({
      code: ward.code,
      name: ward.name,
      population: ward.population,
      vulnerabilityIndex: ward.vulnerability_index,
      densityIndex: ward.density_index,
      treeCoverPct: ward.tree_cover_pct,
      geo: WARD_GEO_INDEX[ward.code] ?? null,
      latestRisk: latestByWard.get(ward.code) ?? null
    }));

    response.json({ wards, scopedWard: readWardOrNull(request.auth) });
  });

  return router;
};
