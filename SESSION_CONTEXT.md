# TISD Platform — Architecture & Context Summary

## Deployment
- **Frontend**: https://fsd-final-frontend-7kof.onrender.com
- **Backend**: https://fsd-final-backend-2acz.onrender.com  
- **LinksBackend**: https://fsd-final-linksbackend.onrender.com
- **ChromaBackend**: https://fsd-final-chroma-backend.onrender.com (mostly unused now)
- **GitHub**: https://github.com/AshutoshGitMirror/FSD-Final_Project
- **Branch**: `fix/coderabbit-issues` → merge to `master`
- **Render API Key**: `rnd_y9mwQOuflHYG6J0Q6Bj9YG6HwgqH`
- **GitHub Key**: `$GITHUB_KEY` (40-char, available in env)
- **MongoDB**: `mongodb+srv://ashutoshsononey_db_user:DgM8kM2abrWYYQ2X@cluster0.8lksgwb.mongodb.net/aitutor`

## Architecture

### Frontend (React + Vite + Tailwind + DaisyUI)
- **`App.jsx`**: Routes → `/`, `/login`, `/signup`, `/onboarding`, `/ethics`, `/dashboard/*`, `*` (404)
- **`DashboardExtended.jsx`**: Authenticated layout → sidebar + bottom nav + page transitions
- **`MobileNavigation.jsx`**: 5-tab bottom nav + hamburger drawer
- **`ToastContainer.jsx`**: Global toast notifications (XP, achievements, success)
- **`ErrorBoundary.jsx`**: Catches crashes → friendly recovery screen
- **`LevelUpCelebration.jsx`**: Full-screen confetti + emoji rain on star level up

### Pages
| Route | Component | Auth? |
|-------|-----------|-------|
| `/` | LandingPage | No |
| `/login` | LoginPage | No |
| `/signup` | SignupPage | No |
| `/onboarding` | OnboardingWizard | No |
| `/ethics` | EthicsPage | No |
| `/dashboard` | HomeHub | Yes |
| `/dashboard/topic` | TopicPage | Yes |
| `/dashboard/learn/:subj/:chap` | LearnPage | Yes |
| `/dashboard/quiz/:subj/:chap` | QuizPage | Yes |
| `/dashboard/quick-quiz` | QuickQuizPage | Yes |
| `/dashboard/review` | SpacedRepetitionPage | Yes |
| `/dashboard/progress` | ProgressPage | Yes |
| `/dashboard/achievements` | AchievementsPage | Yes |
| `/dashboard/concept-map` | KnowledgeGraphPage | Yes |
| `/dashboard/leaderboard` | LeaderboardPage | Yes |
| `/dashboard/saved-links` | SavedLinksPage | Yes |
| `/dashboard/profile` | ProfilePage | Yes |
| `/dashboard/teacher` | TeacherDashboard | Teacher role |
| `*` | NotFoundPage | No |

### Key UX Decisions
- **Design**: DaisyUI "bubbly" theme, purple/pink gradients, rounded-2xl everywhere
- **No neobrutalism**: Zero `border-4 border-black`, zero hard `shadow-[...]`
- **Touch targets**: All interactive elements min 44×44px
- **Mobile**: Bottom nav on mobile, sidebar on desktop
- **Page transitions**: framer-motion AnimatePresence
- **Progressive curriculum**: Star Level gates chapter access (1-5)

## Gamification System

### Star Levels (per-subject)
| Level | Name | Quizzes Needed |
|-------|------|---------------|
| 1 | 🌱 Sprout | 1 |
| 2 | 🌿 Learner | 2-3 |
| 3 | 🌳 Star | 4-5 |
| 4 | ⭐ Superstar | 6-7 |
| 5 | 👑 Genius | 8+ |

### Achievements (10 total)
First Quiz, Star Learner, Perfect Score, Streak Master (7d), Bookworm, Teacher, Explorer, Genius, Dedicated (20 quizzes), All-Rounder

### XP Earning
- Daily reward: 50-500 XP (scales with streak)
- Quiz completion: achievements + toasts
- SR review: +10 XP per concept

## NCERT Content RAG

### Architecture (No Chroma!)
```
LearnPage → chat.js → ragService → MongoDB (ncertcontents) → real NCERT text → AI prompt
```

### Stats
- **366 chapters** from 36 books across classes 1-10
- **14.9 MB** of real NCERT textbook text
- Extracted via `pdftotext` from official PDFs
- Full chapter text (no truncation) fed to AI
- Seeded locally (this machine can reach NCERT, Render cannot)

### Seed Scripts
| Script | What it does |
|--------|-------------|
| `backend/seed_ncert_content.js` | Downloads PDFs, extracts text, stores in MongoDB |
| `backend/seed_pdfs.js` | Seeds PDF metadata (URLs) for 366 chapters |
| `backend/seed_diagrams.js` | 14 concept diagrams (Mermaid) |
| `backend/seed_videos.js` | Educational YouTube links |
| `backend/seed_admin.js` | Default admin account |
| `backend/seed_star_levels.js` | Maps minStarLevel to KG chapters |

### Old ChromaDB (dead)
Chroma microservice was never seeded, 80MB model times out on free Render. Replaced with direct MongoDB text lookup. ChromaBackend still deployed but unused.

## PDF Viewer
- NCERT blocks cloud IPs (Render can't proxy PDFs)
- Solution: Open NCERT URL directly in new tab (user's browser can reach NCERT)
- `/api/pdf/proxy` → 301 redirects to direct NCERT URL
- PDF lookup accepts `board` param (defaults to CBSE)

## LinksBackend (Python/FastAPI)
- Probably spun down on free Render (idle timeout)
- CORS now restricted to allowed origins (was `*`)
- Async handlers now use `run_in_threadpool` for blocking calls

## Security Notes
- JWT stored in localStorage (acceptable for student project)
- Zod validation wired into auth routes
- JWT secret validated before signing
- Quiz API exposes `ans` field (acceptable — educational tool)
- Leaderboard is public (no auth)

## Known Issues / TODOs
1. ChromaBackend is dead code — should be cleaned up or removed
2. LinksBackend will spin down on Render free tier (idle timeout → slow first request)
3. Std 9 Math chapters 9-15 don't have chapter PDFs (NCERT rationalized them)
4. Some Social Studies PDFs for Std 9 don't exist as individual chapters
5. The app has no formal test suite
6. ESLint has 15 errors + 13 warnings (mostly react-hooks/exhaustive-deps)
7. README.md doesn't document chroma-backend service
8. User model has `std` max 12 but validate middleware caps at 10

## Seeded MongoDB Collections
| Collection | Records | Purpose |
|-----------|---------|---------|
| `curricula` | Full curriculum data | Chapter lists per subject |
| `ncertpdfs` | 366 | PDF metadata (URLs) |
| `ncertcontents` | 366+ | Full chapter text for RAG |
| `knowledgegraphs` | 55 subjects | Chapter prerequisite chains |
| `quizzes` | Full quiz bank | Chapter MCQ questions |
| `users` | Test accounts | Auth + profile |
| `performances` | Per-subject | Star Level tracking |
| `achievements` | Per-user | Achievement progress |
| `dailyrewards` | Per-user | Streak tracking |
| `feedbacks` | Per-message | User feedback ratings |
| `videos` | 13 | Educational YouTube links |
