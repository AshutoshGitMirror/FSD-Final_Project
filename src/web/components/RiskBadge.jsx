export const RiskBadge = ({ level }) => {
  const cls = level === "hazardous" ? "hazardous" : level === "unhealthy" ? "unhealthy" : level === "moderate" ? "moderate" : "good";
  return <span className={`risk-badge ${cls}`}>{level ?? "—"}</span>;
};
