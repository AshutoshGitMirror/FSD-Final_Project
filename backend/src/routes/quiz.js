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
      // Return a default set of questions if none found, so the UI doesn't break
      return res.json({
        questions: [
          {
            q: `Welcome to the ${chapter} Quiz! Default questions are being loaded. What is the main topic?`,
            options: [`The topic is ${chapter}`, 'Not sure', 'Something else', 'None'],
            ans: 0
          }
        ]
      });
    }

    res.json(quiz);
  } catch (err) {
    console.error('Quiz fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch quiz data' });
  }
});

module.exports = router;
