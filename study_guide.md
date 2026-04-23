# VayuSetu Codebase Study Guide: From Scratch to Mastery

This guide is designed to help you study, understand, and master the VayuSetu codebase from the ground up. If you are asked to open the code during your viva and explain how a specific file works, this guide will give you the exact technical vocabulary and understanding you need.

---

## 1. The Core Stack & Project Structure

VayuSetu is built using **React** for the frontend, **Node.js + Express** for the backend, and **SQLite** for the database. 

The project uses an **npm workspace** setup. If you look at the root `package.json`, it manages two distinct sub-projects:
- `src/api` (The Backend)
- `src/web` (The Frontend)

This means the frontend and backend live in the same repository but run as two completely separate applications that talk to each other over HTTP.

---

## 2. The Backend: Node, Express, and SQLite (`src/api`)

The backend is an "API-first" server. It does not render HTML. It only accepts JSON requests, talks to the database, and returns JSON responses.

### A. The Entry Point: `server.js` & `app.js`
- **`server.js`:** This is the literal starting point of the application. If you run `node server.js`, it imports the Express app, connects to the database, seeds the database with initial users if it's empty, and starts listening on port 4000.
- **`app.js`:** This file creates the Express application. It sets up CORS (so the frontend can talk to it), adds rate limiting (to prevent spam), and imports all the routes.

### B. The Database: `db.js`
We use `better-sqlite3`, which is a synchronous, extremely fast SQLite library for Node.js.
- Open `src/api/db.js`. You will see `db.exec(...)` which creates all our tables (`users`, `wards`, `incidents`, etc.) if they don't exist.
- It uses standard SQL. For example, `CREATE TABLE IF NOT EXISTS users (...)`.

### C. Authentication & Role-Based Access Control: `auth.js` (Explained Simply)

**The Problem:** HTTP is "stateless." Every time React asks Express for data, Express has total amnesia. It has no idea who you are or if you logged in 5 seconds ago.

**The Old Way (Sessions):** Express gives you a "Session ID" cookie and saves a file in its memory saying "Session 123 = Admin". But if we host this on Render, Render deletes memory every time it goes to sleep!

**The Modern Way (JWT - JSON Web Tokens):**
Think of JWT like an **amusement park wristband**. 
1. **Login:** You show the ticket counter (Express) your ID and password. They verify it, and put a tamper-proof wristband on your arm (the JWT). Written on the wristband in sharpie is: `{"id": 5, "role": "zone_officer"}`. The ticket counter signs the wristband with an invisible UV ink signature (`JWT_SECRET`).
2. **Making Requests:** When you want to go on a ride (make an API request), you just show your wristband in the HTTP Header (`Authorization: Bearer <token>`).
3. **The Bouncer (`authRequired` middleware):** Express doesn't need to check the database! The Bouncer just shines a UV light on your wristband to check the signature (`JWT_SECRET`). If the signature is valid, the Bouncer reads the sharpie (`role: zone_officer`) and lets you in. If you try to forge a wristband, the signature will be invalid, and the Bouncer throws a `401 Unauthorized`.

This happens in `src/api/auth.js`. We use the `jsonwebtoken` library to create and verify these wristbands.

---

## 3. The Core Logic: How the Risk Engine Works

External APIs (like Open-Meteo) only give us ONE air quality reading for the entire city of Mumbai. But our project promises **ward-level** data. How do we do that?

Open **`src/api/riskEngine.js`**.
1. We take the "City AQI".
2. We look up the ward's specific characteristics from **`src/api/wardCatalog.js`** (e.g., Dharavi has a high `vulnerability_index` and `density_index`, while Borivali has a high `tree_cover_pct`).
3. We run a mathematical formula: We increase the base risk by the density/vulnerability multiplier, and we decrease the risk by the tree cover mitigation factor.
4. This results in a unique, highly localized AQI score for all 24 wards, generated entirely through algorithmic synthesis.

---

## 4. The Magic: Server-Sent Events (SSE)

This is the most impressive technical feature of the app. It's how the frontend updates instantly without you refreshing the page.

### The Problem with Polling (The "Are we there yet?" method)
Normally, if React wants live data, it uses a timer to ask Express every 5 seconds: *"Hey, is there new data?"* Express says *"No."* 5 seconds later: *"Hey, new data?"* Express says *"No."* 
This is called **polling**. It's like a kid in the backseat asking "Are we there yet?" It wastes tons of server energy and network bandwidth.

