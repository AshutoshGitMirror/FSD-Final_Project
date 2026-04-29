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
});

module.exports = mongoose.model('Curriculum', CurriculumSchema);
