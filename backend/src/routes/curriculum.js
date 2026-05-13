const express = require('express');
const router = express.Router();
const Curriculum = require('../models/Curriculum');
const KnowledgeGraph = require('../models/KnowledgeGraph');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { std, board } = req.query;
    
    let query = {};
    if (std) {
      const stdNum = Number(std);
      if (isNaN(stdNum) || !Number.isInteger(stdNum) || stdNum < 1 || stdNum > 12) {
        return res.status(400).json({ error: 'Invalid std parameter. Must be between 1 and 12.' });
      }
      query.std = stdNum;
    }
    if (board) {
      const allowedBoards = ['CBSE', 'ICSE', 'IB', 'State Board'];
      if (!allowedBoards.includes(board)) {
        return res.status(400).json({ error: 'Invalid board parameter.' });
      }
      query.board = board;
    }

    const curriculum = await Curriculum.find(query);
    
    res.json(curriculum);
  } catch (error) {
    console.error('Error fetching curriculum:', error);
    res.status(500).json({ error: 'Server error fetching curriculum' });
  }
});

// ── Adaptive curriculum: filtered by student's star level ──
router.get('/adaptive', authMiddleware, async (req, res) => {
  try {
    const { subject } = req.query;
    const std = req.user.std;
    const board = req.user.board;
    const userId = req.user.userId;

    if (!subject) {
      return res.status(400).json({ error: 'subject query param is required' });
    }

    // 1. Get student's star level for this subject
    const { getLevel } = require('../services/performanceService');
    const level = await getLevel(userId, subject);
    const starLevel = level.starLevel;

    // 2. Get curriculum chapters
    const curriculum = await Curriculum.findOne({ std, board, subjectName: subject });
    if (!curriculum) {
      return res.json({ chapters: [], starLevel, starName: level.starName });
    }

    // 3. Get knowledge graph for minStarLevel mapping
    const graph = await KnowledgeGraph.findOne({ std, board, subjectName: subject });
    const chapterMap = {};
    if (graph && graph.nodes) {
      graph.nodes.forEach(n => {
        chapterMap[n.chapterName] = n.minStarLevel || 1;
      });
    }

    // 4. Build adaptive chapter list
    const chapters = curriculum.chapters.map((ch, idx) => {
      const minStar = chapterMap[ch.chapterName] || Math.max(1, Math.min(5, Math.ceil((idx + 1) / curriculum.chapters.length * 5)));
      const diff = starLevel - minStar;
      let status;
      if (diff >= 2) status = 'mastered';
      else if (diff >= 0) status = 'ready';
      else if (diff === -1) status = 'challenge';
      else status = 'locked';

      return {
        ...ch.toObject(),
        minStarLevel: minStar,
        status,
        unlocked: diff >= -1
      };
    });

    res.json({ chapters, starLevel, starName: level.starName });
  } catch (err) {
    console.error('Adaptive curriculum error:', err);
    res.status(500).json({ error: 'Failed to load adaptive curriculum' });
  }
});

module.exports = router;
