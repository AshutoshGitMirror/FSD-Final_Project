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
      subjectName: { $regex: new RegExp(`^${subject}$`, 'i') },
      chapterName: { $regex: new RegExp(`^${chapter}$`, 'i') }
    });

    if (!pdf) {
      return res.status(404).json({ error: 'No PDF found for this chapter' });
    }

    res.json(pdf);
  } catch (err) {
    console.error('PDF lookup error:', err);
    res.status(500).json({ error: 'Failed to fetch PDF info' });
  }
});

router.get('/proxy', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'url is required' });

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch PDF from NCERT' });
    }

    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error('PDF proxy error:', err);
    res.status(502).json({ error: 'Failed to proxy PDF from NCERT' });
  }
});

module.exports = router;
