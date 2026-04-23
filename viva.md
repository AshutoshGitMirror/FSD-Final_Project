# VayuSetu Mumbai — Capstone Architecture & Viva Guide

This document is your complete guide for the final Capstone (Mini Project) presentation and viva. It breaks down the architecture, explains how we met the Complex Engineering Problem (CEP) requirements, and provides answers to the mandatory viva questions.

---

## 1. System Architecture & Data Flow

VayuSetu is a modern, modular Full Stack application utilizing the **MERN-equivalent ecosystem** (React + Express + Node + SQLite). It is designed to be highly scalable and API-first.

### Components
1. **Frontend (React + Vite)**
   - Single Page Application (SPA) providing a reactive, role-based dashboard.
   - Communicates with the backend exclusively via RESTful JSON APIs.
   - Real-time updates powered by Server-Sent Events (SSE).

2. **Backend (Node.js + Express)**
   - Stateless REST API enforcing Role-Based Access Control (RBAC) via JWTs.
   - **Risk Engine (`riskEngine.js`)**: A custom algorithm that calculates a composite AQI score using real-time pollutant levels, ward population density, and green cover percentage.

3. **Database (SQLite)**
   - Relational database schema with 7 tables (`users`, `wards`, `risk_snapshots`, `incidents`, `advisories`, `audit_logs`).
   - Easily swappable to PostgreSQL for production scaling without changing the application logic.

4. **External Integrations**
   - **Open-Meteo Air Quality API**: Fetches real-time PM2.5, PM10, NO₂, and O₃ for Mumbai.
   - **Open-Meteo Weather API**: Fetches real-time temperature and wind speed.

### Core Data Flow (The "Live Ingestion" Loop)
1. **Admin** clicks "Ingest Live Data" on the dashboard.
2. **Backend** fetches city-wide pollutant levels from Open-Meteo (`externalDataService.js`).
3. **Backend** runs the Risk Engine, taking the city-wide AQI and applying ward-specific modifiers (density, green cover) to synthesize 24 unique ward scores.
4. **Backend** saves the new snapshot to the database and broadcasts an `input.external.ingested` event via SSE.
5. **Frontend** receives the SSE event and automatically re-fetches the latest dashboard data, updating the UI instantly without a page refresh.

---

## 2. Deployment Plan (GitHub + Render + Vercel)

As per the Capstone requirements, the project must be deployed live. 

1. **GitHub Setup**
   - Push this entire repository (`codex-land`) to a public GitHub repository.

