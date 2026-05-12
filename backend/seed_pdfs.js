require('dotenv').config();
const mongoose = require('mongoose');
const NcertPdf = require('./src/models/NcertPdf');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';
const NCERT_BASE = 'https://ncert.nic.in/textbook/pdf';

// Book codes from NCERT textbook.php source (English medium)
// Format: { prefix, firstChapter, lastChapter, chapterPad } => prefix + pad(chapter) + '.pdf'
const BOOKS = [
  // Class 1
  { std: 1, board: 'CBSE', subject: 'Mathematics', prefix: 'aemh1', ch1: 1, chN: 13 },
  { std: 1, board: 'CBSE', subject: 'English',     prefix: 'aeen1', ch1: 1, chN: 10 },
  { std: 1, board: 'CBSE', subject: 'Hindi',       prefix: 'ahhn1', ch1: 1, chN: 23 },

  // Class 2
  { std: 2, board: 'CBSE', subject: 'Mathematics', prefix: 'bemh1', ch1: 1, chN: 15 },
  { std: 2, board: 'CBSE', subject: 'English',     prefix: 'been1', ch1: 1, chN: 10 },
  { std: 2, board: 'CBSE', subject: 'Hindi',       prefix: 'bhhn1', ch1: 1, chN: 15 },

  // Class 3
  { std: 3, board: 'CBSE', subject: 'Mathematics', prefix: 'cemh1', ch1: 1, chN: 14 },
  { std: 3, board: 'CBSE', subject: 'English',     prefix: 'ceen1', ch1: 1, chN: 10 },
  { std: 3, board: 'CBSE', subject: 'Hindi',       prefix: 'chhn1', ch1: 1, chN: 14 },
  { std: 3, board: 'CBSE', subject: 'EVS',         prefix: 'ceap1', ch1: 1, chN: 24 },

  // Class 4
  { std: 4, board: 'CBSE', subject: 'Mathematics', prefix: 'demh1', ch1: 1, chN: 14 },
  { std: 4, board: 'CBSE', subject: 'English',     prefix: 'deen1', ch1: 1, chN: 9 },
  { std: 4, board: 'CBSE', subject: 'Hindi',       prefix: 'dhhn1', ch1: 1, chN: 14 },
  { std: 4, board: 'CBSE', subject: 'EVS',         prefix: 'deap1', ch1: 1, chN: 27 },

  // Class 5
  { std: 5, board: 'CBSE', subject: 'Mathematics', prefix: 'eemh1', ch1: 1, chN: 14 },
  { std: 5, board: 'CBSE', subject: 'English',     prefix: 'eeen1', ch1: 1, chN: 10 },
  { std: 5, board: 'CBSE', subject: 'Hindi',       prefix: 'ehhn1', ch1: 1, chN: 18 },
  { std: 5, board: 'CBSE', subject: 'EVS',         prefix: 'eeap1', ch1: 1, chN: 22 },

  // Class 6
  { std: 6, board: 'CBSE', subject: 'Mathematics',  prefix: 'femh1', ch1: 1, chN: 14 },
  { std: 6, board: 'CBSE', subject: 'Science',      prefix: 'fesc1', ch1: 1, chN: 16 },
  { std: 6, board: 'CBSE', subject: 'English',      prefix: 'fehl1', ch1: 1, chN: 10 },
  { std: 6, board: 'CBSE', subject: 'Hindi',        prefix: 'fhvs1', ch1: 1, chN: 17 },
  { std: 6, board: 'CBSE', subject: 'Social Studies', prefix: 'fess1', ch1: 1, chN: 11 },
  { std: 6, board: 'CBSE', subject: 'Social Studies', prefix: 'fess2', ch1: 1, chN: 8 },
  { std: 6, board: 'CBSE', subject: 'Social Studies', prefix: 'fess3', ch1: 1, chN: 9 },

  // Class 7
  { std: 7, board: 'CBSE', subject: 'Mathematics',  prefix: 'gemh1', ch1: 1, chN: 15 },
  { std: 7, board: 'CBSE', subject: 'Science',      prefix: 'gesc1', ch1: 1, chN: 18 },
  { std: 7, board: 'CBSE', subject: 'English',      prefix: 'gehc1', ch1: 1, chN: 10 },
  { std: 7, board: 'CBSE', subject: 'Hindi',        prefix: 'ghvs1', ch1: 1, chN: 20 },
  { std: 7, board: 'CBSE', subject: 'Social Studies', prefix: 'gess1', ch1: 1, chN: 10 },
  { std: 7, board: 'CBSE', subject: 'Social Studies', prefix: 'gess2', ch1: 1, chN: 9 },
  { std: 7, board: 'CBSE', subject: 'Social Studies', prefix: 'gess3', ch1: 1, chN: 9 },

  // Class 8
  { std: 8, board: 'CBSE', subject: 'Mathematics',  prefix: 'hemh1', ch1: 1, chN: 16 },
  { std: 8, board: 'CBSE', subject: 'Science',      prefix: 'hesc1', ch1: 1, chN: 18 },
  { std: 8, board: 'CBSE', subject: 'English',      prefix: 'hehd1', ch1: 1, chN: 10 },
  { std: 8, board: 'CBSE', subject: 'Hindi',        prefix: 'hhvs1', ch1: 1, chN: 18 },
  { std: 8, board: 'CBSE', subject: 'Social Studies', prefix: 'hess2', ch1: 1, chN: 10 },
  { std: 8, board: 'CBSE', subject: 'Social Studies', prefix: 'hess3', ch1: 1, chN: 10 },
  { std: 8, board: 'CBSE', subject: 'Social Studies', prefix: 'hess4', ch1: 1, chN: 6 },

  // Class 9
  { std: 9, board: 'CBSE', subject: 'Mathematics',  prefix: 'iemh1', ch1: 1, chN: 15 },
  { std: 9, board: 'CBSE', subject: 'Science',      prefix: 'iesc1', ch1: 1, chN: 15 },
  { std: 9, board: 'CBSE', subject: 'English',      prefix: 'iebe1', ch1: 1, chN: 11 },
  { std: 9, board: 'CBSE', subject: 'Hindi',        prefix: 'ihks1', ch1: 1, chN: 17 },
  { std: 9, board: 'CBSE', subject: 'Social Studies', prefix: 'iess1', ch1: 1, chN: 6 },
  { std: 9, board: 'CBSE', subject: 'Social Studies', prefix: 'iess2', ch1: 1, chN: 4 },
  { std: 9, board: 'CBSE', subject: 'Social Studies', prefix: 'iess3', ch1: 1, chN: 5 },
  { std: 9, board: 'CBSE', subject: 'Social Studies', prefix: 'iess4', ch1: 1, chN: 6 },

  // Class 10
  { std: 10, board: 'CBSE', subject: 'Mathematics',  prefix: 'jemh1', ch1: 1, chN: 15 },
  { std: 10, board: 'CBSE', subject: 'Science',      prefix: 'jesc1', ch1: 1, chN: 16 },
  { std: 10, board: 'CBSE', subject: 'English',      prefix: 'jeff1', ch1: 1, chN: 11 },
  { std: 10, board: 'CBSE', subject: 'Hindi',        prefix: 'jhks1', ch1: 1, chN: 17 },
  { std: 10, board: 'CBSE', subject: 'Social Studies', prefix: 'jess1', ch1: 1, chN: 7 },
  { std: 10, board: 'CBSE', subject: 'Social Studies', prefix: 'jess2', ch1: 1, chN: 5 },
  { std: 10, board: 'CBSE', subject: 'Social Studies', prefix: 'jess3', ch1: 1, chN: 5 },
  { std: 10, board: 'CBSE', subject: 'Social Studies', prefix: 'jess4', ch1: 1, chN: 8 },
];

