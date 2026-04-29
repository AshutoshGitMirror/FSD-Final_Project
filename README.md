# FSD Final Project (3-Service Deployment)

This repo is prepared to deploy:

1. `frontend` (Vite React static site)
2. `backend` (Node/Express API via `server_extended.js`)
3. `LinksBackend` (FastAPI service)

## One-click-ish on Render (free plan)

1. Push this repo to GitHub.
2. In Render, create a **Blueprint** from this repo (`render.yaml` is included).
3. Set required backend environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEYS` (comma-separated)
4. After backend and links services are created, set frontend env vars:
   - `VITE_BACKEND_URL=https://<backend-service>.onrender.com`
   - `VITE_LINKS_URL=https://<links-service>.onrender.com`
5. Trigger a frontend redeploy.

## Local development

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run start
```

### Links backend

```bash
cd LinksBackend
python3 -m venv .venv
source .venv/bin/activate
pip install .
uvicorn main:app --host 0.0.0.0 --port 8080
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
