const mongoose = require('mongoose');

const DailyRewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  currentStreak: { type: Number, default: 0 },
  lastClaimDate: { type: String },
  claimedDates: [{ type: String }],
  totalXpEarned: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('DailyReward', DailyRewardSchema);
