# VayuSetu Mumbai

Ward-level real-time air quality intelligence platform for Mumbai, aligned to CEP WP1-WP7 doctrine.

## What It Does

VayuSetu monitors air quality across Mumbai's 24 BMC wards using live data from OpenWeatherMap. It provides real-time AQI scoring, health advisories, pollution source reporting, and analytics — all through a role-based command console.

## Features

- **Live AQI Dashboard** — PM2.5, PM10, NO₂, O₃, SO₂, CO from OpenWeatherMap
- **Ward-level Risk Scoring** — Composite AQI index factoring pollutants, population density, green cover, vulnerability
- **Role-Based Access** — City Admin, Zone Officer, Health Advisor, Citizen
- **Pollution Reporting** — Citizens report industrial emissions, construction dust, waste burning
- **Health Advisories** — Targeted guidance for vulnerable groups
- **Real-time Alerts** — SSE-driven live event stream
- **Ward Map** — Leaflet map with AQI color-coded ward markers
- **Analytics** — City average, worst/cleanest wards, trend analysis

## Stack

- **API**: Node.js + Express + SQLite + JWT + SSE + Zod
- **Web**: React + Vite + Leaflet
- **External**: OpenWeatherMap Air Pollution API + Open-Meteo
- **Repo model**: npm workspaces (`src/api`, `src/web`)

## Quickstart

```bash
npm install
npm run dev
```

- API: `http://localhost:4000/api/health`
- Web: `http://localhost:5173`

## Seed Credentials

| Role | Email | Password |
|------|-------|----------|
| City Admin | admin@vayusetu.in | Admin@123 |
| Zone Officer | zone.l@vayusetu.in | Zone@123 |
| Health Advisor | health@vayusetu.in | Health@123 |

## Role Hierarchy

```
City Environmental Admin (city-wide oversight)
├── Zone Officers (ward-level monitoring + response)
├── Health Advisors (create health guidance)
└── Citizens (view AQI, report pollution)
```

## CEP Compliance (WP1-WP7)

| WP | Justification |
|----|---------------|
| WP1 | Full-stack with API design, DB modeling, AQI engine, JWT auth |
| WP2 | Balances real-time data freshness vs API rate limits, security vs usability |
| WP3 | Composite AQI scoring with 10 weighted factors, architectural trade-offs |
| WP4 | Real-time SSE, external API integration, ward-level data synthesis |
| WP5 | JWT auth, Zod validation, REST conventions, rate limiting |
| WP6 | 4 stakeholder roles with different permissions and views |
| WP7 | React frontend ↔ Express API ↔ SQLite ↔ External APIs ↔ SSE |

## Quality Commands

```bash
npm run lint
npm run test
npm run build
```
