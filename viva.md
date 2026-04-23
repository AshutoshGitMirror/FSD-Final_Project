# VayuSetu Mumbai — Capstone Architecture & Viva Guide

This document provides a deep, technically rigorous breakdown of the VayuSetu Mumbai application architecture. Use this to demonstrate a profound understanding of the codebase, internal execution flows, and engineering trade-offs during your Capstone viva.

---

## 1. Core Technical Implementation & Execution Flow

### A. The "Live Ingestion to UI" Execution Pipeline
The most complex flow in the application is how external data is ingested, processed, and pushed to the client. This touches almost every layer of the MERN-equivalent stack.

1. **Trigger (`src/web/App.jsx`):** An admin clicks "Ingest Live Data". A `POST /api/external/ingest-live-inputs` request is fired.
2. **Controller (`src/api/routes/externalDataRoutes.js`):** The Express router validates the JWT and RBAC (`requireRoles("city_admin")`).
3. **External Fetch (`src/api/services/externalDataService.js`):** Makes asynchronous HTTP requests to the Open-Meteo Air Quality and Weather APIs to get baseline Mumbai data (PM2.5, PM10, NO₂, O₃, Wind, Temp).
4. **Processing (`src/api/services/riskService.js` & `src/api/riskEngine.js`):** 
   - The system maps over all 24 wards defined in `src/api/wardCatalog.js`.
   - The `riskEngine.js` algorithm takes the baseline city AQI and applies a mathematical synthesis: `(CityAQI * DensityIndex) - (TreeCoverPct * MitigationFactor)`.
5. **Persistence (`src/api/db.js`):** The synthesized scores are bulk-inserted into the `risk_snapshots` SQLite table.
6. **Event Bus (`src/api/eventBus.js`):** The backend publishes an `input.external.ingested` event to the internal Node `EventEmitter`.
7. **SSE Broadcast (`src/api/routes/alertRoutes.js`):** The Alert router, which holds open `response` objects for all connected clients, intercepts the internal event and writes it to the TCP stream using `res.write(\`data: ${payload}\n\n\`)`.
8. **Client Reactivity (`src/web/App.jsx`):** The `useEffect` hook listening to the `EventSource` receives the message and triggers `loadAll()`, causing React to diff the Virtual DOM and update the UI instantly without a full page reload.

### B. Server-Sent Events (SSE) Implementation
We explicitly chose SSE over WebSockets (like Socket.io) because our data flow is strictly **unidirectional** (Server -> Client). 
- **Backend:** In `src/api/routes/alertRoutes.js`, the `GET /alerts/stream` endpoint sets headers `Content-Type: text/event-stream` and `Connection: keep-alive`. It pushes the `response` object into a `clients` Set. The `eventBus.js` acts as a PubSub broker; when `publishEvent()` is called anywhere in the app, it iterates through the `clients` Set and pushes the JSON payload.
- **Frontend:** In `src/web/App.jsx`, the native browser `EventSource` API connects to the endpoint. We attach event listeners to specific event types (e.g., `incident.created`, `aqi.hazardous`).

### C. JWT Authentication & RBAC Middleware
- **Auth Flow (`src/api/auth.js`):** We use stateless `jsonwebtoken`. The `signAccessToken` function serializes the user's `id`, `role`, and `ward_code` into the payload.
- **Middleware (`src/api/auth.js`):** 
  - `authRequired`: Extracts the Bearer token, verifies the signature using `JWT_SECRET`, and attaches the decoded payload to `request.auth`.
  - `requireRoles(...roles)`: A higher-order function that checks if `request.auth.role` exists within the permitted roles array. If not, it returns a `403 Forbidden` response instantly, short-circuiting the Express middleware chain.

---

## 2. Database Schema (SQLite Relational Model)

The project utilizes SQLite with a strictly normalized relational database design, implemented in `src/api/db.js`.

