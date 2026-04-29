const express = require('express');
const router = express.Router();
const SpacedRepetition = require('../models/SpacedRepetition');
const KnowledgeGraph = require('../models/KnowledgeGraph');
const authMiddleware = require('../middleware/auth');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// All SR routes require authentication
router.use(authMiddleware);

// ── SM-2 Algorithm Implementation ─────────────────────────────
function calculateSM2(quality, repetitions, easeFactor, interval) {
  // quality: 0-5 (0-2 = fail, 3-5 = pass)
  let newEF = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEF < 1.3) newEF = 1.3;

  let newInterval, newReps;

  if (quality < 3) {
    // Failed — reset
    newReps = 0;
    newInterval = 1;
  } else {
    // Passed
    newReps = repetitions + 1;
    if (newReps === 1) {
      newInterval = 1;
    } else if (newReps === 2) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * newEF);
    }
  }

  return { easeFactor: newEF, interval: newInterval, repetitions: newReps };
}

// ── GET concepts due for review today ──────────────────────────
router.get('/due', async (req, res) => {
  try {
    const userId = req.user.userId;
    const now = new Date();

    const dueItems = await SpacedRepetition.find({
      userId,
      nextReviewDate: { $lte: now }
    }).sort({ nextReviewDate: 1 }).limit(50);

    // Group by subject for UI
    const grouped = {};
    dueItems.forEach(item => {
      if (!grouped[item.subjectName]) grouped[item.subjectName] = [];
      grouped[item.subjectName].push(item);
    });

    res.json({
      totalDue: dueItems.length,
      items: dueItems,
      bySubject: grouped
    });
  } catch (err) {
    console.error('SR due fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch due reviews' });
  }
});

// ── GET mastery stats for visualization ────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.userId;

    const allItems = await SpacedRepetition.find({ userId });

    // Calculate per-subject mastery
    const subjectStats = {};
    allItems.forEach(item => {
      if (!subjectStats[item.subjectName]) {
        subjectStats[item.subjectName] = {
          total: 0,
          mastered: 0, // repetitions >= 3 AND easeFactor > 2.0
          learning: 0, // repetitions > 0 AND < 3
          new: 0,      // repetitions === 0
          avgEaseFactor: 0,
          concepts: []
        };
      }
      const stat = subjectStats[item.subjectName];
      stat.total++;

      if (item.repetitions >= 3 && item.easeFactor > 2.0) {
        stat.mastered++;
      } else if (item.repetitions > 0) {
        stat.learning++;
      } else {
        stat.new++;
      }

      stat.avgEaseFactor += item.easeFactor;
      stat.concepts.push({
        concept: item.concept,
        chapter: item.chapterName,
        easeFactor: item.easeFactor,
        interval: item.interval,
        repetitions: item.repetitions,
        nextReview: item.nextReviewDate,
        lastScore: item.lastScore
      });
    });

    // Finalize averages
    Object.values(subjectStats).forEach(stat => {
      stat.avgEaseFactor = stat.total > 0
        ? Math.round((stat.avgEaseFactor / stat.total) * 100) / 100
        : 0;
    });

    // Calculate streak (consecutive days with at least one review)
    const reviewDates = allItems
      .filter(i => i.lastReviewDate)
      .map(i => i.lastReviewDate.toISOString().split('T')[0]);
    const uniqueDates = [...new Set(reviewDates)].sort().reverse();

    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    let checkDate = new Date();

    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (uniqueDates.includes(dateStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (dateStr === today) {
        // Today hasn't been reviewed yet, still continue checking yesterday
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    res.json({ subjectStats, streak, totalConcepts: allItems.length });
  } catch (err) {
    console.error('SR stats error:', err);
    res.status(500).json({ error: 'Failed to fetch SR stats' });
  }
});

// ── POST initialize SR entries after quiz completion ───────────
router.post('/init', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { subjectName, chapterName } = req.body;
    const std = req.user.std;
    const board = req.user.board;

    if (!subjectName || !chapterName) {
      return res.status(400).json({ error: 'subjectName and chapterName are required' });
    }

    // Get concepts from knowledge graph
    const graph = await KnowledgeGraph.findOne({ std, board, subjectName });
    let concepts = [];

    if (graph) {
      const node = graph.nodes.find(n => n.chapterName === chapterName);
      if (node && node.concepts.length > 0) {
        concepts = node.concepts;
      }
    }

    // If no concepts from graph, create generic ones from chapter name
    if (concepts.length === 0) {
      concepts = [
        `${chapterName} — Core Concepts`,
        `${chapterName} — Problem Solving`,
        `${chapterName} — Key Formulas & Definitions`
      ];
    }

    const now = new Date();

    // Upsert each concept
    const results = [];
    for (const concept of concepts) {
      const existing = await SpacedRepetition.findOne({ userId, subjectName, chapterName, concept });
      if (!existing) {
        const entry = new SpacedRepetition({
          userId,
          subjectName,
          chapterName,
          concept,
          nextReviewDate: now // Due immediately
        });
        await entry.save();
        results.push(entry);
      }
    }

    res.status(201).json({
      message: `Initialized ${results.length} concepts for spaced repetition`,
      newConcepts: results.length,
      totalConcepts: concepts.length
    });
  } catch (err) {
    console.error('SR init error:', err);
    res.status(500).json({ error: 'Failed to initialize spaced repetition' });
  }
});