// Chapter titles per subject per class (first chapter is placeholder)
const CHAPTER_NAMES = {
  'Mathematics': [
    'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5',
    'Chapter 6', 'Chapter 7', 'Chapter 8', 'Chapter 9', 'Chapter 10',
    'Chapter 11', 'Chapter 12', 'Chapter 13', 'Chapter 14', 'Chapter 15', 'Chapter 16'
  ],
  'Science': [
    'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5',
    'Chapter 6', 'Chapter 7', 'Chapter 8', 'Chapter 9', 'Chapter 10',
    'Chapter 11', 'Chapter 12', 'Chapter 13', 'Chapter 14', 'Chapter 15', 'Chapter 16',
    'Chapter 17', 'Chapter 18'
  ],
  'English': [
    'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5',
    'Chapter 6', 'Chapter 7', 'Chapter 8', 'Chapter 9', 'Chapter 10', 'Chapter 11'
  ],
  'Hindi': [
    'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5',
    'Chapter 6', 'Chapter 7', 'Chapter 8', 'Chapter 9', 'Chapter 10',
    'Chapter 11', 'Chapter 12', 'Chapter 13', 'Chapter 14', 'Chapter 15',
    'Chapter 16', 'Chapter 17', 'Chapter 18', 'Chapter 19', 'Chapter 20',
    'Chapter 21', 'Chapter 22', 'Chapter 23'
  ],
  'EVS': [
    'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5',
    'Chapter 6', 'Chapter 7', 'Chapter 8', 'Chapter 9', 'Chapter 10',
    'Chapter 11', 'Chapter 12', 'Chapter 13', 'Chapter 14', 'Chapter 15',
    'Chapter 16', 'Chapter 17', 'Chapter 18', 'Chapter 19', 'Chapter 20',
    'Chapter 21', 'Chapter 22', 'Chapter 23', 'Chapter 24', 'Chapter 25',
    'Chapter 26', 'Chapter 27'
  ],
  'Social Studies': [
    'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5',
    'Chapter 6', 'Chapter 7', 'Chapter 8', 'Chapter 9', 'Chapter 10', 'Chapter 11'
  ]
};

const pad = (n) => String(n).padStart(2, '0');

async function seedPdfs() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB\n');

  let total = 0;
  for (const book of BOOKS) {
    for (let ch = book.ch1; ch <= book.chN; ch++) {
      const code = `${book.prefix}${pad(ch)}`;
      const ncertUrl = `${NCERT_BASE}/${code}.pdf`;
      const defaultName = `${CHAPTER_NAMES[book.subject]?.[ch - 1] || `Chapter ${ch}`}`;
      const chapterName = `${book.subject}/${book.prefix} ${defaultName}`;

      await NcertPdf.findOneAndUpdate(
        { std: book.std, board: book.board, subjectName: book.subject, chapterName },
        { ncertUrl, language: 'en' },
        { upsert: true, returnDocument: 'after' }
      );
      total++;
    }
    console.log(`  ✓ Std ${book.std} ${book.subject} (${book.chN - book.ch1 + 1} chapters)`);
  }

  await mongoose.disconnect();
  console.log(`\nDone! ${total} PDF metadata records seeded across ${BOOKS.length} books.`);
}

seedPdfs().catch(err => { console.error(err); process.exit(1); });
