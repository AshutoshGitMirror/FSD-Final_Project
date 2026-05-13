const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// GET Quiz questions for a specific chapter
router.get('/:subject/:chapter', async (req, res) => {
  try {
    const { subject, chapter } = req.params;
    
    const quiz = await Quiz.findOne({ 
      subjectName: subject, 
      chapterName: chapter 
    });

    if (!quiz) {
      console.warn(`Quiz not found for subject: ${subject}, chapter: ${chapter}`);
      return res.status(404).json({ error: 'Quiz not found for this chapter' });
    }

    res.json(quiz);
  } catch (err) {
    console.error('Quiz fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch quiz data' });
  }
});

module.exports = router;
