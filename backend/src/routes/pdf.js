const express = require('express');
const router = express.Router();
const NcertPdf = require('../models/NcertPdf');

const ALLOWED_PDF_DOMAINS = ['ncert.nic.in'];

function isAllowedPdfUrl(urlString) {
  try {
    const url = new URL(urlString);
    if (url.protocol !== 'https:') return false;
    return ALLOWED_PDF_DOMAINS.some(domain => url.hostname === domain || url.hostname.endsWith('.' + domain));
  } catch {
    return false;
  }
}

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
    if (!isAllowedPdfUrl(url)) {
      return res.status(403).json({ error: 'URL not allowed' });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch PDF from NCERT' });
    }

    const contentLength = parseInt(response.headers.get('content-length') || '0', 10);
    if (contentLength > 50 * 1024 * 1024) {
      return res.status(413).json({ error: 'PDF too large' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    res.setHeader('Cache-Control', 'public, max-age=86400');

    response.body.pipe(res);
  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'PDF fetch timed out' });
    }
    console.error('PDF proxy error:', err);
    res.status(502).json({ error: 'Failed to proxy PDF from NCERT' });
  }
});

module.exports = router;
