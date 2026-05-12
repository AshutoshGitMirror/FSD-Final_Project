const mongoose = require('mongoose');

const FlaggedContentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subjectName: { type: String },
  chapterName: { type: String },
  userQuery: { type: String },
  aiResponse: { type: String },
  reason: { type: String, enum: ['sensitive_topic', 'age_mismatch', 'user_flagged'], required: true },
  status: { type: String, enum: ['open', 'reviewed', 'dismissed'], default: 'open' },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: { type: Date }
}, { timestamps: true });

FlaggedContentSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('FlaggedContent', FlaggedContentSchema);
