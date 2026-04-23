const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

const parseJson = async (response) => {
  const text = await response.text();
  if (!text) return {};
  return JSON.parse(text);
};

const request = async ({ path, method = "GET", token, body }) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const payload = await parseJson(response);
  if (!response.ok) {
    const message = payload.error ?? "Request failed";
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
};

export const apiClient = {
  baseUrl,
  login: (body) => request({ path: "/auth/login", method: "POST", body }),
  register: (body) => request({ path: "/auth/register", method: "POST", body }),
  me: (token) => request({ path: "/auth/me", token }),
  wards: (token) => request({ path: "/wards", token }),
  mumbaiLive: (token) => request({ path: "/external/mumbai-live", token }),
  hospitalsLive: (token) => request({ path: "/external/hospitals-live", token }),
  ingestExternalLiveInputs: (token) =>
    request({ path: "/external/ingest-live-inputs", method: "POST", token }),
  riskOverview: (token) => request({ path: "/risk/overview", token }),
  recomputeRisk: (token) => request({ path: "/risk/recompute", method: "POST", token }),
  incidents: (token) => request({ path: "/incidents", token }),
  createIncident: (token, body) => request({ path: "/incidents", method: "POST", token, body }),
  patchIncidentStatus: (token, id, body) =>
    request({ path: `/incidents/${id}/status`, method: "PATCH", token, body }),
  assignIncident: (token, id, body) =>
    request({ path: `/incidents/${id}/assign`, method: "POST", token, body }),
  centers: (token) => request({ path: "/cooling-centers", token }),
  patchCenter: (token, id, body) =>
    request({ path: `/cooling-centers/${id}`, method: "PATCH", token, body }),
  tasks: (token) => request({ path: "/tasks", token }),
  createTask: (token, body) => request({ path: "/tasks", method: "POST", token, body }),
  patchTaskStatus: (token, id, body) =>
    request({ path: `/tasks/${id}/status`, method: "PATCH", token, body }),
  advisories: (token) => request({ path: "/advisories", token }),
  publicAdvisories: () => request({ path: "/advisories/public" }),
  createAdvisory: (token, body) => request({ path: "/advisories", method: "POST", token, body }),
  commandSnapshot: (token) => request({ path: "/command/snapshot", token }),
  // User management
  users: (token) => request({ path: "/users", token }),
  updateUserRole: (token, id, body) => request({ path: `/users/${id}/role`, method: "PATCH", token, body })
};
