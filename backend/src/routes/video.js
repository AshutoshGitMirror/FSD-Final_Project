const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

router.get('/', async (req, res) => {
  try {
    const { std, subject, chapter, concept } = req.query;
    const query = {};
    if (std) query.std = Number(std);
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (subject) query.subjectName = { $regex: new RegExp(`^${esc(subject)}$`, 'i') };
    if (chapter) query.chapterName = { $regex: new RegExp(`^${esc(chapter)}$`, 'i') };
    if (concept) query.conceptName = { $regex: esc(concept), $options: 'i' };

    const videos = await Video.find(query).sort({ createdAt: -1 }).limit(10);
    res.json(videos);
  } catch (err) {
    console.error('Video fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

module.exports = router;
