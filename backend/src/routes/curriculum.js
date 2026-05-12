const express = require('express');
const router = express.Router();
const Curriculum = require('../models/Curriculum');

router.get('/', async (req, res) => {
  try {
    const { std, board } = req.query;
    
    let query = {};
    if (std) query.std = Number(std); // Ensure it's a number for MongoDB query
    if (board) query.board = board;

    const curriculum = await Curriculum.find(query);
    
    // Do NOT return hardcoded std-10 data if not found. 
    // Return empty array so frontend can show "Empty" state.
    res.json(curriculum);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching curriculum' });
  }
});

module.exports = router;
