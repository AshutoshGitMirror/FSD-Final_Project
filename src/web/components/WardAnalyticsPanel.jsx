import { RiskBadge } from "./RiskBadge.jsx";

const WARD_NAMES = {
  "A": "Churchgate", "B": "Sandhurst Rd", "C": "Marine Lines", "D": "Malabar Hill",
  "E": "Byculla", "F/S": "Parel", "F/N": "Matunga", "G/S": "Worli",
  "G/N": "Dharavi", "H/E": "Santacruz E", "H/W": "Bandra W", "K/E": "Andheri E",
  "K/W": "Andheri W", "L": "Kurla", "M/E": "Govandi", "M/W": "Chembur",
  "N": "Ghatkopar", "P/S": "Goregaon", "P/N": "Malad", "R/S": "Kandivali",
  "R/C": "Borivali", "R/N": "Dahisar", "S": "Bhandup", "T": "Mulund"
};

export const WardAnalyticsPanel = ({ wards }) => {
  if (!wards || wards.length === 0) {
    return <div className="panel"><p style={{ color: "var(--text-muted)" }}>No ward data available. Click "Ingest Live Data" on the AQI Dashboard first.</p></div>;
  }

  const withRisk = wards.filter((w) => w.latestRisk);
  const avgScore = withRisk.length > 0 ? (withRisk.reduce((s, w) => s + w.latestRisk.computedScore, 0) / withRisk.length).toFixed(1) : "—";
  const worstWard = withRisk.length > 0 ? withRisk.reduce((a, b) => (a.latestRisk.computedScore > b.latestRisk.computedScore ? a : b)) : null;
  const bestWard = withRisk.length > 0 ? withRisk.reduce((a, b) => (a.latestRisk.computedScore < b.latestRisk.computedScore ? a : b)) : null;
  const hazCount = withRisk.filter((w) => w.latestRisk.computedLevel === "hazardous").length;

  return (
    <div>
      <div className="panel-header">
        <h2>Ward Air Quality Analytics</h2>
        <span className="sub">{wards.length} wards · {withRisk.length} with AQI data</span>
      </div>

      <div className="analytics-grid" style={{ marginBottom: "1.2rem" }}>
        <div className="insight-card">
          <h4>City Average AQI Score</h4>
          <div className="insight-value">{avgScore}</div>
          <div className="insight-sub">Across {withRisk.length} monitored wards</div>
        </div>
        <div className="insight-card">
          <h4>Hazardous Zones</h4>
          <div className="insight-value" style={{ color: "var(--aqi-hazardous)" }}>{hazCount}</div>
          <div className="insight-sub">Wards exceeding safe limits</div>
        </div>
        <div className="insight-card">
          <h4>Worst Air Quality</h4>
          <div className="insight-value">{worstWard ? `${worstWard.name} (${worstWard.code})` : "—"}</div>
          <div className="insight-sub">Score: {worstWard?.latestRisk?.computedScore ?? "—"}</div>
        </div>
        <div className="insight-card">
          <h4>Cleanest Air</h4>
          <div className="insight-value" style={{ color: "var(--aqi-good)" }}>{bestWard ? `${bestWard.name} (${bestWard.code})` : "—"}</div>
          <div className="insight-sub">Score: {bestWard?.latestRisk?.computedScore ?? "—"}</div>
        </div>
      </div>

      <div className="panel">
        <table className="data-table">
          <thead><tr><th>Ward</th><th>Area Name</th><th>AQI Score</th><th>Level</th><th>PM2.5</th><th>PM10</th><th>Density</th><th>Green Cover</th></tr></thead>
          <tbody>
            {withRisk.sort((a, b) => b.latestRisk.computedScore - a.latestRisk.computedScore).map((w) => (
              <tr key={w.code}>
                <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{w.code}</td>
                <td>{WARD_NAMES[w.code] ?? w.name}</td>
                <td style={{ fontWeight: 700 }}>{w.latestRisk.computedScore}</td>
                <td><RiskBadge level={w.latestRisk.computedLevel} /></td>
                <td>{w.latestRisk.pm25?.toFixed(1) ?? "—"}</td>
                <td>{w.latestRisk.pm10?.toFixed(1) ?? "—"}</td>
                <td>{(w.densityIndex * 100).toFixed(0)}%</td>
                <td>{w.treeCoverPct?.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