2. **Backend Deployment (Render - Free Tier)**
   - Go to [Render.com](https://render.com) and create a new **Web Service**.
   - Connect your GitHub repo and select the `src/api` directory as the Root Directory.
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Render will give you a live URL (e.g., `https://vayusetu-api.onrender.com`).

3. **Frontend Deployment (Vercel - Free Tier)**
   - Go to [Vercel.com](https://vercel.com) and import your GitHub repo.
   - Set the Root Directory to `src/web`.
   - In the **Environment Variables** section, add:
     - Name: `VITE_API_URL`
     - Value: `https://vayusetu-api.onrender.com/api` (The Render URL you just got).
   - Click Deploy.

You will now have a live, working URL to submit and demonstrate during the evaluation.

---

## 3. Viva Preparation: The 8 Mandatory Questions

Use these answers to confidently defend your project during the evaluation.

### Q1: What is the problem your application is solving?
**A:** Mumbai faces severe, localized air quality crises, but existing tools like SAFAR only provide broad, city-level data. VayuSetu solves this by providing **ward-level** air quality intelligence. It synthesizes real-time external pollutant data with local ward characteristics (population density, green cover) to create a highly localized risk score. It also provides a closed-loop system where citizens can report pollution sources (like waste burning) and ward officers can investigate them, which feeds back into the risk scoring.

### Q2: Why did you choose your specific technology stack?
**A:** We chose a Node.js/Express backend because its asynchronous, event-driven architecture is perfect for handling our real-time Server-Sent Events (SSE) and external API polling. React was chosen for the frontend to build a dynamic, stateful dashboard that can instantly reflect live AQI changes without page reloads. SQLite was chosen for rapid development and relational integrity, with a structure that can trivially migrate to PostgreSQL for enterprise scale.

### Q3: Explain your system architecture.
**A:** We use a decoupled, API-first architecture. The frontend is a React SPA that acts purely as a presentation layer. The Express backend serves as the business logic hub, exposing a REST API protected by JWT authentication. The backend integrates with the Open-Meteo API for live environmental data, processes it through our custom Risk Engine, stores it in SQLite, and pushes real-time updates to connected clients using Server-Sent Events.

### Q4: How does your backend communicate with the frontend?
**A:** Communication happens via two channels:
1. **Synchronous REST APIs:** The frontend uses standard HTTP GET/POST/PATCH requests with JSON payloads for data fetching and mutations (e.g., logging in, submitting a pollution report).
2. **Asynchronous Server-Sent Events (SSE):** A persistent HTTP connection that allows the backend to push real-time notifications to the frontend when critical events happen (like new live data ingestion or a hazardous AQI alert).

### Q5: What challenges did you face during development?
**A:** Our biggest challenge was data granularity. External APIs only give a single AQI reading for the whole of Mumbai, but we needed ward-level data. We solved this by creating a custom synthesis algorithm that takes the baseline city AQI and modifies it based on each specific ward's population density index and tree cover percentage, resulting in 24 accurate, localized risk scores. 

### Q6: How is your project scalable?
**A:** 
1. **Stateless Auth:** Because we use JWTs instead of session cookies, the Node server is entirely stateless and can be horizontally scaled across multiple instances.
2. **Database:** Our SQLite schema uses standard relational patterns and parameterized queries, meaning we can point the ORM to a managed PostgreSQL cluster without changing our core business logic.
3. **Data Ingestion:** The architecture decouples the fetching of external data from client requests. One admin triggers the ingestion, which updates the database, meaning thousands of citizens can view the dashboard without us hitting the Open-Meteo API rate limits.

### Q7: Explain your database schema design.
**A:** The database is highly normalized. The core entity is `wards`, which holds static characteristics (population, density, geo-coordinates). The `users` table holds accounts linked to specific roles and optionally tied to a `ward_code`. The `risk_snapshots` table is a time-series table storing historical and current AQI calculations for every ward. Finally, the `incidents` table (citizen reports) and `advisories` table map back to wards via foreign keys, creating a fully relational web of environmental data.

### Q8: What improvements would you make in future?
**A:** Currently, our ward-level data is synthesized via an algorithm. In the future, we would integrate direct IoT sensor feeds from actual BMC CAAQMS monitoring stations installed in specific wards to provide raw, unsynthesized localization. We could also add predictive ML models to forecast AQI trends 24 hours in advance based on historical wind and temperature data.

---

## 4. Complex Engineering Problem (CEP) Matrix

If the evaluators ask how this qualifies as a "Complex Engineering Problem", reference this matrix:

| CEP Criteria | How VayuSetu Meets It |
|--------------|-----------------------|
| **WP1: Depth of Knowledge** | Custom risk engine algorithm, JWT stateless auth, and robust relational DB modeling. |
| **WP2: Conflicting Requirements** | Balancing real-time data freshness vs. strict external API rate limits (solved via centralized backend ingestion). |
| **WP3: Depth of Analysis** | Designing the synthesis logic to convert city-wide data into ward-level data using density and green cover math. |
| **WP4: Familiarity of Issues** | Implementing persistent Server-Sent Events (SSE) for real-time dashboard updates across all connected clients. |
| **WP5: Applicable Codes** | Strict REST conventions, Zod request validation, Bcrypt password hashing, and token-based RBAC. |
| **WP6: Stakeholder Involvement** | Four distinct roles (Admin, Officer, Advisor, Citizen) each with tailored access levels and dashboard views. |
| **WP7: Interdependence** | React UI reacting instantly to Express backend state changes triggered by external Python/Meteo APIs. |
