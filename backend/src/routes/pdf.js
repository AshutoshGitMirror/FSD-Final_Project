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

module.exports = router;
