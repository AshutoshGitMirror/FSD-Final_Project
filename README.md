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

## Complex Engineering Problem (CEP) Justification

This project strictly adheres to the CEP guidelines outlined in the evaluation rubric.

### WP2: Conflicting Requirements
The architecture explicitly addresses three major engineering conflicts:
1. **Real-time Data vs. API Rate Limits:** The UI requires real-time pollution updates, but external APIs (Open-Meteo) strictly rate-limit free tiers. *Solution:* We built a centralized, asynchronous ingestion engine (`riskEngine.js`). The backend fetches the API once, stores the result in SQLite, and serves thousands of clients from the database cache, updating the UI via Server-Sent Events (SSE) without hitting the external API again.
2. **Scalability vs. Infrastructure Cost:** A complex multi-node architecture is expensive and overkill for a capstone, but a monolithic stateful server is unscalable. *Solution:* We engineered a **stateless backend** using JWT authentication. The Node.js server holds no session memory, allowing it to be horizontally scaled on free ephemeral containers (like Render), while SQLite maintains ACID compliance for the relational data.
3. **Data Accuracy vs. Hardware Constraints:** The city lacks physical CAAQMS sensors in every ward, but our problem statement demands ward-level granularity. *Solution:* We substitute missing hardware with algorithmic synthesis, mathematically deriving ward-level scores from city-level baselines.

### WP3: Depth of Analysis
The problem of "localized air quality monitoring" does not have a straightforward CRUD solution. We had to make deep architectural and analytical decisions:
1. **Mathematical Synthesis over Mock Data:** Instead of faking localized data, we engineered a deterministic algorithm. We analyze the baseline city pollutants (PM2.5, NO₂) and mathematically modify them using real-world ward characteristics: `(CityAQI * DensityIndex) - (TreeCoverPct * MitigationFactor)`. This provides scientifically grounded, hyper-local risk scores.
2. **SSE over WebSockets:** We analyzed transport protocols for real-time updates. Since our data flow is strictly unidirectional (Server → Client alerts), we rejected WebSockets as unnecessary overhead and implemented HTTP Server-Sent Events (SSE) backed by an internal Node `EventEmitter` (`eventBus.js`), reducing TCP connection overhead.
3. **Relational Data Modeling:** Analyzing the requirements of a 4-tier RBAC system with geographic incident reporting led us to design a 3NF normalized schema linking `users`, `incidents`, and `wards` via foreign keys, ensuring data integrity when a `citizen` reports pollution and a `zone_officer` resolves it.

### Full WP1-WP7 Matrix
| Criteria | How VayuSetu Meets It |
|----------|-----------------------|
| **WP1: Depth of Knowledge** | Custom cryptographic auth (bcrypt + JWT), PubSub event bus, and deterministic risk algorithm. |
| **WP2: Conflicting Requirements** | Reconciled real-time dashboard data with strict external API rate limits (see above). |
| **WP3: Depth of Analysis** | Engineered a mathematical model to accurately synthesize ward-level data from broad city-wide data (see above). |
| **WP4: Familiarity of Issues** | Solved real-time UI synchronization by dropping traditional polling in favor of persistent Server-Sent Events (SSE). |
| **WP5: Applicable Codes** | Enforced strict REST API conventions, Zod input validation (`schemas.js`), and Bcrypt secure password hashing. |
| **WP6: Stakeholder Involvement** | Engineered a 4-tier RBAC system where citizen actions (pollution reports) directly dictate officer workflows. |
| **WP7: Interdependence** | The React UI reacts instantly to Express backend state mutations, which trigger the event bus, pushing via SSE to the client. |

## Quality Commands

```bash
npm run lint
npm run test
npm run build
```
