const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const authMiddleware = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

router.use(authMiddleware);

router.post('/', validate(schemas.feedbackSchema), async (req, res) => {
  try {
    const feedback = await Feedback.create({
      userId: req.user.userId,
      ...req.body
    });
    res.status(201).json(feedback);
  } catch (err) {
    console.error('Feedback save error:', err);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

module.exports = router;