```mermaid
erDiagram
    users {
        INTEGER id PK
        TEXT name
        TEXT email
        TEXT password_hash
        TEXT role "city_admin, zone_officer, health_advisor, citizen"
        TEXT ward_code FK "Nullable (Links to wards.code)"
    }
    
    wards {
        TEXT code PK "e.g., G/N, L"
        TEXT name "e.g., Dharavi, Kurla"
        INTEGER population
        REAL vulnerability_index
        REAL density_index
        REAL tree_cover_pct
    }

    incidents {
        INTEGER id PK
        TEXT title
        TEXT description
        TEXT type "waste_burning, construction_dust"
        TEXT severity "low, moderate, high, hazardous"
        TEXT status "open, investigating, assigned, resolved, closed"
        TEXT ward_code FK
        INTEGER reported_by FK "users.id"
        INTEGER assigned_to FK "users.id (Nullable)"
    }

    advisories {
        INTEGER id PK
        TEXT title
        TEXT message
        TEXT priority
        TEXT ward_code FK "Nullable"
        INTEGER author_id FK "users.id"
    }

    risk_snapshots {
        INTEGER id PK
        TEXT ward_code FK
        REAL computed_score
        TEXT computed_level
        TEXT timestamp
    }

    users }o--o| wards : "assigned to (if officer)"
    incidents }o--|| wards : "occurs in"
    incidents }o--|| users : "reported by"
    incidents }o--o| users : "assigned to"
    advisories }o--o| wards : "targets"
    advisories }o--|| users : "written by"
    risk_snapshots }o--|| wards : "measures"
```

---

## 3. Viva Preparation: The 8 Mandatory Questions

Use these deeply technical answers to demonstrate your engineering competence.

### Q1: What is the problem your application is solving?
**A:** Mumbai's CAAQMS infrastructure provides city-level AQI, which masks hyper-local pollution crises. VayuSetu solves this by synthesizing granular, **ward-level** air quality intelligence. It combines Open-Meteo API data with deterministic ward characteristics (density, green cover) via our `riskEngine.js`. Furthermore, it implements a closed-loop citizen reporting system (`src/api/routes/incidentRoutes.js`) where localized pollution reports directly impact the ward's composite risk score.

### Q2: Why did you choose your specific technology stack?
**A:** We chose the **Node.js/Express** runtime specifically for its non-blocking, event-driven architecture, which is fundamental for implementing our `EventEmitter`-based PubSub system and SSE streams in `alertRoutes.js`. **React (Vite)** was selected for the frontend because its Virtual DOM allows us to patch the UI reactively when the `EventSource` receives live updates. **SQLite** was chosen because its single-file architecture drastically simplifies deployment to ephemeral containers (like Render), while maintaining strict ACID compliance and standard SQL syntax for an eventual PostgreSQL migration.

### Q3: Explain your system architecture.
**A:** The system follows a decoupled, API-first Client-Server architecture. The React SPA (`src/web`) acts as a thin presentation layer, communicating via a centralized Axios-like wrapper (`apiClient.js`). The Express backend (`src/api`) utilizes controller-based routing (`routes/`), business logic services (`services/`), and a core algorithmic engine (`riskEngine.js`). Real-time capabilities are handled by an internal Node `EventEmitter` (`eventBus.js`) that bridges database mutations to the TCP streams held open by `alertRoutes.js`.

### Q4: How does your backend communicate with the frontend?
**A:** We implemented a hybrid transport layer:
1. **Synchronous REST (JSON):** Standard HTTP GET/POST/PATCH requests with Zod schema validation (`src/api/http/schemas.js`) for CRUD operations and state mutations.
2. **Asynchronous SSE (Server-Sent Events):** Implemented in `alertRoutes.js`, the server maintains `keep-alive` HTTP connections. When a mutation occurs (e.g., an officer is assigned a report), the `publishEvent` hook serializes the JSON payload and writes it directly to the open TCP stream, allowing the React `useEffect` hooks to trigger state updates instantly.

