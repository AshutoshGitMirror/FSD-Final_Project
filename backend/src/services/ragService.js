const NcertContent = require('../models/NcertContent');
const NcertPdf = require('../models/NcertPdf');

const esc = (s) => String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function buildContext({ std, board, subject, chapter }) {
  if (!subject && !chapter) return null;

  const query = {};
  if (std) query.std = Number(std);
  if (board) query.board = board;
  if (subject) query.subjectName = { $regex: new RegExp('^' + esc(subject) + '$', 'i') };

  try {
    let ncert = null;

    // 1. First try exact/regex match on chapterName directly
    if (chapter) {
      ncert = await NcertContent.findOne({
        ...query,
        chapterName: { $regex: new RegExp('^' + esc(chapter) + '$', 'i') }
      });
    }

    // 2. If not found, check if we can map via NcertPdf URL to find the chapter number
    if (!ncert && std && subject && chapter) {
      const pdf = await NcertPdf.findOne({
        std: Number(std),
        subjectName: { $regex: new RegExp('^' + esc(subject) + '$', 'i') },
        chapterName: { $regex: new RegExp('^' + esc(chapter) + '$', 'i') }
      });

      if (pdf?.ncertUrl) {
        const match = pdf.ncertUrl.match(/(\d{2})\.pdf$/i);
        if (match) {
          const chapterNum = parseInt(match[1], 10);
          if (!Number.isNaN(chapterNum)) {
            // Try looking up 'Chapter N' or 'Chapter 0N'
            ncert = await NcertContent.findOne({
              ...query,
              chapterName: { $regex: new RegExp(`^Chapter\\s*0*${chapterNum}$`, 'i') }
            });

            if (!ncert) {
              ncert = await NcertContent.findOne({
                ...query,
                chapterName: { $regex: new RegExp(`^Chapter\\s*${chapterNum}`, 'i') }
              });
            }
          }
        }
      }
    }

    // 3. Fallback: if still not found, try finding any chapter whose name contains the requested string
    if (!ncert && chapter) {
      ncert = await NcertContent.findOne({
        ...query,
        chapterName: { $regex: new RegExp(esc(chapter), 'i') }
      });
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
