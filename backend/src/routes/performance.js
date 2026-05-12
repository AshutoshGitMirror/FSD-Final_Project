const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getLevel, getAllLevels } = require('../services/performanceService');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const levels = await getAllLevels(req.user.userId);
    res.json(levels);
  } catch (err) {
    console.error('Performance fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch performance data' });
  }
});

router.get('/:subject', async (req, res) => {
  try {
    const level = await getLevel(req.user.userId, req.params.subject);
    res.json(level);
  } catch (err) {
    console.error('Performance fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch performance data' });
  }
});

module.exports = router;
