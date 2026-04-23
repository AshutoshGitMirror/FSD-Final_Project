# VayuSetu Master Class: Deep-Dive Computer Science Breakdown

This document is a highly technical textbook designed to teach you the underlying Computer Science principles powering VayuSetu. We will rebuild the core concepts from scratch so you understand exactly what the libraries (`jsonwebtoken`, `express`, `better-sqlite3`, `react`) are doing under the hood, directly addressing common blindspots in full-stack architecture.

---

## Chapter 1: The Cryptography of Stateless Identity (JWT)

We established that HTTP has amnesia (stateless), and we use JSON Web Tokens (JWT) to remember users. But how does `jwt.verify()` actually work?

### The Anatomy of a JWT
If you look at a real JWT, it looks like this:
`eyJhbG... . eyJzdWIiOjUsInJvbGUiOiJjaXRpemVuIn0 . SflKxw...`

It consists of three strings separated by periods: `Header.Payload.Signature`.

### CRITICAL BLINDSPOT: Base64 Encoding vs. Encryption
A common misconception is that a JWT is encrypted or hidden. **It is not.**
The middle string (the Payload) is literally just the plain JSON string `{"sub": 5, "role": "citizen"}` converted into **Base64**. 

Base64 is NOT a secret code or a lock. It is simply a different alphabet used to ensure text doesn't contain spaces or special characters that would break HTTP URLs. If you copy the middle section of a JWT and type `atob("eyJzdWIiOjUsInJvbGUiOiJjaXRpemVuIn0")` into your browser console, it instantly converts it back to plain JSON. Anyone can read it.

So, if anyone can decode it, why can't a hacker decode it, change their ID to `1` (Admin), re-encode it to Base64, and send it back?

**The answer is the Signature (the third string).**

### Sample Program: Building JWT from Scratch in Raw Node.js
If we uninstalled the `jsonwebtoken` library, here is exactly how we would write it using Node's built-in `crypto` module:

```javascript
const crypto = require('crypto');

const JWT_SECRET = "super_secret_key"; // Only the server knows this!

// 1. The data we want to send to the browser
const payload = { sub: 5, role: "zone_officer" };
const header = { alg: "HS256", typ: "JWT" };

// 2. ENCODING (Not encrypting)
// We convert them to strings, then encode them in Base64 so they fit in HTTP headers safely.
const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

// 3. THE CRYPTOGRAPHY (Creating the Signature)
// We take the Header + Payload, and run complex math on them using our Secret Key.
const signature = crypto
  .createHmac('sha256', JWT_SECRET)
  .update(encodedHeader + "." + encodedPayload)
  .digest('base64url');

// 4. The Final Token
const myToken = `${encodedHeader}.${encodedPayload}.${signature}`;
```

### How Verification Works
When React sends that token back, the Express server splits the string at the periods. 
It takes the `encodedHeader` and `encodedPayload` that the user sent, and **runs Step 3 again**. 
If a hacker changed their ID to `1`, the `encodedPayload` changes. When the server runs `crypto.createHmac` on the tampered payload, the resulting math produces a completely different signature. The server sees the signatures don't match and throws a `401 Unauthorized`.

---

## Chapter 2: The Anatomy of an HTTP Request (Headers vs. Body)

### CRITICAL BLINDSPOT: JWT vs. Button Events
If the JWT payload never changes while logged in, how do we send different data when a user clicks a button?

You must understand that an HTTP Request acts like a **FedEx Package**. It has two distinct parts:

1. **The Shipping Label (The Headers):** This contains meta-information. This is where the JWT lives (`Authorization: Bearer <token>`). It acts as your permanent ID card.
2. **The Contents of the Box (The Body):** This contains the actual dynamic data from your React button click or form submission.

When you click "Submit Pollution Report" in React, `apiClient.js` constructs the package:
```javascript
// The contents of the box (The Body)
const body = {
  title: "Burning Garbage",
  description: "Thick black smoke near the station."
};

// The shipping label (The Headers)
const headers = {
  "Authorization": `Bearer ${token}` 
};
```

When Express receives this package, it merges the two parts to interact with the database:

**Step 1: Read the Label (`authRequired` middleware)**
Express verifies the signature on the JWT in the headers. It decodes the Base64, finds `{sub: 5}`, and attaches it to memory: `req.auth.sub = 5`.

**Step 2: Open the Box (`incidentRoutes.js` controller)**
Express opens the body of the request to see what the user actually wants to do. It then merges the Body and the Header to write to SQLite:

