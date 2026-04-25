const express = require('express');
const router = express.Router();
const KnowledgeGraph = require('../models/KnowledgeGraph');
const Progress = require('../models/Progress');
const authMiddleware = require('../middleware/auth');

// ── GET knowledge graph for a subject ──────────────────────────
router.get('/', async (req, res) => {
  try {
    const { std, board, subject } = req.query;
    if (!std || !board || !subject) {
      return res.status(400).json({ error: 'std, board, and subject are required' });
    }

    const graph = await KnowledgeGraph.findOne({
      std: Number(std),
      board,
      subjectName: subject
    });

    if (!graph) {
      return res.json({ nodes: [], message: 'No knowledge graph found for this subject.' });
    }

    res.json(graph);
  } catch (err) {
    console.error('Knowledge Graph fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch knowledge graph' });
  }
});

// ── GET gap analysis for a user ────────────────────────────────
// Identifies weak prerequisite chains based on quiz scores
router.get('/gaps/:userId', authMiddleware, async (req, res) => {
  try {
    const { subject } = req.query;
    const userId = req.user.userId;

    if (!subject) {
      return res.status(400).json({ error: 'subject query param is required' });
    }

    // Get user's std and board from JWT
    const std = req.user.std;
    const board = req.user.board;

    // 1. Fetch the knowledge graph
    const graph = await KnowledgeGraph.findOne({ std, board, subjectName: subject });
    if (!graph) {
      return res.json({ gaps: [], message: 'No knowledge graph available.' });
    }

    // 2. Fetch user's progress for this subject
    const progressEntries = await Progress.find({ userId, subjectName: subject });
    const scoreMap = {};
    progressEntries.forEach(p => {
      const pct = p.totalQuestions > 0 ? (p.quizScore / p.totalQuestions) * 100 : 0;
      // Keep the latest/best score per chapter
      if (!scoreMap[p.chapterName] || pct > scoreMap[p.chapterName]) {
        scoreMap[p.chapterName] = pct;
      }
    });

    // 3. Identify weak chapters (score < 50% or unattempted)
    const weakChapters = [];
    const nodeMap = {};
    graph.nodes.forEach(node => { nodeMap[node.chapterName] = node; });

    graph.nodes.forEach(node => {
      const score = scoreMap[node.chapterName];
      if (score === undefined || score < 50) {
        weakChapters.push({
          chapterName: node.chapterName,
          score: score || 0,
          status: score === undefined ? 'unattempted' : 'weak',
          concepts: node.concepts,
          difficulty: node.difficulty
        });
      }
    });

    // 4. Trace prerequisite chains for weak chapters
    const gaps = [];
    const visited = new Set();

    function tracePrereqs(chapterName, chain = []) {
      if (visited.has(chapterName)) return;
      visited.add(chapterName);

      const node = nodeMap[chapterName];
      if (!node) return;

      const currentChain = [...chain, chapterName];

      if (node.prerequisites && node.prerequisites.length > 0) {
        node.prerequisites.forEach(prereq => {
          const prereqScore = scoreMap[prereq];
          if (prereqScore === undefined || prereqScore < 60) {
            gaps.push({
              weakChapter: currentChain[0],
              missingPrerequisite: prereq,
              prereqScore: prereqScore || 0,
              chain: currentChain,
              recommendation: `Master "${prereq}" before attempting "${currentChain[0]}"`
            });
            tracePrereqs(prereq, currentChain);
          }
        });
      }
    }

    weakChapters.forEach(wc => tracePrereqs(wc.chapterName));

    res.json({
      weakChapters,
      prerequisiteGaps: gaps,
      totalNodes: graph.nodes.length,
      masteredNodes: graph.nodes.filter(n => (scoreMap[n.chapterName] || 0) >= 70).length
    });
  } catch (err) {
    console.error('Gap analysis error:', err);
    res.status(500).json({ error: 'Failed to perform gap analysis' });
  }
});

// ── GET all available subjects for knowledge graphs ────────────
router.get('/subjects', async (req, res) => {
  try {
    const { std, board } = req.query;
    if (!std || !board) {
      return res.status(400).json({ error: 'std and board are required' });
    }

    const graphs = await KnowledgeGraph.find(
      { std: Number(std), board },
      { subjectName: 1, _id: 0 }
    );

    res.json(graphs.map(g => g.subjectName));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

module.exports = router;
