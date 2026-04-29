const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  questions: [
    {
      q: { type: String, required: true },
      options: [{ type: String, required: true }],
      ans: { type: Number, required: true } // Index of correct option (0, 1, 2, 3)
    }
  ]
}, { timestamps: true });

// Ensure one quiz per chapter/subject
QuizSchema.index({ subjectName: 1, chapterName: 1 }, { unique: true });

module.exports = mongoose.model('Quiz', QuizSchema);
