const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messageId: { type: String, required: true },
  rating: { type: Number, required: true, enum: [-1, 0, 1] },
  confidence: { type: Number, min: 0, max: 100 },
  comment: { type: String, maxlength: 500 }
}, { timestamps: true });

FeedbackSchema.index({ userId: 1, messageId: 1 });

module.exports = mongoose.model('Feedback', FeedbackSchema);
