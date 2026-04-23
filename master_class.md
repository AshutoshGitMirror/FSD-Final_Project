# VayuSetu Master Class: Deep-Dive Computer Science Breakdown

This document is a highly technical textbook designed to teach you the underlying Computer Science principles powering VayuSetu. We will rebuild the core concepts from scratch using sample programs so you understand exactly what the libraries (`jsonwebtoken`, `express`, `better-sqlite3`, `react`) are doing under the hood.

---

## Chapter 1: The Cryptography of Stateless Identity (JWT)

We established that HTTP has amnesia (stateless), and we use JSON Web Tokens (JWT) to remember users. But how does `jwt.verify()` actually know a token wasn't tampered with?

### The Anatomy of a JWT
If you look at a real JWT, it looks like this:
`eyJhbG... . eyJzdWI... . SflKxw...`

It is just three Base64 encoded strings separated by periods: `Header.Payload.Signature`.
1. **Header:** Says what math algorithm is used (usually HMAC-SHA256).
2. **Payload:** The actual JSON data (`{"id": 5, "role": "admin"}`).
3. **Signature:** The cryptographic proof.

### Sample Program: Building JWT from Scratch in Raw Node.js
If we uninstalled the `jsonwebtoken` library, here is exactly how we would write it using Node's built-in `crypto` module:

```javascript
const crypto = require('crypto');

const JWT_SECRET = "super_secret_key";

// 1. The data we want to send to the browser
const payload = { id: 5, role: "zone_officer" };
const header = { alg: "HS256", typ: "JWT" };

// 2. Convert them to strings, then encode them in Base64 (so they can be sent safely in HTTP headers)
const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

// 3. THE CRYPTOGRAPHY (Creating the Signature)
// We take the Header + Payload, and hash them using our Secret Key.
const signature = crypto
  .createHmac('sha256', JWT_SECRET)
  .update(encodedHeader + "." + encodedPayload)
  .digest('base64url');

// 4. The Final Token
const myToken = `${encodedHeader}.${encodedPayload}.${signature}`;
console.log("Token sent to React:", myToken);
```

### How Verification Works (The `authRequired` Middleware)
When React sends that token back, the Express server splits the string at the periods. 
It takes the `encodedHeader` and `encodedPayload` that the user sent, and **runs step 3 again**. 
If a hacker changed their `role` to "admin", the `encodedPayload` changes. When the server runs `crypto.createHmac` on the forged payload, the resulting signature will be completely different from the signature attached to the token. 

```javascript
// Inside src/api/auth.js
export const authRequired = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    // Under the hood, this function does exactly what we did above.
    // If the math doesn't match, it throws an error.
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    
    // We attach the safe data to the request so the next function can use it.
    req.auth = decodedPayload; 
    
    // next() tells Express: "This middleware is done, go to the actual route handler!"
    next(); 
  } catch (err) {
    res.status(401).json({ error: "Invalid token or signature mismatch" });
  }
};
```

### The Missing Link: Tying it back to the Database
You might be wondering: *"Okay, the math checks out, but how does the server know this token belongs to the actual user in the database?"*

The answer lies in **where the payload came from in the first place**, and **how we use it later**.

**Step 1: The Initial Login (Database Read)**
When the user types their email and password, the server does a `SELECT * FROM users WHERE email = ?`. It finds User Row #5.
Because the server found them in the database, it takes their database Primary Key (`id: 5`) and puts it *inside* the payload: `const payload = { sub: 5, role: "citizen" }`.
It signs it and hands it to the user.

**Step 2: The Future Request (Database Write)**
Ten minutes later, the user wants to submit a pollution report. They send the token.
The `authRequired` middleware (above) verifies the token and says: *"The math is perfect. I trust this payload. I am attaching `{ sub: 5 }` to the request."*

Now, the code moves to the actual route handler in `incidentRoutes.js`. 
Because the middleware mathematically proved this request came from User #5, the server confidently runs this SQL query:

```javascript
db.prepare(`
  INSERT INTO incidents (title, reported_by) 
  VALUES (?, ?)
`).run("Burning Garbage", req.auth.sub); // It uses the ID from the trusted token!
```

