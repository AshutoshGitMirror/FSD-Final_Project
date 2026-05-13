const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  achievementId: { type: String, required: true },
  unlockedAt: { type: Date },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  maxProgress: { type: Number, default: 1 },
  metadata: { type: Object, default: {} }
}, { timestamps: true });

AchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
