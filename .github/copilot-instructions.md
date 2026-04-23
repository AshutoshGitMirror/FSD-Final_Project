# Copilot Instructions for `TaapSetu Mumbai`

## Project aim and engineering stance

This repository is a CEP-aligned (WP1-WP7) production-style capstone for ward-level extreme-heat operations in Mumbai.  
When implementing changes, preserve:

- domain realism (risk, incidents, centers, advisories, outreach),
- accountability (audit trail for state changes),
- role/ward safety boundaries,
- Unix-style modularity (small focused modules; avoid monolithic route logic).

Use `docs/reference/cep-compliance-matrix.md` and `docs/reference/execution-plan.md` as constraints, not optional reading.

## Build, test, and lint commands

Run from repository root unless noted.

```bash
# dependency install
make install
# or
npm install

# full workspace checks
make build
make test
make lint
# or
npm run build
npm run test
npm run lint
```

Workspace-scoped commands:

```bash
# API
npm run dev -w src/api
npm run build -w src/api
npm run test -w src/api
npm run lint -w src/api

# Web
npm run dev -w src/web
npm run build -w src/web
npm run test -w src/web
npm run lint -w src/web
```

Single-test execution (Vitest):

```bash
# one API test file
npm run test -w src/api -- ../../tests/api/<name>.test.js

# one Web test file
npm run test -w src/web -- ../../tests/web/<name>.test.js

# one test by name
npm run test -w src/api -- -t "<test name fragment>"
npm run test -w src/web -- -t "<test name fragment>"
```

## High-level architecture

- Monorepo with two workspaces:
  - `src/api`: Express service with SQLite (`better-sqlite3`), JWT auth, role/ward authorization, SSE.
  - `src/web`: React + Vite operational console and public advisory feed.
- `src/api/server.js` is composition root:
  - loads config (`config.js`),
  - initializes DB + seeds (`db.js`),
  - wires app context (`db`, `publishEvent`, `eventBus`),
  - handles graceful shutdown.
- `src/api/routes/index.js` mounts bounded-context routers (`auth`, `risk`, `incidents`, `centers`, `tasks`, `advisories`, `command`, `alerts`, etc.) under `/api`.
- Risk flow is deterministic and data-backed:
  1. live ward inputs are upserted (`/live-inputs`);
  2. `recomputeAllWardRisks` computes score/level/top drivers via `riskEngine.js`;
  3. snapshots persist in `risk_snapshots`;
  4. severe outcomes emit `risk.severe` events.
- Command console flow in `src/web/App.jsx`:
  - one aggregate read path (`loadAll` via `Promise.all`),
  - mutation wrapper (`runMutation`) then refetch,
  - periodic polling (`usePolling`) plus SSE stream (`/alerts/stream`).

## Key codebase conventions (non-obvious, must preserve)

- **Router factory contract**: each route file exports `createXRouter(ctx)`. New API capabilities should be added as new route modules and mounted in `routes/index.js`, not appended as large blocks elsewhere.
- **Validation boundary**: input schemas live in `src/api/http/schemas.js`; handlers validate via `parsePayload`. Keep validation and handler side-effects separate.
- **Authorization boundary**:
  - `authRequired` gates authenticated endpoints.
  - `requireRoles(...)` gates role privileges.
  - ward scoping is centralized by `readWardOrNull` / `safeWardScope`; non-admin users cannot cross ward boundaries.
- **Mutation invariant**: state-changing handlers are expected to:
  1. persist mutation,
  2. write `insertAuditLog(...)`,
  3. emit domain event (`publishEvent(...)`) when relevant.
- **SSE compatibility rule**: `alerts/stream` accepts bearer header and `?token=` fallback for browser `EventSource`; preserve both unless explicitly redesigning stream auth.
- **Data mapping rule**: DB rows are snake_case; API responses are normalized through mappers (`toIncidentRecord`, `toCenterRecord`, etc.). Reuse mappers instead of inline shape conversion.
- **Frontend integration rule**: keep API wiring in `src/web/apiClient.js`; components should use callbacks/props, not direct `fetch` calls.
- **Role model constants**: role names and status enums are canonicalized in `http/schemas.js`; avoid introducing alternate string literals in handlers/components.
- **Test location convention**: workspace Vitest configs point to root suites:
  - API tests: `tests/api/**/*.test.js` (node env)
  - Web tests: `tests/web/**/*.test.js` (jsdom env)
- **Security baseline to retain**:
  - Helmet + CORS enabled in app bootstrap.
  - Default JWT secret is dev-only; production requires `JWT_SECRET`.
  - Avoid exposing token-bearing SSE URLs in production logs.

## Existing reference sources to consult before major changes

1. `important.md`
2. `docs/REFERENCE_INDEX.md`
3. `docs/reference/system-architecture.md`
4. `docs/reference/source-map.md`
5. `docs/reference/security-notes.md`
6. `docs/reference/execution-plan.md`

## Documentation and continuity requirements

- Keep docs aligned with implementation milestones; do not leave architecture/API docs stale after behavior changes.
- For larger edit batches, update references in depth (especially `source-map`, API/security docs, and `important.md`) so the next agent can continue without re-discovery.