This is how the link is made: 
We don't need to check the `users` database table to verify the token, because the token **contains the database ID**. We trust the ID inside the token because the cryptography proves nobody tampered with it since the moment the server originally generated it during login.

---

## Chapter 2: The Physics of Server-Sent Events (TCP & HTTP)

How does data arrive on the screen instantly without refreshing? To understand SSE, you must understand how a standard HTTP request works at the network level.

### Standard HTTP (The Teardown)
When you type a URL into a browser:
1. **TCP Handshake:** Browser and Server connect (SYN, SYN-ACK, ACK).
2. **Request:** Browser sends HTTP headers (`GET /users`).
3. **Response:** Server sends data (`[{"name": "Admin"}]`).
4. **TCP Teardown:** Server immediately calls `socket.destroy()` and hangs up the connection.

### SSE HTTP (The Infinite Loop)
To achieve real-time data, we must prevent Step 4 (The Teardown). We must hijack the Express `response` object and tell Node.js to keep the TCP socket open forever.

### Sample Program: Raw Node.js SSE Server (No Express)
Here is the raw underlying network code that powers `alertRoutes.js`:

```javascript
const http = require('http');

const connectedBrowsers = new Set();

const server = http.createServer((req, res) => {
  if (req.url === "/stream") {
    // 1. Tell the browser this is an infinite stream, and DO NOT close the connection.
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Connection": "keep-alive"
    });

    // 2. Add this specific user's TCP pipe to our global list.
    connectedBrowsers.add(res);

    // 3. Notice we NEVER call res.end(). The pipe stays open.
    
    // If the user closes their browser tab, clean up the memory.
    req.on("close", () => connectedBrowsers.delete(res));
  }
});

// SIMULATING A DATABASE INSERT (Like when someone submits a pollution report)
setInterval(() => {
  const dbData = { message: "A new pollution report was filed!" };
  
  // The EventBus equivalent: Loop through every open browser pipe and shove data down it.
  connectedBrowsers.forEach(browserPipe => {
    // SSE requires a very specific text format: "data: <string>\n\n"
    browserPipe.write(`data: ${JSON.stringify(dbData)}\n\n`);
  });
}, 5000);

server.listen(4000);
```

### Applying this to VayuSetu
In `src/api/routes/alertRoutes.js`, we do exactly this. 
But instead of a `setInterval`, we use Node's `EventEmitter` (`src/api/eventBus.js`). 
When `src/api/routes/incidentRoutes.js` runs an SQL `INSERT` to save a pollution report, it triggers `eventBus.emit()`. That emission instantly runs the `connectedBrowsers.forEach` loop, shooting the JSON down the open TCP pipe to every connected React client in milliseconds.

---

## Chapter 3: The Risk Engine & Algorithmic Synthesis

We didn't have 24 physical IoT sensors in Mumbai. We only had the Open-Meteo API, which gives us one massive city-wide number. 
How did we algorithmically derive 24 unique, highly accurate ward scores? We used geographic synthesis.

### The Mathematics of `riskEngine.js`
Open-Meteo gives us the raw concentration of pollutants in micrograms per cubic meter (µg/m³).
For example: `PM2.5 = 45 µg/m³` and `NO2 = 20 µg/m³`.

We calculate a "Base City Risk Score" out of 100 based on standard AQI math. Let's say the Base Risk is **60**.

Now, we look at **Ward G/N (Dharavi)** in `wardCatalog.js`:
- `vulnerability_index`: 1.2 (High poverty/density)
- `density_index`: 1.4 (Extreme overcrowding)
- `tree_cover_pct`: 2% (Almost no green cover to filter air)

And we look at **Ward R/C (Borivali)**:
- `vulnerability_index`: 0.8 (Wealthier, better healthcare)
- `density_index`: 0.9 (Suburban spacing)
- `tree_cover_pct`: 35% (Sanjay Gandhi National Park)

