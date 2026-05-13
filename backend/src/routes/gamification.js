const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { checkAndAward, claimDailyReward, getUserAchievements, getGamificationDashboard, ACHIEVEMENTS } = require('../services/gamificationService');

router.use(authMiddleware);

router.get('/dashboard', async (req, res) => {
  try {
    const data = await getGamificationDashboard(req.user.userId);
    res.json(data);
  } catch (err) {
    console.error('Gamification dashboard error:', err);
    res.status(500).json({ error: 'Failed to load gamification data' });
  }
});

router.get('/achievements', async (req, res) => {
  try {
    const achievements = await getUserAchievements(req.user.userId);
    res.json(achievements);
  } catch (err) {
    console.error('Achievements fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

router.post('/claim-daily', async (req, res) => {
  try {
    const result = await claimDailyReward(req.user.userId);
    await checkAndAward(req.user.userId, 'streak_update', { streak: result.streak });
    res.json(result);
  } catch (err) {
    console.error('Daily reward claim error:', err);
    res.status(500).json({ error: 'Failed to claim daily reward' });
  }
});

router.post('/check', async (req, res) => {
  try {
    const { action, metadata } = req.body;
    if (!action) return res.status(400).json({ error: 'action is required' });
    const result = await checkAndAward(req.user.userId, action, metadata);
    res.json(result);
  } catch (err) {
    console.error('Achievement check error:', err);
    res.status(500).json({ error: 'Failed to check achievements' });
  }
});

module.exports = router;