// ── POST record a review result ────────────────────────────────
router.post('/review', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { conceptId, quality } = req.body; // quality: 0-5

    if (conceptId === undefined || quality === undefined) {
      return res.status(400).json({ error: 'conceptId and quality (0-5) are required' });
    }

    const qualityNum = Number(quality);
    if (qualityNum < 0 || qualityNum > 5) {
      return res.status(400).json({ error: 'quality must be between 0 and 5' });
    }

    const item = await SpacedRepetition.findOne({ _id: conceptId, userId });
    if (!item) {
      return res.status(404).json({ error: 'Concept not found' });
    }

    // Apply SM-2 algorithm
    const result = calculateSM2(qualityNum, item.repetitions, item.easeFactor, item.interval);

    const now = new Date();
    const nextReview = new Date(now.getTime() + result.interval * 24 * 60 * 60 * 1000);

    item.easeFactor = result.easeFactor;
    item.interval = result.interval;
    item.repetitions = result.repetitions;
    item.nextReviewDate = nextReview;
    item.lastReviewDate = now;
    item.lastScore = qualityNum;
    await item.save();

    res.json({
      message: qualityNum >= 3 ? 'Great recall!' : 'Needs more practice — review scheduled sooner.',
      nextReviewDate: nextReview,
      interval: result.interval,
      easeFactor: result.easeFactor,
      repetitions: result.repetitions
    });
  } catch (err) {
    console.error('SR review error:', err);
    res.status(500).json({ error: 'Failed to record review' });
  }
});

// ── POST generate a contextual review question via Gemini ──────
router.post('/generate-question', async (req, res) => {
  try {
    const { concept, subjectName, chapterName } = req.body;
    const std = req.user.std;

    if (!concept || !subjectName || !chapterName) {
      return res.status(400).json({ error: 'concept, subjectName, and chapterName are required' });
    }

    // ── Helper: pull a real MCQ from the Quiz DB ────────────────
    const Quiz = require('../models/Quiz');
    const getDbQuestion = async () => {
      const quiz = await Quiz.findOne({ subjectName, chapterName });
      if (quiz && quiz.questions && quiz.questions.length > 0) {
        const q = quiz.questions[Math.floor(Math.random() * quiz.questions.length)];
        return {
          question: q.q,
          options: q.options,
          correctIndex: q.ans,
          explanation: `The correct answer for "${concept}" is: ${q.options[q.ans]}`,
          type: 'mcq',
          fallback: true
        };
      }
      // Absolute last resort — try ANY quiz from same subject
      const anyQuiz = await Quiz.findOne({ subjectName });
      if (anyQuiz && anyQuiz.questions && anyQuiz.questions.length > 0) {
        const q = anyQuiz.questions[Math.floor(Math.random() * anyQuiz.questions.length)];
        return {
          question: q.q,
          options: q.options,
          correctIndex: q.ans,
          explanation: `The correct answer is: ${q.options[q.ans]}`,
          type: 'mcq',
          fallback: true
        };
      }
      return null;
    };

    // ── Try Gemini first ────────────────────────────────────────
    const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY;
    const apiKeys = (rawKeys || '').split(',').map(k => k.trim()).filter(Boolean);
    if (apiKeys.length > 0) {
      try {
        const { GoogleGenAI } = require('@google/genai');
        const ai = new GoogleGenAI({ apiKey: apiKeys[0] });

        const prompt = `You are creating a spaced repetition review question for a Class ${std} student studying ${subjectName}.

The specific concept to test is: "${concept}" from the chapter "${chapterName}".

Generate ONE multiple-choice question (MCQ) that tests the student's understanding of this concept from a DIFFERENT ANGLE than a typical textbook question. Make it application-based or scenario-based.

Respond in this exact JSON format (no markdown, no code blocks):
{"question": "...", "options": ["A", "B", "C", "D"], "correctIndex": 0, "explanation": "..."}

The question should be clear, age-appropriate for Class ${std}, and test genuine understanding, not rote memorization.`;

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt
        });
        
        const text = response.text.trim();
        const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleanText);

        return res.json({
          question: parsed.question,
          options: parsed.options,
          correctIndex: parsed.correctIndex,
          explanation: parsed.explanation,
          type: 'mcq',
          fallback: false
        });
      } catch (aiErr) {
        console.warn('Gemini failed, falling back to DB quiz:', aiErr.message);
      }
    }

    // ── Fallback: real quiz question from database ──────────────
    const dbQuestion = await getDbQuestion();
    if (dbQuestion) {
      return res.json(dbQuestion);
    }

    // Nothing at all — shouldn't happen if seeds ran
    res.json({
      question: `What do you know about "${concept}" in the context of ${chapterName}?`,
      type: 'open-ended',
      fallback: true
    });
  } catch (err) {
    console.error('SR question generation error:', err);
    res.status(500).json({ error: 'Failed to generate review question' });
  }
});

module.exports = router;
