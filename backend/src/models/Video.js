const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  std: { type: Number, required: true },
  board: { type: String, required: true },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  conceptName: { type: String },
  youtubeUrl: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String },
  description: { type: String },
  language: { type: String, default: 'en' }
}, { timestamps: true });

VideoSchema.index({ std: 1, board: 1, subjectName: 1, chapterName: 1 });
VideoSchema.index({ conceptName: 1 });

module.exports = mongoose.model('Video', VideoSchema);
