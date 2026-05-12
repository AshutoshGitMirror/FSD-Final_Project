const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Progress = require('../models/Progress');
const Feedback = require('../models/Feedback');
const SavedLinks = require('../models/SavedLinks');
const SpacedRepetition = require('../models/SpacedRepetition');
const FlaggedContent = require('../models/FlaggedContent');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/export', async (req, res) => {
  try {
    const userId = req.user.userId;
    const [user, progress, feedback, links, sr] = await Promise.all([
      User.findById(userId).select('-password'),
      Progress.find({ userId }).lean(),
      Feedback.find({ userId }).lean(),
      SavedLinks.find({ userId }).lean(),
      SpacedRepetition.find({ userId }).lean()
    ]);

    res.json({
      exportedAt: new Date().toISOString(),
      user: user ? { fullName: user.fullName, email: user.email, std: user.std, board: user.board, role: user.role } : null,
      progress,
      feedback,
      savedLinks: links,
      spacedRepetition: sr
    });
  } catch (err) {
    console.error('Data export error:', err);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

router.post('/delete-account', async (req, res) => {
  try {
    const userId = req.user.userId;

    await Promise.all([
      User.findByIdAndDelete(userId),
      Progress.deleteMany({ userId }),
      Feedback.deleteMany({ userId }),
      SavedLinks.deleteMany({ userId }),
      SpacedRepetition.deleteMany({ userId }),
      FlaggedContent.deleteMany({ userId })
    ]);

    res.json({ message: 'Account and all associated data deleted successfully' });
  } catch (err) {
    console.error('Account deletion error:', err);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

module.exports = router;
