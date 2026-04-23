import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const aqiColor = (level) => {
  if (level === "hazardous") return "#dc2626";
  if (level === "unhealthy") return "#ea580c";
  if (level === "moderate") return "#ca8a04";
  return "#16a34a";
};

const aqiRadius = (score) => {
  if (!score) return 10;
  if (score >= 75) return 18;
  if (score >= 55) return 15;
  if (score >= 35) return 12;
  return 10;
};

export const MumbaiMapPanel = ({ wards }) => {
  const wardsWithGeo = (wards ?? []).filter((w) => w.geo?.lat && w.geo?.lng);

  if (wardsWithGeo.length === 0) {
    return (
      <div>
        <div className="panel-header"><h2>Mumbai AQI Map</h2></div>
        <div className="map-empty">No geospatial data available. Click "Ingest Live Data" on the Overview tab first.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="panel-header">
        <h2>Mumbai AQI Map</h2>
        <span className="sub">{wardsWithGeo.length} wards</span>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        {[
          { color: "#16a34a", label: "Good (0-35)" },
          { color: "#ca8a04", label: "Moderate (35-55)" },
          { color: "#ea580c", label: "Unhealthy (55-75)" },
          { color: "#dc2626", label: "Hazardous (75+)" }
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: l.color, display: "inline-block" }} />
            {l.label}
          </div>
        ))}
      </div>

      <div className="map-container">
        <MapContainer center={[19.076, 72.8777]} zoom={11} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OSM</a>'
          />
          {wardsWithGeo.map((w) => {
            const level = w.latestRisk?.computedLevel ?? "good";
            const color = aqiColor(level);
            const radius = aqiRadius(w.latestRisk?.computedScore);
            return (
              <CircleMarker
                key={w.code}
                center={[w.geo.lat, w.geo.lng]}
                radius={radius}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.6, weight: 2 }}
              >
                <Popup>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.5 }}>
                    <strong style={{ fontSize: "14px" }}>{w.name}</strong> <span style={{ color: "#888" }}>({w.code})</span><br />
                    AQI Score: <strong>{w.latestRisk?.computedScore ?? "—"}</strong><br />
                    Level: <strong style={{ color }}>{level}</strong><br />
                    PM2.5: {w.latestRisk?.pm25?.toFixed(1) ?? "—"} µg/m³<br />
                    PM10: {w.latestRisk?.pm10?.toFixed(1) ?? "—"} µg/m³<br />
                    Green Cover: {w.treeCoverPct?.toFixed(1)}%
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};
