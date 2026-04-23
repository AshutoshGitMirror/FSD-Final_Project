import { useState } from "react";

const ROLE_LABELS = {
  city_admin: "City Admin",
  zone_officer: "Zone Officer",
  health_advisor: "Health Advisor",
  citizen: "Citizen"
};

const ROLE_COLORS = {
  city_admin: "hazardous",
  zone_officer: "unhealthy",
  health_advisor: "moderate",
  citizen: "good"
};

export const UserManagementPanel = ({ users, wards, onUpdateRole, onIngestLive }) => {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ role: "", wardCode: "" });
  const [isIngesting, setIsIngesting] = useState(false);

  const startEdit = (user) => {
    setEditing(user.id);
    setForm({ role: user.role, wardCode: user.wardCode ?? "" });
  };

  const save = (userId) => {
    onUpdateRole(userId, { role: form.role, wardCode: form.role === "zone_officer" ? (form.wardCode || null) : null });
    setEditing(null);
  };

  const handleIngest = async () => {
    setIsIngesting(true);
    try {
      await onIngestLive();
    } finally {
      setIsIngesting(false);
    }
  };

  return (
    <div>
      <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>User Management & Data Sync</h2>
          <span className="sub">{users.length} registered users</span>
        </div>
        <button 
          className="btn btn-accent" 
          onClick={handleIngest} 
          disabled={isIngesting}
        >
          {isIngesting ? "Fetching..." : "Fetch Live External AQI Data"}
        </button>
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Ward</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {editing === u.id ? (
                    <select className="form-select" style={{ width: "auto", padding: "0.3rem 0.5rem", fontSize: "0.75rem" }}
                      value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                      <option value="citizen">Citizen</option>
                      <option value="zone_officer">Zone Officer</option>
                      <option value="health_advisor">Health Advisor</option>
                      <option value="city_admin">City Admin</option>
                    </select>
                  ) : (
                    <span className={`risk-badge ${ROLE_COLORS[u.role] ?? "good"}`}>{ROLE_LABELS[u.role] ?? u.role}</span>
                  )}
                </td>
                <td>
                  {editing === u.id ? (
                    form.role === "zone_officer" ? (
                      <select className="form-select" style={{ width: "auto", padding: "0.3rem 0.5rem", fontSize: "0.75rem" }}
                        value={form.wardCode} onChange={(e) => setForm({ ...form, wardCode: e.target.value })}>
                        <option value="">— No ward —</option>
                        {(wards ?? []).map((w) => (
                          <option key={w.code} value={w.code}>{w.code} — {w.name}</option>
                        ))}
                      </select>
                    ) : (
                      <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>—</span>
                    )
                  ) : (
                    u.wardCode ?? "—"
                  )}
                </td>
                <td>
                  {editing === u.id ? (
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      <button className="btn btn-accent btn-sm" onClick={() => save(u.id)}>Save</button>
                      <button className="btn btn-outline btn-sm" onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                  ) : (
                    <button className="btn btn-outline btn-sm" onClick={() => startEdit(u)}>Edit Role</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
