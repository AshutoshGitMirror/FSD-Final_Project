const mongoose = require('mongoose');

const KnowledgeGraphSchema = new mongoose.Schema({
  std: { type: Number, required: true },
  board: { type: String, required: true },
  subjectName: { type: String, required: true },
  nodes: [
    {
      chapterName: { type: String, required: true },
      concepts: [{ type: String }],           // Key concepts in this chapter
      prerequisites: [{ type: String }],       // chapterNames that must be learned first
      difficulty: { type: Number, default: 3 } // 1-5 scale
    }
  ]
}, { timestamps: true });

// One graph per subject+std+board
KnowledgeGraphSchema.index({ std: 1, board: 1, subjectName: 1 }, { unique: true });

module.exports = mongoose.model('KnowledgeGraph', KnowledgeGraphSchema);
