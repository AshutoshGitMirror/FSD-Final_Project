import { useState } from "react";

export const AdvisoriesPanel = ({ advisories, onCreate, canCreate = true }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", priority: "moderate", wardCode: "" });

  const handleCreate = (e) => {
    e.preventDefault();
    onCreate({ ...form, wardCode: form.wardCode || null });
    setForm({ title: "", message: "", priority: "moderate", wardCode: "" });
    setShowForm(false);
  };

  return (
    <div>
      <div className="panel-header">
        <h2>Health Advisories</h2>
        {canCreate && (
          <button className="btn btn-accent btn-sm" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Create Advisory"}
          </button>
        )}
      </div>

      {showForm && (
        <form className="panel" style={{ marginBottom: "1rem" }} onSubmit={handleCreate}>
          <div className="form-row">
            <input className="form-input" placeholder="Advisory title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required minLength={3} />
            <input className="form-input" placeholder="Ward code (optional, blank = citywide)" value={form.wardCode} onChange={(e) => setForm({ ...form, wardCode: e.target.value })} />
          </div>
          <div className="form-row full">
            <textarea className="form-textarea" placeholder="Health advisory message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required minLength={10} />
          </div>
          <div className="form-row">
            <select className="form-select" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <button type="submit" className="btn btn-accent">Publish Advisory</button>
        </form>
      )}

      {advisories.length === 0 ? (
        <div className="panel"><p style={{ color: "var(--text-muted)" }}>No advisories issued.</p></div>
      ) : (
        <div className="panel">
          {advisories.map((a) => (
            <div key={a.id} style={{ padding: "0.8rem 0", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                <span className={`risk-badge ${a.priority === "critical" ? "hazardous" : a.priority === "high" ? "unhealthy" : a.priority === "moderate" ? "moderate" : "good"}`}>{a.priority}</span>
                <strong style={{ fontSize: "0.88rem" }}>{a.title}</strong>
                {a.wardCode && <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Ward {a.wardCode}</span>}
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{a.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
