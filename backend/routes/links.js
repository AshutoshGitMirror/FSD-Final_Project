const express = require('express');
const router = express.Router();
const SavedLinks = require('../models/SavedLinks');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// GET saved YT links for logged-in user only
router.get('/', async (req, res) => {
  try {
    const links = await SavedLinks.find({ userId: req.user.userId, source: 'youtube' });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch saved links' });
  }
});

// POST save a new link
router.post('/', async (req, res) => {
  try {
    const link = new SavedLinks({ ...req.body, userId: req.user.userId });
    await link.save();
    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save link' });
  }
});

module.exports = router;
