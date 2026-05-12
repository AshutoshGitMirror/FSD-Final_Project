require('dotenv').config();
const mongoose = require('mongoose');
const NcertPdf = require('./src/models/NcertPdf');
const Curriculum = require('./src/models/Curriculum');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';
const NCERT_BASE = 'https://ncert.nic.in/textbook/pdf';

const PAD = (n) => String(n).padStart(2, '0');

const BOOKS = [
  // Class 6
  { std: 6, subject: 'Mathematics', prefix: 'femh1', ch1: 1, chN: 14 },
  { std: 6, subject: 'Science', prefix: 'fesc1', ch1: 1, chN: 16 },
  // Class 7
  { std: 7, subject: 'Mathematics', prefix: 'gemh1', ch1: 1, chN: 15 },
  { std: 7, subject: 'Science', prefix: 'gesc1', ch1: 1, chN: 18 },
  // Class 8
  { std: 8, subject: 'Mathematics', prefix: 'hemh1', ch1: 1, chN: 16 },
  { std: 8, subject: 'Science', prefix: 'hesc1', ch1: 1, chN: 18 },
  // Class 9
  { std: 9, subject: 'Mathematics', prefix: 'iemh1', ch1: 1, chN: 15 },
  { std: 9, subject: 'Science', prefix: 'iesc1', ch1: 1, chN: 15 },
  // Class 10
  { std: 10, subject: 'Mathematics', prefix: 'jemh1', ch1: 1, chN: 15 },
  { std: 10, subject: 'Science', prefix: 'jesc1', ch1: 1, chN: 16 },
];

// Known chapter names per book that match the curriculum exactly
const CHAPTER_NAMES = {
  '10/Science': [
    'Chemical Reactions and Equations', 'Acids, Bases and Salts', 'Metals and Non-Metals',
    'Carbon and its Compounds', 'Life Processes', 'Control and Coordination',
    'How do Organisms Reproduce?', 'Heredity and Evolution', 'Light – Reflection and Refraction',
    'The Human Eye and the Colourful World', 'Electricity', 'Magnetic Effects of Electric Current',
    'Our Environment', 'Sustainable Management of Natural Resources', '', ''
  ],
  '10/Mathematics': [
    'Real Numbers', 'Polynomials', 'Pair of Linear Equations in Two Variables',
    'Quadratic Equations', 'Arithmetic Progressions', 'Triangles',
    'Coordinate Geometry', 'Introduction to Trigonometry', 'Some Applications of Trigonometry',
    'Circles', 'Areas Related to Circles', 'Surface Areas and Volumes',
    'Statistics', 'Probability', '', ''
  ],
  '9/Science': [
    'Matter in Our Surroundings', 'Is Matter Around Us Pure?', 'Atoms and Molecules',
    'Structure of the Atom', 'The Fundamental Unit of Life', 'Tissues',
    'Diversity in Living Organisms', 'Motion', 'Force and Laws of Motion',
    'Gravitation', 'Work and Energy', 'Sound',
    'Why Do We Fall Ill', 'Natural Resources', 'Improvement in Food Resources'
  ],
  '9/Mathematics': [
    'Number Systems', 'Polynomials', 'Coordinate Geometry',
    'Linear Equations in Two Variables', 'Introduction to Euclids Geometry',
    'Lines and Angles', 'Triangles', 'Quadrilaterals', 'Areas of Parallelograms and Triangles',
    'Circles', 'Constructions', 'Herons Formula',
    'Surface Areas and Volumes', 'Statistics', 'Probability'
  ]
};

async function seedPdfs() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear old records
  await NcertPdf.deleteMany({});
  console.log('Cleared existing PDF records');

  let total = 0;
  for (const book of BOOKS) {
    const key = `${book.std}/${book.subject}`;
    const knownNames = CHAPTER_NAMES[key] || [];

    for (let ch = book.ch1; ch <= book.chN; ch++) {
      const idx = ch - 1;
      const chapterName = knownNames[idx] || `${book.subject} Chapter ${ch}`;
      const ncertUrl = `${NCERT_BASE}/${book.prefix}${PAD(ch)}.pdf`;

      await NcertPdf.create({
        std: book.std,
        board: 'CBSE',
        subjectName: book.subject,
        chapterName,
        ncertUrl,
        language: 'en'
      });
      total++;
    }
    console.log(`  ✓ Std ${book.std} ${book.subject} (${book.chN - book.ch1 + 1} chapters)`);
  }

  await mongoose.disconnect();
  console.log(`\nDone! ${total} PDF records seeded.`);
}

seedPdfs().catch(err => { console.error(err); process.exit(1); });
