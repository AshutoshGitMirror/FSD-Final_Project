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
    const { url, title, source } = req.body || {};
    if (!url) {
      return res.status(400).json({ error: 'url is required' });
    }

    const normalizedSource = source === 'shaalaa' ? 'shaalaa' : 'youtube';
    const normalizedTitle =
      (title && String(title).trim()) ||
      (normalizedSource === 'youtube' ? 'YouTube Resource' : 'Shaalaa Resource');

    const existing = await SavedLinks.findOne({
      userId: req.user.userId,
      url,
      source: normalizedSource
    });
    if (existing) {
      return res.status(200).json(existing);
    }

    const link = new SavedLinks({
      userId: req.user.userId,
      url,
      title: normalizedTitle,
      source: normalizedSource
    });
    await link.save();
    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save link' });
  }
});

module.exports = router;
