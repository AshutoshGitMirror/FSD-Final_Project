require('dotenv').config();
const mongoose = require('mongoose');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const NcertContent = require('./src/models/NcertContent');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';
const TMP_DIR = '/tmp/ncert_pdfs';
const NCERT_BASE = 'https://ncert.nic.in/textbook/pdf';

const PAD = (n) => String(n).padStart(2, '0');

// Verify NCERT chapter PDFs that actually return HTTP 200
const CHAPTERS = [
  // Class 10 Science
  { std: 10, subject: 'Science', chapter: 'Chemical Reactions and Equations', code: 'jesc1', ch: 1 },
  { std: 10, subject: 'Science', chapter: 'Acids Bases and Salts', code: 'jesc1', ch: 2 },
  { std: 10, subject: 'Science', chapter: 'Life Processes', code: 'jesc1', ch: 5 },
  { std: 10, subject: 'Science', chapter: 'Electricity', code: 'jesc1', ch: 11 },
  // Class 10 Math
  { std: 10, subject: 'Mathematics', chapter: 'Real Numbers', code: 'jemh1', ch: 1 },
  { std: 10, subject: 'Mathematics', chapter: 'Polynomials', code: 'jemh1', ch: 2 },
  { std: 10, subject: 'Mathematics', chapter: 'Introduction to Trigonometry', code: 'jemh1', ch: 8 },
  // Class 9 Science
  { std: 9, subject: 'Science', chapter: 'Matter in Our Surroundings', code: 'iesc1', ch: 1 },
  { std: 9, subject: 'Science', chapter: 'Motion', code: 'iesc1', ch: 8 },
  { std: 9, subject: 'Science', chapter: 'Force and Laws of Motion', code: 'iesc1', ch: 9 },
  // Class 9 Math
  { std: 9, subject: 'Mathematics', chapter: 'Number Systems', code: 'iemh1', ch: 1 },
  { std: 9, subject: 'Mathematics', chapter: 'Coordinate Geometry', code: 'iemh1', ch: 3 },
  { std: 9, subject: 'Mathematics', chapter: 'Probability', code: 'iemh1', ch: 15 },
  // Class 7 Science
  { std: 7, subject: 'Science', chapter: 'Nutrition in Plants', code: 'gesc1', ch: 1 },
  { std: 7, subject: 'Science', chapter: 'Heat', code: 'gesc1', ch: 4 },
  // Class 7 Math
  { std: 7, subject: 'Mathematics', chapter: 'Integers', code: 'gegp1', ch: 1 },
  { std: 7, subject: 'Mathematics', chapter: 'Fractions and Decimals', code: 'gegp1', ch: 2 },
];

async function downloadAndExtract() {
  // Ensure tmp dir
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB\n');

  for (const ch of CHAPTERS) {
    const url = `${NCERT_BASE}/${ch.code}${PAD(ch.ch)}.pdf`;
    const pdfPath = path.join(TMP_DIR, `${ch.std}_${ch.subject}_${ch.chapter.replace(/[^a-z0-9]/gi, '_')}.pdf`);
    const txtPath = pdfPath.replace('.pdf', '.txt');

    // Download the PDF
    try {
      console.log(`Downloading Std ${ch.std} ${ch.subject}: ${ch.chapter}...`);
      execSync(`curl -sL --max-time 30 "${url}" -o "${pdfPath}"`, { stdio: 'pipe' });
      const size = fs.statSync(pdfPath).size;
      if (size < 1000) { console.log(`  ⚠ Skipped: file too small (${size} bytes)`); continue; }
    } catch (err) {
      console.log(`  ⚠ Download failed: ${err.message}`);
      continue;
    }

    // Extract text using pdftotext
    try {
      execSync(`pdftotext -layout "${pdfPath}" "${txtPath}"`, { stdio: 'pipe' });
    } catch {
      console.log(`  ⚠ pdftotext failed`);
      continue;
    }

    // Read extracted text
    let content = '';
    try {
      content = fs.readFileSync(txtPath, 'utf-8').trim();
    } catch {
      console.log(`  ⚠ Failed to read extracted text`);
      continue;
    }

    if (content.length < 50) {
      console.log(`  ⚠ Extracted text too short (${content.length} chars)`);
      continue;
    }

    // Truncate to reasonable length for AI context
    const truncated = content.substring(0, 5000);

    // Upsert into MongoDB
    await NcertContent.findOneAndUpdate(
      { std: ch.std, board: 'CBSE', subjectName: ch.subject, chapterName: ch.chapter },
      {
        content: truncated,
        summary: `NCERT Std ${ch.std} ${ch.subject} Chapter: ${ch.chapter}`,
        keyPoints: []
      },
      { upsert: true, returnDocument: 'after' }
    );
    console.log(`  ✓ ${content.length} chars extracted and stored`);
  }

  // Cleanup
  try { fs.rmSync(TMP_DIR, { recursive: true, force: true }); } catch {}

  await mongoose.disconnect();
  console.log('\n✅ Done! Real NCERT text content seeded.');
}

downloadAndExtract().catch(err => { console.error(err); process.exit(1); });