```javascript
// req.body.title comes from the BOX (The Button Click)
// req.auth.sub comes from the LABEL (The JWT Payload)

db.prepare(`
  INSERT INTO incidents (title, description, reported_by) 
  VALUES (?, ?, ?)
`).run(req.body.title, req.body.description, req.auth.sub); // The DB link is made!
```

---

## Chapter 3: The Physics of Server-Sent Events (TCP & HTTP)

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
    req.on("close", () => connectedBrowsers.delete(res));
  }
});

// SIMULATING A DATABASE INSERT (Like when someone submits a pollution report)
setInterval(() => {
  const dbData = { type: "incident.created" };
  
  // Loop through every open browser pipe and shove data down it.
  connectedBrowsers.forEach(browserPipe => {
    // SSE requires a very specific text format: "data: <string>\n\n"
    browserPipe.write(`data: ${JSON.stringify(dbData)}\n\n`);
  });
}, 5000);

server.listen(4000);
```

---

## Chapter 4: The Risk Engine & Algorithmic Synthesis

We didn't have 24 physical IoT sensors in Mumbai. We only had the Open-Meteo API, which gives us one massive city-wide number. How did we algorithmically derive 24 unique, highly accurate ward scores?

### The Mathematics of `riskEngine.js`
We calculate a "Base City Risk Score" out of 100 based on standard AQI math from Open-Meteo. Let's say the Base Risk is **60**.

Now, we look at **Ward G/N (Dharavi)** in `wardCatalog.js`:
- `vulnerability_index`: 1.2 (High poverty/density)
- `density_index`: 1.4 (Extreme overcrowding)
- `tree_cover_pct`: 2% (Almost no green cover to filter air)

### The Algorithm:
```javascript
// Base score = 60
const calculateWardRisk = (baseScore, ward) => {
    // 1. Amplification: High density and vulnerability multiply the risk.
    const multiplier = (ward.vulnerability_index + ward.density_index) / 2; 
    let wardScore = baseScore * multiplier;

    // 2. Mitigation: Trees absorb PM2.5. We reduce the score based on green cover.
    const mitigation = ward.tree_cover_pct * 0.5; 
    wardScore = wardScore * (1 - mitigation);

    return Math.round(wardScore);
}
```

**The Output:**
- Dharavi: `60 * 1.3 = 78`. Tree mitigation: `78 * (1 - 0.01) = 77`. (Unhealthy)

This is a **Deterministic Algorithm**. Given the exact same input, the outputs for the wards will always be mathematically identical. 

---

## Chapter 5: SQLite and Relational Integrity

We used SQLite via the `better-sqlite3` driver. 

### Foreign Keys & Data Integrity
Unlike MongoDB (which stores unstructured documents), SQLite guarantees relational data integrity using Foreign Keys:

```sql
CREATE TABLE incidents (
    id INTEGER PRIMARY KEY,
    title TEXT,
    ward_code TEXT,
    reported_by INTEGER,
    FOREIGN KEY(ward_code) REFERENCES wards(code),
    FOREIGN KEY(reported_by) REFERENCES users(id)
);
```
If a request tries to insert `ward_code = "XYZ"`, SQLite will hard crash the query because "XYZ" does not exist in the `wards` table. MongoDB would have silently accepted the garbage data.

### SQL Injection Protection (Parameterization)
In `incidentRoutes.js`, you will see code like this:
```javascript
db.prepare("INSERT INTO incidents (title) VALUES (?)").run(req.body.title);
```
If a malicious citizen submits a pollution report with the title: `"Fire! ); DROP TABLE users; --"`
By using `?` (Parameterized Queries), the `better-sqlite3` driver automatically escapes all dangerous characters, treating it strictly as text and completely neutralizing the SQL injection attack.

---

## Chapter 6: React Virtual DOM & Reactivity

When the SSE stream receives a message, how does the UI update so fast?

React doesn't talk to the actual browser HTML (the DOM) directly because modifying HTML is incredibly slow. Instead, React holds a lightweight Javascript copy of the entire screen in its memory. This is the **Virtual DOM**.

### The Reactivity Flow in VayuSetu
1. **The Event:** The SSE listener in `App.jsx` receives `{"type": "incident.created"}`.
2. **The State Change:** React calls `setIncidents(newIncidentsArray)`.
3. **The Diffing Algorithm (Reconciliation):** 
   React generates a brand new Virtual DOM in memory. React then compares the *New Virtual DOM* to the *Old Virtual DOM*. It realizes: *"Ah, the only difference is that there is one extra `<tr>` row in the UserManagementPanel table."*
4. **The Paint:** React reaches into the actual browser HTML and surgically injects just that single `<tr>` row, leaving the rest of the page completely untouched.
