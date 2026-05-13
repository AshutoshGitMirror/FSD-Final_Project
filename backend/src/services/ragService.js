const NcertContent = require('../models/NcertContent');

async function buildContext({ std, board, subject, chapter }) {
  if (!subject && !chapter) return null;

  const query = {};
  if (std) query.std = Number(std);
  if (board) query.board = board;
  if (subject) query.subjectName = { $regex: new RegExp('^' + subject.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') };
  if (chapter) query.chapterName = { $regex: new RegExp('^' + chapter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') };

  try {
    const ncert = await NcertContent.findOne(query);
    if (!ncert || !ncert.content) return null;

    let context = `Here is the NCERT textbook content for ${ncert.subjectName} - ${ncert.chapterName}:\n\n`;
    context += ncert.content.substring(0, 3000);

    if (ncert.keyPoints && ncert.keyPoints.length > 0) {
      context += `\n\nKey points:\n`;
      ncert.keyPoints.forEach((kp, i) => { context += `${i + 1}. ${kp}\n`; });
    }

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
