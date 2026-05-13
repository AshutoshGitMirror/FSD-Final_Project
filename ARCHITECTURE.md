# Architecture Overview

This document explains the system architecture, key flows, and how services interact so another agent can pick up quickly.

## High-level layout

Services (Render):
- **Frontend (static)**: Vite + React + Tailwind + DaisyUI
- **Backend (Node/Express)**: API, auth, RAG, gamification
- **LinksBackend (FastAPI)**: image/link/video search
- **ChromaBackend (FastAPI)**: deployed but unused (legacy)

Primary deployment URLs:
- Frontend: https://fsd-final-frontend-7kof.onrender.com
- Backend: https://fsd-final-backend-2acz.onrender.com
- LinksBackend: https://fsd-final-linksbackend.onrender.com

## Frontend

Entry points:
- `frontend/src/App.jsx`: route table
- `frontend/src/pages/DashboardExtended.jsx`: authenticated layout (sidebar + routes)

Key pages:
- **HomeHub**: dashboard widgets, progress, streaks, achievements
- **LearnPage**: chat + resources (visuals, diagrams, links)
- **QuickQuizPage**: adaptive quizzes from unlocked chapters
- **KnowledgeGraphPage**: concept map + gap analysis

Learn flow:
1. User enters `/dashboard/learn/:subject/:chapter`
2. `LearnPage` posts to `/api/chat` or `/api/feynman/chat`
3. AI response updates the chat, and links/visuals appear in sidebar/drawer

UI layout modes (LearnPage):
- `chat` = full chat
- `split` = chat + resources
- `resources` = full resources

## Backend

Entry point:
- `backend/server_extended.js` (Node/Express)

Core services:
- `ragService`: fetches full NCERT chapter text from MongoDB
- `performanceService`: star level calc + adaptive prompts
- `gamificationService`: achievements + daily reward

Key APIs:
- `POST /api/chat` — main AI tutor endpoint
- `POST /api/feynman/chat` — Teach Mode (tutor-style, with NCERT context)
- `GET /api/curriculum` — chapter list per subject
- `POST /api/progress` — quiz progress + leaderboard update
- `GET /api/knowledge-graph` — concept maps
- `GET /api/knowledge-graph/diagrams` — concept diagrams
- `GET /api/pdf` + `/api/pdf/proxy` — NCERT PDF lookup
- `GET /api/video` — curated seed videos

## RAG (NCERT)

Storage:
- `ncertcontents` collection in MongoDB (366 chapters, 14.9 MB total)

Flow:
- `ragService.buildContext({ std, board, subject, chapter })`
- Injects raw NCERT text into AI system prompt

Seed scripts:
- `backend/seed_ncert_content.js` — downloads PDFs + extracts text via pdftotext
- `backend/seed_pdfs.js` — NCERT PDF metadata
- `backend/seed_diagrams.js` — concept diagrams (Mermaid)
- `backend/seed_videos.js` — curated YouTube links
- `backend/seed_admin.js` — admin account

## Teach Mode (formerly Feynman Sandbox)

Teach Mode now uses:
- tutor-style system prompt
- NCERT context injection via `ragService`

Endpoint: `POST /api/feynman/chat`
Payload: `{ concept, subject, chapter, std, board, messages[] }`

## LinksBackend

Purpose:
- Fetch image links, YouTube links, and Shaalaa links

Endpoints:
- `/imglinks?query=...`
- `/ytlinks?std=...&query=...`
- `/shaalaalinks?std=...&query=...`

Notes:
- DuckDuckGo image search is primary
- Wikimedia fallback used if DDGS returns < 3 results

## Knowledge Graphs

Stored in `knowledgegraphs` collection

Used for:
- Concept map visualization (`KnowledgeGraphPage`)
- Gap analysis (`/api/knowledge-graph/gaps`)
- Diagram fetching (`/api/knowledge-graph/diagrams`)

## Auth + Gamification

- JWT auth in backend, stored in localStorage
- Achievement progress tracked in MongoDB
- Star level progression: capped by quiz count

## Known risks / maintenance notes

- LinksBackend can be rate-limited by DDGS and blocked by some hosts
- ChromaBackend is legacy and unused
- Seeded videos can go stale; LinksBackend provides fresher alternatives

## Repo layout

```
frontend/        # React UI
backend/         # Node/Express API
LinksBackend/    # FastAPI
chroma-backend/  # legacy service
render.yaml      # Render blueprint
```
