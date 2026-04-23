import { getOpenIncidentCountByWard, insertRiskSnapshot } from "../db.js";
import { computeWardRisk } from "../riskEngine.js";

export const resolveLatestRiskByWard = (db) => {
  const rows = db
    .prepare(
      `SELECT rs.*
       FROM risk_snapshots rs
       INNER JOIN (
         SELECT ward_code, MAX(id) AS latest_id
         FROM risk_snapshots
         GROUP BY ward_code
       ) latest ON latest.latest_id = rs.id`
    )
    .all();

  const map = new Map();
  for (const row of rows) {
    map.set(row.ward_code, {
      wardCode: row.ward_code,
      pm25: row.pm25,
      pm10: row.pm10,
      no2: row.no2,
      o3: row.o3,
      so2: row.so2,
      co: row.co,
      openReportCount: row.open_report_count,
      computedScore: row.computed_score,
      computedLevel: row.computed_level,
      topDrivers: JSON.parse(row.top_drivers_json),
      createdAt: row.created_at
    });
  }
  return map;
};

export const recomputeAllWardRisks = (db, publishEvent) => {
  const wards = db
    .prepare(
      `SELECT w.code, w.name, w.vulnerability_index, w.density_index, w.tree_cover_pct,
              i.pm25, i.pm10, i.no2, i.o3, i.so2, i.co
       FROM wards w
       INNER JOIN ward_live_inputs i ON i.ward_code = w.code`
    )
    .all();

  const severeAlerts = [];
  for (const ward of wards) {
    const openReports = getOpenIncidentCountByWard(db, ward.code);
    const computed = computeWardRisk({
      pm25: ward.pm25,
      pm10: ward.pm10,
      no2: ward.no2,
      o3: ward.o3,
      so2: ward.so2,
      co: ward.co,
      vulnerabilityIndex: ward.vulnerability_index,
      densityIndex: ward.density_index,
      greenCoverPct: ward.tree_cover_pct,
      openReportCount: openReports
    });

    insertRiskSnapshot(db, {
      wardCode: ward.code,
      pm25: ward.pm25,
      pm10: ward.pm10,
      no2: ward.no2,
      o3: ward.o3,
      so2: ward.so2,
      co: ward.co,
      openReportCount: openReports,
      computedScore: computed.score,
      computedLevel: computed.level,
      topDrivers: computed.topDrivers
    });

    if (computed.level === "hazardous") {
      severeAlerts.push({
        wardCode: ward.code,
        wardName: ward.name,
        computedScore: computed.score,
        topDrivers: computed.topDrivers
      });
    }
  }

  if (severeAlerts.length > 0) {
    publishEvent("aqi.hazardous", { alerts: severeAlerts });
  }

  return wards.length;
};
