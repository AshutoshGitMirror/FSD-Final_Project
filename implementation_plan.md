# Educational Web App - Implementation Plan

## Goal Description
Build a Neubrutalism-styled educational web application using React, TailwindCSS, Redux, Node.js, and MongoDB. Features include AI-driven learning (with Gemini), subject-wise quizzes, progress tracking, and an overall leaderboard.

## User Review Required
> [!IMPORTANT]
> - Please verify the simplified **Database Schema** below. Does it capture everything you need for User, Progress, and Leaderboard?
> - Let me know when you insert your Google Gemini API key into the `.env` file of the Node backend (after we initialize it).
> - I have kept the implementation plan short as requested. Once you approve, I will proceed to Phase 1.

## Database Schema (MongoDB / Mongoose)
**1. User Schema**
- `fullName` (String), `email` (String, Unique), `password` (String, Hashed)
- `std` (Number, e.g., 9 or 10), `board` (String, e.g., CBSE, ICSE)
- `createdAt`, `updatedAt`

**2. Curriculum Schema (Seeded Data)**
- `subjectName` (String), `std` (Number), `board` (String)
- `chapters` (Array of `{ chapterName, description }`)

**3. Progress Schema**
- `userId` (ObjectId/Ref: User), `subjectName` (String), `chapterName` (String)
- `quizScore` (Number), `totalQuestions` (Number), `isCompleted` (Boolean)

**4. Leaderboard Schema**
- `userId` (ObjectId/Ref: User)
- `averageScore` (Number), `totalChaptersCompleted` (Number)

**5. Saved Links Schema**
- `userId` (ObjectId/Ref: User)
- `url` (String), `title` (String), `source` (Enum: `youtube`, `shaalaa`)

## Proposed Architecture

**Frontend** (React, Router, Tailwind, Redux):
- `/` -> Landing page (matching provided neubrutalism design)
- `/login`, `/signup` -> Auth pages
- `/dashboard`
  - `/topic` -> Subject selection -> Chapter selection
  - `/learn/:subject/:chapter` -> Discussion area. Hits Gemini API to answer queries based on the chapter. UI includes special chat input: **Speech-to-Text**, **Submit**, **Thinking Toggle**, and **YT/Shaalaa Toggle**. Hits `/imglinks` to provide visual context per chat.
  - `/quiz/:subject/:chapter` -> Take a quiz to evaluate knowledge. Logs output to Progress.
  - `/progress` -> Visualizes chapter completions and graphs subject marks. Uses AI for insights.
  - `/saved-links` -> Displays saved YT or Shaalaa URLs.
  - `/leaderboard` -> Average score comparisons across peers.

**Backend** (Node.js, Express):
- Setup `API` endpoints matching the frontend logic (Auth, Chat via Gemini, Quiz grading, Progress, and Leaderboard fetchers).

**Secondary LinksBackend (Python FastAPI)**:
- Modified to dynamically demand `std` instead of a hardcoded default. Endpoints: `/ytlinks`, `/shaalaalinks`, `/imglinks`.

## Verification Plan
### Manual Verification
- Test User SignUp properly stores standard (`std`) and `board`.
- Ensure Gemini chat renders cleanly within the Neubrutalism UI style and features working toggles.
- Validate that the leaderboard correctly aggregates progress data.
