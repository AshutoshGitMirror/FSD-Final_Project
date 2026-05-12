# Repository Guidelines

## Project Structure & Module Organization
This repository contains three apps:
- `frontend/`: React + Vite client. Main code is in `frontend/src/` (`pages/`, `components/`, `utils/`), static assets in `frontend/public/` and `frontend/src/assets/`.
- `backend/`: Node/Express API with MongoDB. Entry point is `backend/server.js`, route handlers are in `backend/routes/`, schemas in `backend/models/`, and auth middleware in `backend/middleware/`.
- `LinksBackend/`: FastAPI content service. Entry point is `LinksBackend/main.py`; provider logic lives in `LinksBackend/Scripts/`.

## Build, Test, and Development Commands
Run commands from each service directory:
- Frontend: `npm install`, `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.
- Backend: `npm install`, `node server.js` (or `node server_extended.js` for the extended route set), `node seed.js` / `node seed_curriculum.js` for data seeding.
- LinksBackend: `uv sync`, `python main.py` (starts FastAPI on port `8080`).

## Coding Style & Naming Conventions
- JavaScript/JSX: follow existing style (semicolons, single quotes, concise functions, `camelCase` vars/functions, `PascalCase` React components).
- Python: PEP 8 style with 4-space indentation and `snake_case`.
- Keep route files focused by feature (`routes/chat.js`, `routes/quiz.js`) and align new models with singular names (`models/User.js`).
- Linting is currently configured in `frontend/eslint.config.js`; run `npm run lint` before opening a PR.

## Testing Guidelines
- There is no comprehensive automated suite yet.
- Frontend checks: run `npm run lint` and `npm run build` to catch regressions.
- Backend/LLM smoke scripts exist (`backend/test_gemini.js`, `backend/test_new_sdk.js`, `backend/test_sdk_thoughts.js`) and can be run with `node <script>` when relevant.
- Add new tests near the changed module and name them by feature (for example, `chat.route.test.js`).

## Commit & Pull Request Guidelines
- Keep commits small and scoped. Git history shows both conventional (`feat: ...`) and imperative styles (`Fix ...`); prefer `type: short summary` (e.g., `fix: handle empty quiz payload`).
- PRs should include: purpose, changed areas (`frontend`, `backend`, `LinksBackend`), local verification steps, and screenshots for UI changes.
- Link the related issue/task and call out any env/config additions (`MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `OLLAMA_URL`).
