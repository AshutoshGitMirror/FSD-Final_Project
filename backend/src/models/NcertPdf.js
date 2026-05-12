const mongoose = require('mongoose');

const NcertPdfSchema = new mongoose.Schema({
  std: { type: Number, required: true },
  board: { type: String, required: true },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  ncertUrl: { type: String, required: true },
  language: { type: String, default: 'en' }
}, { timestamps: true });

NcertPdfSchema.index({ std: 1, board: 1, subjectName: 1, chapterName: 1 }, { unique: true });

module.exports = mongoose.model('NcertPdf', NcertPdfSchema);
