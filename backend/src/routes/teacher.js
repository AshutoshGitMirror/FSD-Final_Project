const express = require('express');
const router = express.Router();
const FlaggedContent = require('../models/FlaggedContent');
const authMiddleware = require('../middleware/auth');
const { requireRole } = require('../middleware/auth');

router.use(authMiddleware);
router.use(requireRole('teacher', 'admin'));

router.get('/flagged', async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const items = await FlaggedContent.find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('userId', 'fullName email std');
    res.json(items);
  } catch (err) {
    console.error('Flagged content fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch flagged content' });
  }
});

router.patch('/flagged/:id/review', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['reviewed', 'dismissed'].includes(status)) {
      return res.status(400).json({ error: 'Status must be "reviewed" or "dismissed"' });
    }
    const item = await FlaggedContent.findByIdAndUpdate(
      req.params.id,
      { status, reviewedBy: req.user.userId, reviewedAt: new Date() },
      { returnDocument: 'after' }
    );
    if (!item) return res.status(404).json({ error: 'Flagged content not found' });
    res.json(item);
  } catch (err) {
    console.error('Flagged content update error:', err);
    res.status(500).json({ error: 'Failed to update flagged content' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const [open, reviewed, dismissed] = await Promise.all([
      FlaggedContent.countDocuments({ status: 'open' }),
      FlaggedContent.countDocuments({ status: 'reviewed' }),
      FlaggedContent.countDocuments({ status: 'dismissed' })
    ]);
    res.json({ open, reviewed, dismissed, total: open + reviewed + dismissed });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
