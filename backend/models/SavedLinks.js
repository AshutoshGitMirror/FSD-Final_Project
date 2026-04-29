const mongoose = require('mongoose');

const SavedLinksSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  source: { type: String, enum: ['youtube', 'shaalaa'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('SavedLinks', SavedLinksSchema);
