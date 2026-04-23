const eventLabels = {
  "incident.created": "🔴 New Pollution Report",
  "incident.updated": "📝 Report Updated",
  "incident.assigned": "👤 Report Assigned",
  "aqi.hazardous": "⚠️ Hazardous AQI Alert",
  "station.updated": "📡 Station Updated",
  "task.updated": "✅ Task Updated",
  "advisory.created": "📢 Advisory Published",
  "input.external.ingested": "🌐 Live Data Ingested",
  "heartbeat": "💚 System Heartbeat",
  "stream.error": "⚡ Connection Issue"
};

export const AlertFeed = ({ events }) => (
  <div className="alert-feed">
    <h3>Live Events</h3>
    {events.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>Waiting for events...</p>}
    {events.filter((e) => e.type !== "heartbeat").map((event, i) => (
      <div className="alert-item" key={`${event.type}-${event.emittedAt}-${i}`}>
        <div className="alert-type">{eventLabels[event.type] ?? event.type}</div>
        <div className="alert-time">{event.emittedAt ? new Date(event.emittedAt).toLocaleTimeString("en-IN") : ""}</div>
      </div>
    ))}
  </div>
);
