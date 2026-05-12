const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

const getLeaderboardForClass = async ({ std, board }) => {
  if (!std || !board) {
    const error = new Error('Standard and Board are required for filtered leaderboard');
    error.statusCode = 400;
    throw error;
  }

  const matchingUsers = await User.find({ std: Number(std), board }).select('fullName _id');
  const userIds = matchingUsers.map(user => user._id);
  const leaderboardEntries = await Leaderboard.find({ userId: { $in: userIds } });

  return matchingUsers
    .map(user => {
      const entry = leaderboardEntries.find(item => item.userId.toString() === user._id.toString());
      return {
        userId: user._id,
        userName: user.fullName,
        averageScore: entry ? entry.averageScore : 0,
        totalChaptersCompleted: entry ? entry.totalChaptersCompleted : 0
      };
    })
    .sort((a, b) => b.averageScore - a.averageScore);
};

module.exports = {
  getLeaderboardForClass
};
