const leaderboardService = require('../services/leaderboardService');

const listLeaderboard = async (req, res) => {
  try {
    const leaders = await leaderboardService.getLeaderboardForClass(req.query);
    res.json(leaders);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.statusCode ? error.message : 'Failed to fetch leaderboard'
    });
  }
};

module.exports = {
  listLeaderboard
};
