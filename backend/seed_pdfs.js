require('dotenv').config();
const mongoose = require('mongoose');
const NcertPdf = require('./src/models/NcertPdf');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

const NCERT_BASE = 'https://ncert.nic.in/textbook/pdf';

const PDFS_MAP = [
  // Class 10 Science
  { std: 10, subjectName: 'Science', chapters: [
    { name: 'Chemical Reactions and Equations', code: 'jesc101' },
    { name: 'Acids, Bases and Salts', code: 'jesc102' },
    { name: 'Metals and Non-Metals', code: 'jesc103' },
    { name: 'Carbon and its Compounds', code: 'jesc104' },
  ]},
  // Class 10 Mathematics
  { std: 10, subjectName: 'Mathematics', chapters: [
    { name: 'Real Numbers', code: 'jemh101' },
    { name: 'Polynomials', code: 'jemh102' },
    { name: 'Pair of Linear Equations in Two Variables', code: 'jemh103' },
    { name: 'Trigonometry', code: 'jemh108' },
  ]},
  // Class 9 Science
  { std: 9, subjectName: 'Science', chapters: [
    { name: 'Matter in Our Surroundings', code: 'jesc101' },
    { name: 'Is Matter Around Us Pure?', code: 'jesc102' },
    { name: 'Atoms and Molecules', code: 'jesc103' },
    { name: 'Structure of the Atom', code: 'jesc104' },
  ]},
  // Class 9 Mathematics
  { std: 9, subjectName: 'Mathematics', chapters: [
    { name: 'Number Systems', code: 'jemh101' },
    { name: 'Polynomials', code: 'jemh102' },
    { name: 'Coordinate Geometry', code: 'jemh103' },
    { name: 'Linear Equations in Two Variables', code: 'jemh104' },
  ]},
];

async function seedPdfs() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  for (const entry of PDFS_MAP) {
    for (const ch of entry.chapters) {
      const ncertUrl = `${NCERT_BASE}/${ch.code}.pdf`;
      await NcertPdf.findOneAndUpdate(
        { std: entry.std, board: 'CBSE', subjectName: entry.subjectName, chapterName: ch.name },
        { ncertUrl, language: 'en' },
        { upsert: true, new: true }
      );
      console.log(`  ✓ ${entry.subjectName} Std ${entry.std}: ${ch.name}`);
    }
  }

  await mongoose.disconnect();
  console.log('Done seeding PDF metadata');
}

seedPdfs().catch(err => { console.error(err); process.exit(1); });
