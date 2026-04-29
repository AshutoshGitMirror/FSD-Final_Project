/**
 * Extended Server Entry Point
 * 
 * This file wraps the original server.js setup and adds the new
 * Knowledge Graph and Spaced Repetition routes.
 * 
 * Run with: node server_extended.js
 * (instead of: node server.js)
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB via Mongoose (Extended Server)'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// ── Original Routes (same as server.js) ──────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/curriculum', require('./routes/curriculum'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/links', require('./routes/links'));
app.use('/api/quiz', require('./routes/quiz'));

// ── NEW Routes ───────────────────────────────────────────────
app.use('/api/knowledge-graph', require('./routes/knowledgeGraph'));
app.use('/api/spaced-repetition', require('./routes/spacedRepetition'));
app.use('/api/feynman', require('./routes/feynman'));

app.get('/', (req, res) => {
  res.send('AI Tutor Backend (Extended) is running with Knowledge Graph + Spaced Repetition!');
});

app.listen(PORT, () => {
  console.log(`🚀 Extended Server listening on port ${PORT}`);
  console.log(`   📊 Knowledge Graph API: /api/knowledge-graph`);
  console.log(`   🔄 Spaced Repetition API: /api/spaced-repetition`);
});
