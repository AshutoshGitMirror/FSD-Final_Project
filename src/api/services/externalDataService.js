/**
 * External Data Service — Fetches live air quality and weather data
 * from OpenWeatherMap APIs for Mumbai.
 */

import { MUMBAI_CENTER } from "../wardGeoCatalog.js";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const asNumber = (value, fallback) => (Number.isFinite(value) ? value : fallback);

const OWM_API_KEY = process.env.OWM_API_KEY || "";

const buildWeatherUrl = ({ lat, lng }) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&timezone=Asia/Kolkata`;

const buildAirPollutionUrl = ({ lat, lng }) => {
  if (OWM_API_KEY) {
    return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${OWM_API_KEY}`;
  }
  return `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=pm10,pm2_5,nitrogen_dioxide,ozone,sulphur_dioxide,carbon_monoxide,us_aqi&timezone=Asia/Kolkata`;
};

const readJson = async (response) => {
  if (!response.ok) {
    throw new Error(`External API request failed (${response.status})`);
  }
  return response.json();
};

const fetchJsonWithRetry = async (fetchImpl, url, retries = 2) => {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchImpl(url);
      return await readJson(response);
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
      }
    }
  }
  throw lastError;
};

/**
 * Parse OpenWeatherMap air pollution response into standardized format.
 */
const parseOwmAirPollution = (data) => {
  const components = data?.list?.[0]?.components ?? {};
  return {
    pm25: asNumber(components.pm2_5, 40),
    pm10: asNumber(components.pm10, 70),
    no2: asNumber(components.no2, 25),
    o3: asNumber(components.o3, 45),
    so2: asNumber(components.so2, 10),
    co: asNumber(components.co, 500) / 1000,
    usAqi: data?.list?.[0]?.main?.aqi ? data.list[0].main.aqi * 50 : 110
  };
};

/**
 * Parse Open-Meteo air quality response.
 */
const parseOpenMeteoAqi = (data) => {
  const current = data?.current ?? {};
  return {
    pm25: asNumber(current.pm2_5, 40),
    pm10: asNumber(current.pm10, 70),
    no2: asNumber(current.nitrogen_dioxide, 25),
    o3: asNumber(current.ozone, 45),
    so2: asNumber(current.sulphur_dioxide, 10),
    co: asNumber(current.carbon_monoxide, 500) / 1000,
    usAqi: asNumber(current.us_aqi, 110)
  };
};

export const fetchMumbaiAirQualityNow = async (fetchImpl = fetch) => {
  const [weather, aqiRaw] = await Promise.all([
    fetchJsonWithRetry(fetchImpl, buildWeatherUrl(MUMBAI_CENTER)),
    fetchJsonWithRetry(fetchImpl, buildAirPollutionUrl(MUMBAI_CENTER))
  ]);

  const current = weather.current ?? {};
  const temperatureC = asNumber(current.temperature_2m, 32);
  const humidityPct = asNumber(current.relative_humidity_2m, 58);
  const windSpeed = asNumber(current.wind_speed_10m, 7.8);
  const precipitation = asNumber(current.precipitation, 0);

  const aqi = OWM_API_KEY ? parseOwmAirPollution(aqiRaw) : parseOpenMeteoAqi(aqiRaw);

  return {
    source: OWM_API_KEY ? "openweathermap" : "open-meteo",
    observedAt: current.time ?? new Date().toISOString(),
    latitude: weather.latitude ?? MUMBAI_CENTER.lat,
    longitude: weather.longitude ?? MUMBAI_CENTER.lng,
    temperatureC,
    humidityPct,
    windSpeedKmph: windSpeed,
    precipitationMm: precipitation,
    pm25: aqi.pm25,
    pm10: aqi.pm10,
    no2: aqi.no2,
    o3: aqi.o3,
    so2: aqi.so2,
    co: aqi.co,
    usAqi: aqi.usAqi
  };
};

/**
 * Synthesizes ward-level AQI inputs from city-wide data + ward characteristics.
 * Urban density and low green cover amplify pollutant concentrations.
 */
export const synthesizeWardLiveInput = ({ ward, mumbaiNow }) => {
  const densityFactor = 1 + ward.density_index * 0.3;
  const greenFactor = 1 - (ward.tree_cover_pct / 100) * 0.15;

  const localPm25 = Number(clamp(mumbaiNow.pm25 * densityFactor * greenFactor + ward.vulnerability_index * 8, 0, 500).toFixed(1));
  const localPm10 = Number(clamp(mumbaiNow.pm10 * densityFactor * greenFactor + ward.vulnerability_index * 12, 0, 600).toFixed(1));
  const localNo2 = Number(clamp(mumbaiNow.no2 * densityFactor + ward.density_index * 6, 0, 400).toFixed(1));
  const localO3 = Number(clamp(mumbaiNow.o3 * greenFactor, 0, 400).toFixed(1));
  const localSo2 = Number(clamp(mumbaiNow.so2 * densityFactor, 0, 300).toFixed(1));
  const localCo = Number(clamp(mumbaiNow.co * densityFactor, 0, 50).toFixed(2));

  return {
    wardCode: ward.code,
    pm25: localPm25,
    pm10: localPm10,
    no2: localNo2,
    o3: localO3,
    so2: localSo2,
    co: localCo
  };
};

/**
 * Derives a city-wide signal from local ward inputs when external APIs are down.
 */
export const deriveMumbaiSignalFromWardInputs = (db) => {
  const columns = db.prepare("PRAGMA table_info(ward_live_inputs)").all();
  const hasUpdatedAt = columns.some((column) => column.name === "updated_at");

  const row = db
    .prepare(
      `SELECT
         AVG(pm25) AS pm25,
         AVG(pm10) AS pm10,
         AVG(no2) AS no2,
         AVG(o3) AS o3,
         AVG(so2) AS so2,
         AVG(co) AS co,
         ${hasUpdatedAt ? "MAX(updated_at)" : "NULL"} AS updated_at
       FROM ward_live_inputs`
    )
    .get();

  if (!row || row.pm25 == null) {
    throw new Error("No local live inputs available");
  }

  return {
    source: "local-cache",
    observedAt: row.updated_at ?? new Date().toISOString(),
    latitude: MUMBAI_CENTER.lat,
    longitude: MUMBAI_CENTER.lng,
    temperatureC: 32,
    humidityPct: 65,
    windSpeedKmph: 8,
    precipitationMm: 0,
    pm25: Number(row.pm25.toFixed(1)),
    pm10: Number(row.pm10.toFixed(1)),
    no2: Number(row.no2.toFixed(1)),
    o3: Number(row.o3.toFixed(1)),
    so2: Number(row.so2.toFixed(1)),
    co: Number(row.co.toFixed(2)),
    usAqi: Number((row.pm25 * 2.1).toFixed(0))
  };
};

// Re-export for backward compatibility with weather route
export const fetchMumbaiWeatherNow = fetchMumbaiAirQualityNow;
