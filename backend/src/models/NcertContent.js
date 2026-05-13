const mongoose = require('mongoose');

const NcertContentSchema = new mongoose.Schema({
  std: { type: Number, required: true },
  board: { type: String, required: true },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  content: { type: String, default: '' },
  summary: { type: String, default: '' },
  keyPoints: [{ type: String }]
}, { timestamps: true });

NcertContentSchema.index({ std: 1, board: 1, subjectName: 1, chapterName: 1 }, { unique: true });

module.exports = mongoose.model('NcertContent', NcertContentSchema, 'ncertcontents');
