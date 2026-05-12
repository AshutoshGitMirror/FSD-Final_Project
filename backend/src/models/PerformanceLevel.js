const mongoose = require('mongoose');

const PerformanceLevelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subjectName: { type: String, required: true },
  starLevel: { type: Number, default: 1, min: 1, max: 5 },
  confidence: { type: Number, default: 0.5, min: 0, max: 1 },
  totalQuizzes: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  levelHistory: [{
    fromLevel: Number,
    toLevel: Number,
    reason: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

PerformanceLevelSchema.index({ userId: 1, subjectName: 1 }, { unique: true });

module.exports = mongoose.model('PerformanceLevel', PerformanceLevelSchema);