### The Algorithm:
```javascript
// Base score = 60
const calculateWardRisk = (baseScore, ward) => {
    // 1. Amplification: High density and vulnerability multiply the risk.
    const multiplier = (ward.vulnerability_index + ward.density_index) / 2; 
    let wardScore = baseScore * multiplier;

    // 2. Mitigation: Trees absorb PM2.5. We reduce the score based on green cover.
    // If tree cover is 35%, we reduce the score by 17.5% (0.35 * 0.5)
    const mitigation = ward.tree_cover_pct * 0.5; 
    wardScore = wardScore * (1 - mitigation);

    return Math.round(wardScore);
}
```

**The Output:**
- Dharavi: `60 * 1.3 = 78`. Tree mitigation: `78 * (1 - 0.01) = 77`. (Unhealthy)
- Borivali: `60 * 0.85 = 51`. Tree mitigation: `51 * (1 - 0.175) = 42`. (Good)

This is a **Deterministic Algorithm**. It means given the exact same input (City AQI = 60), the outputs for the wards will always be mathematically identical. We don't use AI or random numbers; we engineered a reliable data model based on real urban physics.

---

## Chapter 4: SQLite and Relational Integrity

We used SQLite via the `better-sqlite3` driver. 

### Why SQLite?
Unlike MongoDB (which you used in your user-management API project), SQLite is a **Relational SQL Database**. MongoDB stores unstructured JSON documents. SQLite stores rigid tables with strictly defined columns.

### Foreign Keys & Data Integrity
The most important part of our database design is the **Foreign Key Constraints**. Look at the `incidents` table (where pollution reports are saved).

```sql
CREATE TABLE incidents (
    id INTEGER PRIMARY KEY,
    title TEXT,
    ward_code TEXT,
    reported_by INTEGER,
    assigned_to INTEGER,
    FOREIGN KEY(ward_code) REFERENCES wards(code),
    FOREIGN KEY(reported_by) REFERENCES users(id),
    FOREIGN KEY(assigned_to) REFERENCES users(id)
);
```
**Why this matters for Computer Science:**
If a hacker sends an API request to create an incident, but they set `ward_code = "XYZ"` (a ward that doesn't exist), MongoDB might just happily save it. 
SQLite will **hard crash the query and throw a Foreign Key Constraint Error**. The database physically refuses to save data that points to a non-existent ward or a non-existent user. This guarantees absolute data integrity.

### SQL Injection Protection (Parameterization)
In `incidentRoutes.js`, you will see code like this:
```javascript
db.prepare("INSERT INTO incidents (title, ward_code) VALUES (?, ?)").run(title, wardCode);
```
Why do we use `?` instead of just inserting the string like `VALUES (${title}, ${wardCode})`?

If a malicious citizen submits a pollution report with the title:
`"Fire! ); DROP TABLE users; --"`

If we used string interpolation, the database would execute the `DROP TABLE` command and delete our entire user base.
By using `?` (Parameterized Queries), the `better-sqlite3` driver automatically escapes all dangerous characters. It treats the hacker's string strictly as text, saving the literal string `"Fire! ); DROP TABLE users; --"` into the title column, completely neutralizing the SQL injection attack.

---

## Chapter 5: React Virtual DOM & Reactivity

When the SSE stream receives a message, how does the UI update so fast?

### The Virtual DOM
React doesn't talk to the actual browser HTML (the DOM) directly because modifying HTML is incredibly slow and CPU-intensive.
Instead, React holds a lightweight Javascript copy of the entire screen in its memory. This is the **Virtual DOM**.

### The Reactivity Flow in VayuSetu
1. **The Event:** The SSE listener in `App.jsx` receives `{"type": "incident.created"}`.
2. **The State Change:** React calls `setIncidents(newIncidentsArray)`.
3. **The Diffing Algorithm (Reconciliation):** 
   Because a `useState` hook was triggered, React generates a brand new Virtual DOM in memory. 
   React then compares the *New Virtual DOM* to the *Old Virtual DOM*. 
   It realizes: *"Ah, the only difference is that there is one extra `<tr>` row in the UserManagementPanel table."*
4. **The Paint:** React reaches into the actual browser HTML and surgically injects just that single `<tr>` row, leaving the rest of the page completely untouched.

This is why the application feels like a native desktop app and never flickers or reloads. By combining **SSE (instant network data)** with **React's Virtual DOM (instant UI painting)**, we achieved maximum efficiency.