### The SSE Solution (The Live Radio Station method)
**Server-Sent Events (SSE)** changes the game. Instead of the browser constantly asking questions, the browser simply "tunes in" to the server's radio station and leaves the radio on. When the server has news, it broadcasts it over the airwaves.

Here is exactly how it is implemented in our code:

1. **The Post Office / News Desk (`src/api/eventBus.js`):** 
   We use an internal Node.js feature called `EventEmitter`. Whenever a user creates a new Pollution Report in the database, the database tells the Post Office: `publishEvent("incident.created", newReportData)`.

2. **The Radio Tower (`src/api/routes/alertRoutes.js`):**
   When the React frontend first loads, it connects to `GET /api/alerts/stream`. 
   Normally, Express responds with `res.send("Hello")` and **hangs up the phone**. 
   But for SSE, we do a magic trick! We tell Express to set the header `Connection: keep-alive` and **never hang up**. We add this open connection (`res`) to a big list of `clients`. 
   When the Post Office gets a message, the Radio Tower loops through every open connection and writes the message directly into the open pipe: `res.write(\`data: ${jsonData}\n\n\`)`.

3. **The Radio Receiver (`src/web/App.jsx`):**
   In React, we use the browser's built-in `EventSource` object (our radio receiver). 
   `const sse = new EventSource("http://localhost:4000/api/alerts/stream")`. 
   We write a function that says: *"If the radio broadcasts an `incident.created` message, immediately fetch the new data from the database and update the screen."* 
   Because the connection is already open, the data arrives in **milliseconds**.

---

## 5. The Frontend: React & Vite (`src/web`)

The frontend is a Single Page Application (SPA). It loads `index.html` once, and React takes over the routing and rendering.

### A. API Client (`apiClient.js`)
Instead of using Axios, we built a native `fetch` wrapper. It automatically grabs the JWT token from `localStorage` and attaches it to the `Authorization` header for every request.

### B. State Management (`App.jsx`)
`App.jsx` is the "brain" of the frontend. It holds all the global state:
- `user`: Who is logged in.
- `wards`, `risks`, `incidents`, `advisories`: The arrays of data fetched from the API.
It passes this data down to child components (like `IncidentsPanel` or `MumbaiMapPanel`) via "props".

### C. Conditional Rendering
Look at how `App.jsx` renders the Sidebar Navigation. 
```javascript
{isAdmin && <button onClick={() => setTab("users")}>Users</button>}
```
This is how we enforce RBAC on the UI layer. If `user.role` is not `city_admin`, the Users tab literally does not exist in the HTML DOM.

---

## 6. End-to-End Trace: Creating a Pollution Report

To truly understand the architecture, let's trace exactly what happens when a Citizen submits a Pollution Report.

1. **Frontend (`IncidentsPanel.jsx`):** 
   The citizen fills out the form and clicks Submit. React calls the `apiClient.post("/incidents", data)`.
2. **Middleware (`auth.js`):** 
   The Express server receives the request. The `authRequired` middleware verifies the citizen's JWT and attaches their User ID to the request. `requireRoles("citizen", ...)` verifies they have permission.
3. **Database Write (`incidentRoutes.js`):** 
   The router takes the JSON payload, parameterizes it (to prevent SQL injection), and runs `db.prepare("INSERT INTO incidents...").run()`.
4. **Event Trigger (`incidentRoutes.js`):** 
   Immediately after the DB write, the router calls `publishEvent("incident.created", newIncident)`.
5. **SSE Broadcast (`alertRoutes.js`):** 
   The Event Bus receives the trigger, loops through all connected clients (including the Zone Officer's browser), and pushes the event down the open TCP stream.
6. **Frontend Update (`App.jsx`):** 
   The Zone Officer's React app hears the `incident.created` event via `EventSource`, automatically re-fetches the `/incidents` API, and the new report magically pops up on their screen without them touching their mouse.

---

## Summary for Studying

If asked to explain your code, follow this script:
> *"Our React frontend uses standard HTTP requests to mutate data via Express controllers. When the Express controller writes to SQLite, it triggers a Node EventEmitter. Our Alert router, which holds open long-lived TCP connections for SSE, catches that event and broadcasts it to all connected browsers. The browsers catch the SSE event and trigger a React state update, making the UI feel instantly responsive."*
