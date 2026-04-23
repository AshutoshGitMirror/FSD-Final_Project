export const PublicFeedPanel = ({ advisories, feedMeta }) => (
  <div>
    <div className="panel-header">
      <h2>Public Air Quality Feed</h2>
      {feedMeta && <span className="sub">External: {feedMeta.externalCount} · Internal: {feedMeta.internalCount}</span>}
    </div>
    {advisories.length === 0 ? (
      <div className="panel"><p style={{ color: "var(--text-muted)" }}>No public advisories available.</p></div>
    ) : (
      <div className="panel">
        {advisories.map((a, i) => (
          <div key={a.id ?? `ext-${i}`} style={{ padding: "0.8rem 0", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
              <span className={`risk-badge ${a.priority === "critical" ? "hazardous" : a.priority === "high" ? "unhealthy" : "moderate"}`}>{a.priority ?? "info"}</span>
              <strong style={{ fontSize: "0.88rem" }}>{a.title}</strong>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{a.message}</p>
            {a.sourceUrl && <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.72rem", color: "var(--accent)" }}>Source →</a>}
          </div>
        ))}
      </div>
    )}
  </div>
);
