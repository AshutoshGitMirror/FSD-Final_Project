import { MetricCard } from "./MetricCard.jsx";
import { RiskBadge } from "./RiskBadge.jsx";

const aqiClass = (val) => {
  if (!val && val !== 0) return "moderate";
  if (val <= 50) return "good";
  if (val <= 100) return "moderate";
  if (val <= 200) return "unhealthy";
  return "hazardous";
};

const aqiLabel = (val) => {
  if (!val && val !== 0) return "N/A";
  if (val <= 50) return "Good";
  if (val <= 100) return "Moderate";
  if (val <= 200) return "Unhealthy";
  return "Hazardous";
};

// Map ward codes to names for the overview
const WARD_NAMES = {
  "A": "Churchgate", "B": "Sandhurst Rd", "C": "Marine Lines", "D": "Malabar Hill",
  "E": "Byculla", "F/S": "Parel", "F/N": "Matunga", "G/S": "Worli",
  "G/N": "Dharavi", "H/E": "Santacruz E", "H/W": "Bandra W", "K/E": "Andheri E",
  "K/W": "Andheri W", "L": "Kurla", "M/E": "Govandi", "M/W": "Chembur",
  "N": "Ghatkopar", "P/S": "Goregaon", "P/N": "Malad", "R/S": "Kandivali",
  "R/C": "Borivali", "R/N": "Dahisar", "S": "Bhandup", "T": "Mulund"
};

export const OverviewPanel = ({ riskOverview, mumbaiLive, loading, onRecompute, onIngestExternal, canIngestExternal }) => {
  const dist = riskOverview?.distribution ?? { good: 0, moderate: 0, unhealthy: 0, hazardous: 0 };
  const topRisks = riskOverview?.topRisks ?? [];
  const aqi = mumbaiLive?.usAqi ?? null;

  return (
    <div>
      {/* AQI Hero */}
      <div className="aqi-hero">
        <div className={`aqi-gauge ${aqiClass(aqi)}`}>
          <span className="aqi-number">{aqi ?? "—"}</span>
          <span className="aqi-label">{aqiLabel(aqi)}</span>
        </div>
        <div className="aqi-details">
          <h3>Mumbai Live Air Quality</h3>
          {mumbaiLive ? (
            <div className="pollutant-grid">
              <div className="pollutant-item"><div className="name">PM2.5</div><div className="val">{mumbaiLive.pm25}</div><div className="unit">µg/m³</div></div>
              <div className="pollutant-item"><div className="name">PM10</div><div className="val">{mumbaiLive.pm10}</div><div className="unit">µg/m³</div></div>
              <div className="pollutant-item"><div className="name">NO₂</div><div className="val">{mumbaiLive.no2}</div><div className="unit">ppb</div></div>
              <div className="pollutant-item"><div className="name">O₃</div><div className="val">{mumbaiLive.o3}</div><div className="unit">ppb</div></div>
              <div className="pollutant-item"><div className="name">Temp</div><div className="val">{mumbaiLive.temperatureC}°</div><div className="unit">Celsius</div></div>
              <div className="pollutant-item"><div className="name">Wind</div><div className="val">{mumbaiLive.windSpeedKmph}</div><div className="unit">km/h</div></div>
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Click "Ingest Live Data" to pull real-time air quality from OpenWeatherMap.</p>
          )}
          <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Source: {mumbaiLive?.source === "openweathermap" ? "OpenWeatherMap Air Pollution API" : "Open-Meteo Air Quality API"} · Mumbai (19.07°N, 72.87°E)
          </p>
        </div>
      </div>

      {/* Ward Distribution */}
      <div className="metric-grid">
        <MetricCard label="Good" value={dist.good} sub="Clean air wards" />
        <MetricCard label="Moderate" value={dist.moderate} sub="Acceptable" />
        <MetricCard label="Unhealthy" value={dist.unhealthy} sub="Sensitive groups at risk" />
        <MetricCard label="Hazardous" value={dist.hazardous} sub="Emergency level" />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.2rem" }}>
        <button className="btn btn-accent" onClick={onRecompute} disabled={loading}>⟳ Recompute AQI</button>
        {canIngestExternal && (
          <button className="btn btn-outline" onClick={onIngestExternal} disabled={loading}>↓ Ingest Live Data</button>
        )}
      </div>

      {/* Top Risk Wards — with names, no top drivers */}
      {topRisks.length > 0 && (
        <div className="panel">
          <div className="panel-header">
            <h2>Ward Air Quality Ranking</h2>
            <span className="sub">{riskOverview?.generatedAt ? new Date(riskOverview.generatedAt).toLocaleString("en-IN") : ""}</span>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Ward</th><th>Area</th><th>AQI Score</th><th>Level</th><th>PM2.5</th><th>PM10</th></tr>
            </thead>
            <tbody>
              {topRisks.map((r) => (
                <tr key={r.wardCode}>
                  <td style={{ color: "var(--text-primary)", fontWeight: 600 }}>{r.wardCode}</td>
                  <td>{WARD_NAMES[r.wardCode] ?? r.wardCode}</td>
                  <td style={{ fontWeight: 700 }}>{r.computedScore}</td>
                  <td><RiskBadge level={r.computedLevel} /></td>
                  <td>{r.pm25?.toFixed(1) ?? "—"}</td>
                  <td>{r.pm10?.toFixed(1) ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