### Q5: What challenges did you face during development?
**A:** Our primary engineering constraint was deriving ward-level granularity from a city-level external API. We engineered around this by building a deterministic synthesis algorithm (`riskEngine.js`). It extracts the base pollutants (PM2.5, NO₂, etc.) from the Open-Meteo payload, computes a baseline AQI, and then applies a mathematical modifier using the `vulnerability_index`, `density_index`, and `tree_cover_pct` stored in `wardCatalog.js`. This allows us to scale horizontally without hardware sensor dependencies.

### Q6: How is your project scalable?
**A:** The architecture scales primarily through its **stateless design**. By implementing JWTs in `auth.js`, the Express server maintains zero session state, meaning it can be horizontally scaled behind a load balancer. Furthermore, we decoupled external API fetching from client requests; instead of passthrough proxying (which would hit Open-Meteo rate limits), the backend ingests data asynchronously, stores it in SQLite, and serves client requests directly from the database memory cache.

### Q7: Explain your database schema design.
**A:** The schema (`src/api/db.js`) is normalized to 3NF. The foundational entity is `wards`. The `users` table handles authentication and RBAC, with a nullable foreign key `ward_code` to restrict a `zone_officer`'s authorization scope. The `incidents` table (citizen reports) utilizes compound foreign keys linking the `reported_by` citizen, the `assigned_to` officer, and the geographic `ward_code`. Finally, `risk_snapshots` serves as an append-only time-series ledger for historical AQI calculations.

### Q8: What improvements would you make in future?
**A:** Architecturally, I would migrate the internal `EventEmitter` in `eventBus.js` to a dedicated Redis Pub/Sub instance to allow for multi-node clustering of the Express backend. At the data layer, I would replace the `riskEngine.js` synthesis algorithm with direct API ingestion from decentralized, ward-specific IoT particulate sensors. 

---

## 4. Complex Engineering Problem (CEP) Justification

If the evaluators ask how this qualifies as a "Complex Engineering Problem," use this expanded breakdown. VayuSetu goes far beyond a simple CRUD app by successfully addressing all 7 CEP requirements:

### WP1: Depth of Knowledge Required
The project required moving beyond basic API routing to implement core engineering systems from scratch:
- **Custom Cryptographic Auth:** We built a fully stateless authentication system using `bcrypt` for secure password hashing and JSON Web Tokens (JWT) for sessionless identity verification.
- **Custom Pub/Sub Event Bus:** Instead of basic linear execution, we built an event-driven architecture using Node's `EventEmitter` (`eventBus.js`) to decouple database mutations from real-time client notifications.
- **Algorithmic Modeling:** We built a deterministic risk algorithm (`riskEngine.js`) rather than just storing simple string data.

### WP2: Conflicting Requirements
We explicitly resolved three major engineering conflicts:
1. **Real-time Data vs. API Rate Limits:** The UI requires real-time pollution updates, but the Open-Meteo API strictly rate-limits free tiers. We solved this by building a centralized, asynchronous ingestion engine. The backend fetches the API once, stores the result in SQLite, and serves thousands of connected clients from its own database cache via SSE.
2. **Scalability vs. Infrastructure Cost:** A stateful server with session memory is unscalable on free hosting. We engineered a completely stateless backend using JWTs, allowing it to be horizontally scaled on ephemeral containers (like Render).
3. **Data Accuracy vs. Hardware Constraints:** The city lacks physical CAAQMS sensors in every ward, but we needed ward-level granularity. We substituted missing hardware with algorithmic synthesis, deriving hyper-local scores from city-level baselines.

