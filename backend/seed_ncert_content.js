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
const CONCURRENCY = 3;

// All verified NCERT book codes from Puppeteer scan + manual verification
// Format: { std, subject, code, maxCh, ch1 (some start at 2) }
const BOOKS = [
  // ══ CLASS 1 ══
  { std:1, subject:'English', code:'aemr1', maxCh:10 },
  { std:1, subject:'Mathematics', code:'aejm1', maxCh:10 },
  // ══ CLASS 2 ══
  { std:2, subject:'English', code:'bemr1', maxCh:10 },
  { std:2, subject:'Mathematics', code:'bejm1', maxCh:10 },
  // ══ CLASS 3 ══
  { std:3, subject:'English', code:'cesa1', maxCh:10 },
  { std:3, subject:'Mathematics', code:'cemm1', maxCh:10 },
  { std:3, subject:'Hindi', code:'chve1', maxCh:10 },
  // ══ CLASS 4 ══
  { std:4, subject:'English', code:'desa1', maxCh:10 },
  { std:4, subject:'Mathematics', code:'demm1', maxCh:10 },
  { std:4, subject:'EVS', code:'deap1', maxCh:27 },
  // ══ CLASS 5 ══
  { std:5, subject:'Mathematics', code:'eemh1', maxCh:14 },
  { std:5, subject:'English', code:'eeen1', maxCh:10 },
  { std:5, subject:'Hindi', code:'ehhn1', maxCh:10 },
  { std:5, subject:'EVS', code:'eeap1', maxCh:10 },
  // ══ CLASS 6 ══
  { std:6, subject:'Mathematics', code:'fegp1', maxCh:10 },
  { std:6, subject:'Science', code:'fecu1', maxCh:12 },
  { std:6, subject:'English', code:'fepr1', maxCh:5 },
  { std:6, subject:'Hindi', code:'fhml1', maxCh:10 },
  // ══ CLASS 7 ══
  { std:7, subject:'Mathematics', code:'gegp1', maxCh:8 },
  { std:7, subject:'Science', code:'gecu1', maxCh:12 },
  { std:7, subject:'English', code:'gepr1', maxCh:5 },
  { std:7, subject:'Hindi', code:'ghml1', maxCh:10 },
  { std:7, subject:'Social Studies', code:'gees1', maxCh:10 },
  { std:7, subject:'Social Studies', code:'gees2', maxCh:8 },
  // ══ CLASS 8 ══
  { std:8, subject:'Mathematics', code:'hegp1', maxCh:7 },
  { std:8, subject:'Science', code:'hecu1', maxCh:13 },
  { std:8, subject:'English', code:'hepr1', maxCh:5 },
  { std:8, subject:'Hindi', code:'hhml1', maxCh:10 },
  // ══ CLASS 9 ══
  { std:9, subject:'Mathematics', code:'iemh1', maxCh:15 },
  { std:9, subject:'Science', code:'iesc1', maxCh:15 },
  { std:9, subject:'English', code:'iebe1', maxCh:8 },
  // ══ CLASS 10 ══
  { std:10, subject:'Mathematics', code:'jemh1', maxCh:15 },
  { std:10, subject:'Science', code:'jesc1', maxCh:16 },
  { std:10, subject:'English', code:'jeff1', maxCh:9 },
  { std:10, subject:'Hindi', code:'jhks1', maxCh:10 },
  { std:10, subject:'Social Studies', code:'jess1', maxCh:7 },
];

async function processChapter(std, subject, code, chNum) {
  const url = `${NCERT_BASE}/${code}${PAD(chNum)}.pdf`;
  const safeName = `${std}_${subject.replace(/[^a-z0-9]/gi,'')}_ch${chNum}`.replace(/\s+/g,'_');
  const pdfPath = path.join(TMP_DIR, `${safeName}.pdf`);
  const txtPath = path.join(TMP_DIR, `${safeName}.txt`);

  // Download
  try {
    execSync(`curl -sL --max-time 20 "${url}" -o "${pdfPath}" 2>/dev/null`, { stdio: 'pipe' });
    if (!fs.existsSync(pdfPath)) return null;
    const size = fs.statSync(pdfPath).size;
    if (size < 500) { fs.unlinkSync(pdfPath); return null; }
  } catch { return null; }

  // Extract text
  try {
    execSync(`pdftotext -layout "${pdfPath}" "${txtPath}" 2>/dev/null`, { stdio: 'pipe' });
    if (!fs.existsSync(txtPath)) return null;
    let content = fs.readFileSync(txtPath, 'utf-8').trim();
    if (content.length < 100) return null;

    // Remove header/footer noise
    content = content.replace(/^.*?Rationalised 2023-24[\s\S]*?(?=^[A-Z])/m, '').trim();
    content = content.replace(/\n{4,}/g, '\n\n');

    return { content, size: content.length };
  } catch { return null; }
}

async function main() {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB\n');

  await NcertContent.deleteMany({});
  console.log('Cleared existing content\n');

  let total = 0;
  let totalChars = 0;

  for (const book of BOOKS) {
    console.log(`\n📚 Std ${book.std} ${book.subject} (${book.code}, 1-${book.maxCh})`);

    const batch = [];
    for (let ch = 1; ch <= book.maxCh; ch++) {
      batch.push(processChapter(book.std, book.subject, book.code, ch));
    }

    const results = await Promise.all(batch);
    let seeded = 0;

    for (let ch = 1; ch <= book.maxCh; ch++) {
      const result = results[ch - 1];
      if (!result) continue;

      // Store chapter name from the PDF or use generic
      const chapterName = `Chapter ${ch}`;

      await NcertContent.findOneAndUpdate(
        { std: book.std, board: 'CBSE', subjectName: book.subject, chapterName },
        { content: result.content },
        { upsert: true, returnDocument: 'after' }
      );
      seeded++;
      total++;
      totalChars += result.size;
      process.stdout.write(`  ✓ Ch${ch} (${(result.size/1000).toFixed(0)}K chars) `);
    }

    if (seeded > 0) console.log(`\n  ✅ ${seeded}/${book.maxCh} chapters`);
    else console.log(`  ⚠ No chapters found`);
  }

  // Cleanup
  try { fs.rmSync(TMP_DIR, { recursive: true, force: true }); } catch {}

  console.log(`\n═══════════════════════════════════════`);
  console.log(`✅ DONE! ${total} chapters from ${BOOKS.length} books`);
  console.log(`📊 Total text: ${(totalChars / 1000000).toFixed(1)} MB`);
  console.log(`═══════════════════════════════════════`);

  await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
