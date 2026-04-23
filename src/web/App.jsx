import { useCallback, useEffect, useState } from "react";
import { apiClient } from "./apiClient.js";
import { authStore } from "./authStore.js";
import { AdvisoriesPanel } from "./components/AdvisoriesPanel.jsx";
import { AlertFeed } from "./components/AlertFeed.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import { IncidentsPanel } from "./components/IncidentsPanel.jsx";
import { LoginForm } from "./components/LoginForm.jsx";
import { MumbaiMapPanel } from "./components/MumbaiMapPanel.jsx";
import { OverviewPanel } from "./components/OverviewPanel.jsx";
import { PublicFeedPanel } from "./components/PublicFeedPanel.jsx";
import { TopNav } from "./components/TopNav.jsx";
import { usePolling } from "./hooks/usePolling.js";
import { UserManagementPanel } from "./components/UserManagementPanel.jsx";
import { WardAnalyticsPanel } from "./components/WardAnalyticsPanel.jsx";

const defaultData = {
  riskOverview: { distribution: { good: 0, moderate: 0, unhealthy: 0, hazardous: 0 }, topRisks: [] },
  incidents: [],
  advisories: [],
  publicAdvisories: [],
  publicFeedMeta: null,
  wards: [],
  mumbaiLive: null,
  users: []
};

const formatRoleLabel = (role) =>
  String(role ?? "").split("_").filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

