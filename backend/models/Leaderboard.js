const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  averageScore: { type: Number, default: 0 },
  totalChaptersCompleted: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
