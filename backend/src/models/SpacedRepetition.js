const mongoose = require('mongoose');

const SpacedRepetitionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  concept: { type: String, required: true },         // Specific concept being tracked
  easeFactor: { type: Number, default: 2.5 },        // SM-2 ease factor (min 1.3)
  interval: { type: Number, default: 1 },            // Days until next review
  repetitions: { type: Number, default: 0 },         // Number of successful reviews
  nextReviewDate: { type: Date, required: true },     // When to review next
  lastReviewDate: { type: Date },
  lastScore: { type: Number, default: 0 }            // 0-5 quality rating from last review
}, { timestamps: true });

// One entry per user+concept
SpacedRepetitionSchema.index({ userId: 1, subjectName: 1, chapterName: 1, concept: 1 }, { unique: true });

// Fast lookup for due reviews
SpacedRepetitionSchema.index({ userId: 1, nextReviewDate: 1 });

module.exports = mongoose.model('SpacedRepetition', SpacedRepetitionSchema);
