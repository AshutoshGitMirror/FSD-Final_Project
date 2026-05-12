const express = require('express');
const router = express.Router();
const Curriculum = require('../models/Curriculum');

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

module.exports = router;
