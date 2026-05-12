const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

router.get('/', async (req, res) => {
  try {
    const { std, subject, chapter, concept } = req.query;
    const query = {};
    if (std) query.std = Number(std);
    if (subject) query.subjectName = { $regex: new RegExp(`^${subject}$`, 'i') };
    if (chapter) query.chapterName = { $regex: new RegExp(`^${chapter}$`, 'i') };
    if (concept) query.conceptName = { $regex: concept, $options: 'i' };

    const videos = await Video.find(query).sort({ createdAt: -1 }).limit(10);
    res.json(videos);
  } catch (err) {
    console.error('Video fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

module.exports = router;
