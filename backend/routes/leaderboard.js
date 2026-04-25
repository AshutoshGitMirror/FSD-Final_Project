const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const { std, board } = req.query;
    if (!std || !board) {
      return res.status(400).json({ error: 'Standard and Board are required for filtered leaderboard' });
    }
    
    const stdNum = Number(std);
    const matchingUsers = await User.find({ std: stdNum, board }).select('fullName _id');
    const userIds = matchingUsers.map(u => u._id);

    // Fetch existing leaderboard entries
    const leaderboardEntries = await Leaderboard.find({ userId: { $in: userIds } });

    // Merge: All matching users must be in the list
    const enriched = matchingUsers.map(user => {
      const entry = leaderboardEntries.find(e => e.userId.toString() === user._id.toString());
      return {
        userId: user._id,
        userName: user.fullName,
        averageScore: entry ? entry.averageScore : 0,
        totalChaptersCompleted: entry ? entry.totalChaptersCompleted : 0
      };
    });

    // Sort by marks (averageScore) high to low
    enriched.sort((a, b) => b.averageScore - a.averageScore);

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
