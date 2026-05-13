const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const Progress = require('../models/Progress');
const Feedback = require('../models/Feedback');
const SavedLinks = require('../models/SavedLinks');
const SpacedRepetition = require('../models/SpacedRepetition');
const FlaggedContent = require('../models/FlaggedContent');
const Leaderboard = require('../models/Leaderboard');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/export', async (req, res) => {
  try {
    const userId = req.user.userId;
    const [user, progress, feedback, links, sr, leaderboard] = await Promise.all([
      User.findById(userId).select('-password'),
      Progress.find({ userId }).lean(),
      Feedback.find({ userId }).lean(),
      SavedLinks.find({ userId }).lean(),
      SpacedRepetition.find({ userId }).lean(),
      Leaderboard.find({ userId }).lean()
    ]);

    res.json({
      exportedAt: new Date().toISOString(),
      user: user ? { fullName: user.fullName, email: user.email, std: user.std, board: user.board, role: user.role } : null,
      progress,
      feedback,
      savedLinks: links,
      spacedRepetition: sr,
      leaderboard
    });
  } catch (err) {
    console.error('Data export error:', err);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

router.post('/delete-account', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required to delete account' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ error: 'Incorrect password' });
    }

    await Promise.all([
      User.findByIdAndDelete(userId),
      Progress.deleteMany({ userId }),
      Feedback.deleteMany({ userId }),
      SavedLinks.deleteMany({ userId }),
      SpacedRepetition.deleteMany({ userId }),
      FlaggedContent.deleteMany({ userId }),
      Leaderboard.deleteMany({ userId })
    ]);

    res.json({ message: 'Account and all associated data deleted successfully' });
  } catch (err) {
    console.error('Account deletion error:', err);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

module.exports = router;
