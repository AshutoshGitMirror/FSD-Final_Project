export const fetchRealMumbaiHospitals = async (fetchImpl = fetch) => {
  const query = `
    [out:json][timeout:25];
    node["amenity"="hospital"](18.89,72.77,19.27,72.98);
    out body;
  `;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetchImpl(url, { signal: controller.signal });
    if (!response.ok) return [];
    const data = await response.json();
    return (data.elements ?? []).map((el) => ({
      name: el.tags.name || "Unnamed Hospital",
      lat: el.lat,
      lon: el.lon,
      id: el.id
    }));
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
};
