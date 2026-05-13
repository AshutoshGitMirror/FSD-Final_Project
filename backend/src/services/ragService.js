const NcertContent = require('../models/NcertContent');
const NcertPdf = require('../models/NcertPdf');

const esc = (s) => String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function buildContext({ std, board, subject, chapter }) {
  if (!subject && !chapter) return null;

  const query = {};
  if (std) query.std = Number(std);
  if (board) query.board = board;
  if (subject) query.subjectName = { $regex: new RegExp('^' + esc(subject) + '$', 'i') };
  if (chapter) query.chapterName = { $regex: new RegExp('^' + esc(chapter) + '$', 'i') };

  try {
    let ncert = await NcertContent.findOne(query);
    if (!ncert && std && board && subject && chapter) {
      const pdf = await NcertPdf.findOne({
        std: Number(std),
        board,
        subjectName: { $regex: new RegExp('^' + esc(subject) + '$', 'i') },
        chapterName: { $regex: new RegExp('^' + esc(chapter) + '$', 'i') }
      });
      if (pdf?.ncertUrl) {
        const match = pdf.ncertUrl.match(/(\d{2})\.pdf$/i);
        if (match) {
          const chapterNum = parseInt(match[1], 10);
          if (!Number.isNaN(chapterNum)) {
            ncert = await NcertContent.findOne({
              std: Number(std),
              board,
              subjectName: { $regex: new RegExp('^' + esc(subject) + '$', 'i') },
              chapterName: `Chapter ${chapterNum}`
            });
          }
        }
      }
    }
    if (!ncert || !ncert.content) return null;

    const context = `Here is the NCERT textbook content for ${ncert.subjectName} - ${ncert.chapterName}:\n\n${ncert.content}`;

    return { context, source: ncert.subjectName, chapter: ncert.chapterName };
  } catch (err) {
    console.warn('NcertContent lookup failed:', err.message);
    return null;
  }
}

async function health() {
  try {
    const count = await NcertContent.countDocuments();
    return { ok: true, documents: count };
  } catch {
    return { ok: false, documents: 0 };
  }
}

module.exports = { buildContext, health };
