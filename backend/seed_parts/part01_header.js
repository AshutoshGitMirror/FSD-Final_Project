// ═══════════════════════════════════════════════════════════════
// COMPREHENSIVE NCERT/CBSE CURRICULUM SEEDER — Classes 1–12
// Source: Official NCERT textbooks (ncert.nic.in) & CBSE Syllabus 2025-26
// ═══════════════════════════════════════════════════════════════
const mongoose = require('mongoose');
require('dotenv').config();

const Curriculum = require('./models/Curriculum');
const Quiz = require('./models/Quiz');
const KnowledgeGraph = require('./models/KnowledgeGraph');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

// Helper: upsert a curriculum entry
async function upsertCurriculum(entry) {
  await Curriculum.findOneAndUpdate(
    { subjectName: entry.subjectName, std: entry.std, board: entry.board },
    entry,
    { upsert: true, new: true }
  );
}

// Helper: upsert a quiz entry
async function upsertQuiz(entry) {
  await Quiz.findOneAndUpdate(
    { subjectName: entry.subjectName, chapterName: entry.chapterName },
    entry,
    { upsert: true, new: true }
  );
}

// Helper: upsert a knowledge graph entry
async function upsertGraph(entry) {
  await KnowledgeGraph.findOneAndUpdate(
    { subjectName: entry.subjectName, std: entry.std, board: entry.board },
    entry,
    { upsert: true, new: true }
  );
}

async function seedAll() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB for curriculum seeding');

  const BOARD = 'CBSE';

