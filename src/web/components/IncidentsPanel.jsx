import { useState } from "react";
import { RiskBadge } from "./RiskBadge.jsx";

const REPORT_TYPES = [
  { value: "industrial_emission", label: "Industrial Emission" },
  { value: "construction_dust", label: "Construction Dust" },
  { value: "vehicle_emission", label: "Vehicle Emission" },
  { value: "waste_burning", label: "Waste Burning" },
  { value: "other", label: "Other" }
];

export const IncidentsPanel = ({ incidents, userRole, users, onCreate, onStatusUpdate, onAssign }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", type: "waste_burning", severity: "moderate", wardCode: "", source: "citizen_report" });

  const canCreate = userRole === "citizen";
  const canManage = ["city_admin", "zone_officer", "health_advisor"].includes(userRole);
  const canAssign = ["city_admin", "zone_officer"].includes(userRole);

  const handleCreate = (e) => {
    e.preventDefault();
    onCreate(form);
    setForm({ title: "", description: "", type: "waste_burning", severity: "moderate", wardCode: "", source: "citizen_report" });
    setShowForm(false);
  };

  const officers = (users ?? []).filter((u) => u.role === "zone_officer" || u.role === "city_admin");

  return (
    <div>
      <div className="panel-header">
        <h2>Pollution Reports</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="sub">{incidents.length} reports</span>
          {canCreate && (
            <button className="btn btn-accent btn-sm" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "+ Report Pollution"}
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <form className="panel" style={{ marginBottom: "1rem" }} onSubmit={handleCreate}>
          <div className="form-row">
            <input className="form-input" placeholder="What are you reporting? (e.g. Smoke from factory)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required minLength={6} />
            <input className="form-input" placeholder="Ward code (e.g. G/N, L, K/E)" value={form.wardCode} onChange={(e) => setForm({ ...form, wardCode: e.target.value })} required />
          </div>
          <div className="form-row full">
            <textarea className="form-textarea" placeholder="Describe the pollution source — location, duration, impact..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required minLength={12} />
          </div>
          <div className="form-row">
            <select className="form-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {REPORT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <select className="form-select" value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })}>
              <option value="low">Low — Minor nuisance</option>
              <option value="moderate">Moderate — Visible pollution</option>
              <option value="high">High — Health risk</option>
              <option value="hazardous">Hazardous — Emergency</option>
            </select>
          </div>
          <button type="submit" className="btn btn-accent">Submit Report</button>
        </form>
      )}

      {incidents.length === 0 ? (
        <div className="panel"><p style={{ color: "var(--text-muted)" }}>No pollution reports yet. Citizens can report pollution sources using the button above.</p></div>
      ) : (
        <div className="panel">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Type</th>
                <th>Ward</th>
                <th>Severity</th>
                <th>Status</th>
                {canManage && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => (
                <tr key={inc.id}>
                  <td style={{ color: "var(--text-primary)", fontWeight: 500, maxWidth: 200 }}>{inc.title}</td>
                  <td style={{ fontSize: "0.75rem" }}>{REPORT_TYPES.find((t) => t.value === inc.type)?.label ?? inc.type}</td>
                  <td style={{ fontWeight: 600 }}>{inc.wardCode}</td>
                  <td><RiskBadge level={inc.severity} /></td>
                  <td><span className={`risk-badge ${inc.status === "resolved" || inc.status === "closed" ? "good" : inc.status === "investigating" || inc.status === "assigned" ? "moderate" : "unhealthy"}`}>{inc.status}</span></td>
                  {canManage && (
                    <td>
                      <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                        {inc.status === "open" && (
                          <button className="btn btn-outline btn-sm" onClick={() => onStatusUpdate(inc.id, "investigating")}>Investigate</button>
                        )}
                        {inc.status === "investigating" && canAssign && officers.length > 0 && (
                          <select className="form-select" style={{ width: "auto", padding: "0.2rem 0.4rem", fontSize: "0.7rem" }}
                            onChange={(e) => { if (e.target.value) onAssign(inc.id, Number(e.target.value)); }}
                            defaultValue="">
                            <option value="" disabled>Assign to...</option>
                            {officers.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
                          </select>
                        )}
                        {(inc.status === "investigating" || inc.status === "assigned") && (
                          <button className="btn btn-accent btn-sm" onClick={() => onStatusUpdate(inc.id, "resolved")}>Resolve</button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
