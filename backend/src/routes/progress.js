const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Leaderboard = require('../models/Leaderboard');
const authMiddleware = require('../middleware/auth');

// All progress routes require valid JWT
router.use(authMiddleware);

// GET progress for logged-in user only
router.get('/', async (req, res) => {
  try {
    const data = await Progress.find({ userId: req.user.userId });
    res.json(data);
  } catch (err) {
    console.error('Progress Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// POST new progress entry + UPDATE Leaderboard
router.post('/', async (req, res) => {
  try {
    const { subjectName, chapterName, quizScore, totalQuestions, isCompleted } = req.body;
    const userId = req.user.userId;

    // 1. Save the progress entry
    const entry = new Progress({ subjectName, chapterName, quizScore, totalQuestions, isCompleted, userId });
    await entry.save();

    // 2. Recalculate stats for Leaderboard
    const allProgress = await Progress.find({ userId });
    
    const validProgress = allProgress.filter(p => p.totalQuestions > 0);
    const totalPercentage = validProgress.reduce((sum, p) => {
      return sum + (p.quizScore / p.totalQuestions) * 100;
    }, 0);
    const averageScore = validProgress.length > 0 ? Math.round(totalPercentage / validProgress.length) : 0;

    // Count unique completed chapters
    const uniqueChapters = new Set(
      allProgress.filter(p => p.isCompleted).map(p => `${p.subjectName}-${p.chapterName}`)
    );
    const totalChaptersCompleted = uniqueChapters.size;

    // 3. Update or Create Leaderboard entry
    await Leaderboard.findOneAndUpdate(
      { userId },
      { averageScore, totalChaptersCompleted },
      { upsert: true, returnDocument: 'after' }
    );

    res.status(201).json(entry);
  } catch (err) {
    console.error('Progress/Leaderboard Update Error:', err);
    res.status(500).json({ error: 'Failed to save progress or update leaderboard' });
  }
});

module.exports = router;
