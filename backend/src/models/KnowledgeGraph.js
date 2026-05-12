const mongoose = require('mongoose');

const KnowledgeGraphSchema = new mongoose.Schema({
  std: { type: Number, required: true },
  board: { type: String, required: true },
  subjectName: { type: String, required: true },
  nodes: [
    {
      chapterName: { type: String, required: true },
      concepts: [{ type: String }],
      prerequisites: [{ type: String }],
      difficulty: { type: Number, default: 3, min: 1, max: 5 }
    }
  ],
  conceptDiagrams: [{
    conceptName: { type: String, required: true },
    mermaidDefinition: { type: String, required: true },
    diagramType: { type: String, enum: ['flowchart', 'sequence', 'class', 'state', 'graph'], default: 'flowchart' },
    caption: { type: String }
  }]
}, { timestamps: true });

// One graph per subject+std+board
KnowledgeGraphSchema.index({ std: 1, board: 1, subjectName: 1 }, { unique: true });

module.exports = mongoose.model('KnowledgeGraph', KnowledgeGraphSchema);