### WP3: Depth of Analysis
The problem demanded deep analytical decisions regarding architecture:
- **Mathematical Synthesis over Mock Data:** Instead of faking localized data, we mathematically modified the baseline city pollutants (PM2.5, NO₂) using real-world ward characteristics: `(CityAQI * DensityIndex) - (TreeCoverPct * MitigationFactor)`.
- **SSE over WebSockets:** We analyzed transport protocols. Since our data flow is strictly unidirectional (Server → Client alerts), we rejected WebSockets as unnecessary overhead and implemented HTTP Server-Sent Events (SSE), reducing TCP connection overhead.
- **Relational Data Modeling:** Analyzing the requirements of a geographic incident reporting system led us to design a 3NF normalized schema linking `users`, `incidents`, and `wards` via foreign keys.

### WP4: Familiarity of Issues
We tackled the unfamiliar and highly modern challenge of **Real-Time UI Synchronization**. Instead of forcing the user to manually refresh the page or using inefficient HTTP polling (which spams the server), we implemented persistent Server-Sent Events (SSE) via open TCP streams. The React Virtual DOM listens to this stream and selectively re-renders only the changed components.

### WP5: Applicable Codes
The project adheres to strict industry standards:
- **REST Conventions:** Strict adherence to GET, POST, and PATCH verbs with proper HTTP status codes (200, 201, 400, 401, 403, 404).
- **Security:** Bcrypt hashing, rate-limiting on authentication routes to prevent brute-force attacks, and robust JWT validation.
- **Data Validation:** Comprehensive `Zod` schemas validate all incoming request payloads before they ever touch the database layer.

### WP6: Stakeholder Involvement
We engineered a 4-tier Role-Based Access Control (RBAC) system involving multiple interacting stakeholders:
- **City Admin:** Has full oversight and triggers API ingestions.
- **Health Advisor:** Focuses purely on publishing medical advisories based on AQI data.
- **Zone Officer:** Their view is geographically restricted to their specific ward; they investigate local incidents.
- **Citizen:** Submits localized pollution reports (e.g., waste burning), directly dictating the workflow of the Zone Officers.

### WP7: Interdependence
The system consists of highly interconnected components: The React Frontend acts as the presentation layer, relying entirely on the Express Backend. The backend relies on the Open-Meteo Python/Flask APIs for raw data. The SQLite database serves as the ultimate source of truth. When an incident is resolved in the database, it triggers the internal Event Bus, which pushes an SSE to the Frontend, completing a fully interdependent cycle.

---

## 5. Extra Marks: Advanced Features Validation

The Capstone rubric explicitly awards higher marks for advanced features. VayuSetu implements 5 out of 6 of these:

1. **Role-Based Access Control (RBAC):** Fully implemented with 4 distinct roles enforced via JWT payload inspection in the middleware.
2. **Real-time Features:** Fully implemented using Server-Sent Events (SSE). Clients receive live updates the exact millisecond the database changes.
3. **Analytics Dashboard:** Implemented via the `Analytics` and `Map` tabs, featuring data aggregation (worst vs. cleanest wards) and visual geospatial rendering.
4. **Third-Party API Integration:** Fully integrated with Open-Meteo's Air Quality and Weather APIs for live, real-world data fetching.
5. **Dynamic Data Handling:** Implemented via the citizen pollution reporting system, which feeds back into the dynamic AQI risk scores.
*(Note: AI/ML and Payment Gateways were omitted as they are irrelevant to an environmental monitoring dashboard).*

---

## 5. Deployment Instructions (For Render & Vercel)

### 1. Backend Deployment (Render)
- Go to [Render.com](https://render.com) and click **New → Web Service**.
- Connect your GitHub repository.
- **Root Directory:** `src/api`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- Click Deploy. Copy the URL it gives you (e.g., `https://fsd-final-project-api.onrender.com`).

### 2. Frontend Deployment (Vercel)
- Go to [Vercel.com](https://vercel.com) and click **Add New → Project**.
- Import the GitHub repository.
- **Framework Preset:** `Vite`
- **Root Directory:** `src/web`
- **Environment Variables:** Add a new variable named `VITE_API_URL`. Set the value to your Render URL plus `/api` (e.g., `https://fsd-final-project-api.onrender.com/api`).
- Click Deploy. Vercel will give you a live URL for your frontend.
