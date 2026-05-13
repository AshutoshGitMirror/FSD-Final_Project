const mongoose = require('mongoose');

const CurriculumSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  std: { type: Number, required: true },
  board: { type: String, required: true },
  chapters: [
    {
      chapterName: { type: String, required: true },
      description: { type: String }
    }
  ]
}, { timestamps: true });

CurriculumSchema.index({ std: 1, board: 1 });
CurriculumSchema.index({ std: 1, board: 1, subjectName: 1 }, { unique: true });

module.exports = mongoose.model('Curriculum', CurriculumSchema);