export const App = () => {
  const [session, setSession] = useState(() => authStore.read());
  const [authChecked, setAuthChecked] = useState(false);
  const [tab, setTab] = useState("overview");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(defaultData);
  const [events, setEvents] = useState([]);

  const token = session.token;
  const isAdmin = session.user?.role === "city_admin";

  useEffect(() => {
    const verifySession = async () => {
      if (!token) { setAuthChecked(true); return; }
      try {
        const r = await apiClient.me(token);
        const next = { token, user: r.user };
        authStore.write(next);
        setSession(next);
        setError("");
      } catch {
        authStore.clear();
        setSession({ token: null, user: null });
      } finally {
        setAuthChecked(true);
      }
    };
    verifySession();
  }, [token]);

  const loadAll = useCallback(async () => {
    if (!token) return;
    try {
      const safe = (p) => p.catch((e) => { if (e.status === 401) throw e; return null; });
      const [riskRes, incidentsRes, advisoriesRes, publicRes, wardsRes, liveRes, usersRes] = await Promise.all([
        safe(apiClient.riskOverview(token)),
        safe(apiClient.incidents(token)),
        safe(apiClient.advisories(token)),
        apiClient.publicAdvisories().catch(() => ({ advisories: [] })),
        safe(apiClient.wards(token)),
        safe(apiClient.mumbaiLive(token)),
        isAdmin ? safe(apiClient.users(token)) : Promise.resolve(null)
      ]);
      setData((c) => ({
        ...c,
        riskOverview: riskRes ?? defaultData.riskOverview,
        incidents: incidentsRes?.incidents ?? [],
        advisories: advisoriesRes?.advisories ?? [],
        publicAdvisories: publicRes?.advisories ?? [],
        publicFeedMeta: publicRes?.feedMeta ?? null,
        wards: wardsRes?.wards ?? [],
        mumbaiLive: liveRes?.live ?? null,
        users: usersRes?.users ?? []
      }));
      setError("");
    } catch (err) {
      if (err.status === 401) {
        authStore.clear(); setSession({ token: null, user: null }); setData(defaultData); setEvents([]);
      } else { setError(err.message); }
    }
  }, [token, isAdmin]);

  useEffect(() => { if (token && authChecked) loadAll(); }, [token, authChecked, loadAll]);
  usePolling(loadAll, 25000, Boolean(token) && authChecked);

  useEffect(() => {
    if (!token || !authChecked) return undefined;
    const stream = new EventSource(`${apiClient.baseUrl}/alerts/stream?token=${token}`);
    const onEvent = (event) => {
      try { const p = JSON.parse(event.data); setEvents((c) => [p, ...c].slice(0, 50)); }
      catch { setEvents((c) => [{ type: event.type, emittedAt: new Date().toISOString() }, ...c].slice(0, 50)); }
    };
    const types = ["incident.created", "incident.updated", "incident.assigned", "aqi.hazardous", "task.updated", "advisory.created", "input.external.ingested", "user.role_changed", "heartbeat"];
    for (const t of types) stream.addEventListener(t, onEvent);
    stream.onerror = () => setEvents((c) => [{ type: "stream.error", emittedAt: new Date().toISOString() }, ...c].slice(0, 50));
    return () => stream.close();
  }, [token, authChecked]);

  const login = async (creds) => {
    setBusy(true);
    try { const r = await apiClient.login(creds); const s = { token: r.token, user: r.user }; authStore.write(s); setSession(s); setError(""); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  const register = async (payload) => {
    setBusy(true);
    try { const r = await apiClient.register(payload); const s = { token: r.token, user: r.user }; authStore.write(s); setSession(s); setError(""); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  const logout = () => { authStore.clear(); setSession({ token: null, user: null }); setData(defaultData); setEvents([]); setTab("overview"); };

  if (!authChecked) return <main className="app-root auth-view"><p>Checking session...</p></main>;

  const runMutation = async (mutator) => {
    if (!token) return;
    setBusy(true);
    try { await mutator(); await loadAll(); setError(""); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  if (!token) {
    return (
      <main className="app-root auth-view">
        <section className="auth-shell">
          <section className="auth-vision panel">
            <p className="eyebrow">VayuSetu Mumbai</p>
            <h2>Real-time Air Quality Intelligence for Every Ward</h2>
            <p>Live AQI monitoring, health advisories, and citizen pollution reporting — powered by live API data across 24 BMC wards.</p>
            <ul className="feature-list">
              <li>Live PM2.5, PM10, NO₂, O₃ from Open-Meteo API</li>
              <li>Ward-level AQI risk scoring (density + green cover)</li>
              <li>Citizen pollution source reporting</li>
              <li>Admin user management & role assignment</li>
              <li>Real-time SSE event stream</li>
            </ul>
          </section>
          <LoginForm onLogin={login} onRegister={register} loading={busy} error={error} />
        </section>
      </main>
    );
  }

  const canIngest = isAdmin;
  const hazWards = data.riskOverview?.distribution?.hazardous ?? 0;
  const unhWards = data.riskOverview?.distribution?.unhealthy ?? 0;
  const wardCount = data.wards?.length ?? 0;
  const openReports = data.incidents?.filter((i) => i.status !== "resolved" && i.status !== "closed").length ?? 0;
  const liveTime = data.mumbaiLive?.observedAt ? new Date(data.mumbaiLive.observedAt).toLocaleString("en-IN") : "Awaiting ingestion";

  return (
    <main className="app-root">
      <header className="app-header">
        <div>
          <p className="eyebrow">VayuSetu Air Intelligence</p>
          <h1>Mumbai AQI Command Console</h1>
          <p className="header-subtitle">
            <span>{session.user?.name}</span>
            <span className="role-pill">{formatRoleLabel(session.user?.role)}</span>
            {session.user?.wardCode && <span className="role-pill" style={{ background: "rgba(234,179,8,0.15)", color: "#eab308" }}>Ward {session.user.wardCode}</span>}
          </p>
        </div>
        <div className="header-actions">
          <span className="status-chip">Live</span>
          <button type="button" className="ghost-btn" onClick={logout}>Sign out</button>
        </div>
      </header>

      <TopNav activeTab={tab} onChange={setTab} isAdmin={isAdmin} />
      <section className="command-strip">
        <span className="command-chip command-chip-danger">Hazardous: {hazWards}</span>
        <span className="command-chip command-chip-warning">Unhealthy: {unhWards}</span>
        <span className="command-chip">Wards: {wardCount}</span>
        <span className="command-chip" style={{ background: openReports > 0 ? "var(--aqi-unhealthy-bg)" : undefined, color: openReports > 0 ? "var(--aqi-unhealthy)" : undefined }}>
          Open Reports: {openReports}
        </span>
        <span className="command-chip command-chip-muted">Signal: {liveTime}</span>
      </section>

      {error ? <p className="error-banner">{error}</p> : null}

      <section className="workspace-layout">
        <ErrorBoundary>
          <section className="workspace-main">
            {tab === "overview" && (
              <OverviewPanel
                riskOverview={data.riskOverview}
                mumbaiLive={data.mumbaiLive}
                loading={busy}
                onRecompute={() => runMutation(() => apiClient.recomputeRisk(token))}
                onIngestExternal={() => runMutation(() => apiClient.ingestExternalLiveInputs(token))}
                canIngestExternal={canIngest}
              />
            )}
            {tab === "map" && <MumbaiMapPanel wards={data.wards} />}
            {tab === "analytics" && <WardAnalyticsPanel wards={data.wards} />}
            {tab === "reports" && (
              <IncidentsPanel
                incidents={data.incidents}
                userRole={session.user?.role}
                users={data.users}
                onCreate={(p) => runMutation(() => apiClient.createIncident(token, p))}
                onStatusUpdate={(id, status) => runMutation(() => apiClient.patchIncidentStatus(token, id, { status }))}
                onAssign={(id, assignedTo) => runMutation(() => apiClient.assignIncident(token, id, { assignedTo }))}
              />
            )}
            {tab === "advisories" && (
              <AdvisoriesPanel
                advisories={data.advisories}
                onCreate={(p) => runMutation(() => apiClient.createAdvisory(token, p))}
                canCreate={["city_admin", "zone_officer", "health_advisor"].includes(session.user?.role)}
              />
            )}
            {tab === "public" && <PublicFeedPanel advisories={data.publicAdvisories} feedMeta={data.publicFeedMeta} />}
            {tab === "users" && isAdmin && (
              <UserManagementPanel
                users={data.users}
                wards={data.wards}
                onUpdateRole={(id, body) => runMutation(() => apiClient.updateUserRole(token, id, body))}
                onIngestLive={() => runMutation(() => apiClient.ingestExternalLiveInputs(token))}
              />
            )}
          </section>
        </ErrorBoundary>
        <aside className="workspace-side">
          <ErrorBoundary><AlertFeed events={events} /></ErrorBoundary>
        </aside>
      </section>
    </main>
  );
};
