/**
 * AQI Risk Engine — Computes ward-level air quality risk index
 * from pollutant concentrations, environmental factors, and urban metrics.
 *
 * Uses EPA AQI breakpoints adapted for multi-factor ward-level scoring.
 */

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const norm = (value, min, max) => {
  if (max <= min) {
    return 0;
  }

  return clamp((value - min) / (max - min), 0, 1);
};

/**
 * Maps composite AQI score to EPA-style category label.
 */
const levelFromScore = (score) => {
  if (score >= 75) {
    return "hazardous";
  }
  if (score >= 55) {
    return "unhealthy";
  }
  if (score >= 35) {
    return "moderate";
  }
  return "good";
};

/**
 * Computes a composite AQI risk score (0-100) for a ward.
 *
 * @param {Object} inputs
 * @param {number} inputs.pm25 - PM2.5 concentration (µg/m³)
 * @param {number} inputs.pm10 - PM10 concentration (µg/m³)
 * @param {number} inputs.no2 - NO2 concentration (ppb)
 * @param {number} inputs.o3 - O3 concentration (ppb)
 * @param {number} inputs.so2 - SO2 concentration (ppb)
 * @param {number} inputs.co - CO concentration (mg/m³)
 * @param {number} inputs.vulnerabilityIndex - Ward health vulnerability (0-1)
 * @param {number} inputs.densityIndex - Ward population density (0-1)
 * @param {number} inputs.greenCoverPct - Ward green cover percentage
 * @param {number} inputs.openReportCount - Open pollution reports in ward
 */
export const computeWardRisk = ({
  pm25,
  pm10,
  no2,
  o3,
  so2,
  co,
  vulnerabilityIndex,
  densityIndex,
  greenCoverPct,
  openReportCount
}) => {
  const pm25Component = norm(pm25, 0, 250) * 28;
  const pm10Component = norm(pm10, 0, 430) * 16;
  const no2Component = norm(no2, 0, 200) * 10;
  const o3Component = norm(o3, 0, 200) * 8;
  const so2Component = norm(so2, 0, 185) * 6;
  const coComponent = norm(co, 0, 35) * 5;
  const vulnerabilityComponent = clamp(vulnerabilityIndex, 0, 1) * 12;
  const densityComponent = clamp(densityIndex, 0, 1) * 7;
  const greenPenalty = norm(20 - greenCoverPct, 0, 20) * 4;
  const reportComponent = norm(openReportCount, 0, 18) * 4;

  const score = Number(
    (
      pm25Component +
      pm10Component +
      no2Component +
      o3Component +
      so2Component +
      coComponent +
      vulnerabilityComponent +
      densityComponent +
      greenPenalty +
      reportComponent
    ).toFixed(2)
  );

  const level = levelFromScore(score);
  const topDrivers = [
    { metric: "pm25", impact: pm25Component },
    { metric: "pm10", impact: pm10Component },
    { metric: "no2", impact: no2Component },
    { metric: "o3", impact: o3Component },
    { metric: "so2", impact: so2Component },
    { metric: "co", impact: coComponent },
    { metric: "vulnerabilityIndex", impact: vulnerabilityComponent },
    { metric: "densityIndex", impact: densityComponent },
    { metric: "lowGreenCover", impact: greenPenalty },
    { metric: "openReports", impact: reportComponent }
  ]
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 3)
    .map((entry) => entry.metric);

  return { score, level, topDrivers };
};
