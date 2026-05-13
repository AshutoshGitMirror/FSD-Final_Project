const express = require('express');
const router = express.Router();
const NcertPdf = require('../models/NcertPdf');

router.get('/', async (req, res) => {
  try {
    const { std, subject, chapter } = req.query;
    if (!std || !subject || !chapter) {
      return res.status(400).json({ error: 'std, subject, and chapter are required' });
    }

    const pdf = await NcertPdf.findOne({
      std: Number(std),
      board: 'CBSE',
      subjectName: { $regex: new RegExp('^' + subject.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') },
      chapterName: { $regex: new RegExp('^' + chapter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') }
    });

    if (!pdf) {
      return res.status(404).json({ error: 'No PDF found for this chapter' });
    }

    // Return the NCERT URL directly — cloud servers can't reach NCERT,
    // but the user's browser can open it just fine.
    res.json({
      ...pdf.toObject(),
      directUrl: pdf.ncertUrl
    });
  } catch (err) {
    console.error('PDF lookup error:', err);
    res.status(500).json({ error: 'Failed to fetch PDF info' });
  }
});

// Redirect proxy to direct NCERT URL (NCERT blocks cloud server connections)
router.get('/proxy', (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url is required' });
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'ncert.nic.in') {
      return res.status(403).json({ error: 'Only NCERT URLs are allowed' });
    }
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  res.redirect(301, url);
});

module.exports = router;
