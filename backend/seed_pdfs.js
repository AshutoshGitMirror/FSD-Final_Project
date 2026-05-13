require('dotenv').config();
const mongoose = require('mongoose');
const NcertPdf = require('./src/models/NcertPdf');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';
const NCERT_BASE = 'https://ncert.nic.in/textbook/pdf';

const PAD = (n) => String(n).padStart(2, '0');

// Only classes/subjects where NCERT actually has chapter-level PDFs (HTTP 200 verified)
const BOOKS = [
  // Class 5 Mathematics ✅
  { std: 5, subject: 'Mathematics', prefix: 'eemh1', ch1: 1, chN: 14,
    names: ['The Fish Tale','Shapes and Angles','How Many Squares?','Parts and Wholes','Does it Look the Same?','Be My Multiple Ill Be Your Factor','Can You See the Pattern?','Mapping Your Way','Boxes and Sketches','Tenths and Hundredths','Area and its Boundary','Smart Charts','Ways to Multiply and Divide','How Big How Heavy'] },
  // Class 7 Science ✅
  { std: 7, subject: 'Science', prefix: 'gesc1', ch1: 1, chN: 18,
    names: ['Nutrition in Plants','Nutrition in Animals','Fibre to Fabric','Heat','Acids Bases and Salts','Physical and Chemical Changes','Weather Climate and Adaptations of Animals to Climate','Winds Storms and Cyclones','Soil','Respiration in Organisms','Transportation in Animals and Plants','Reproduction in Plants','Motion and Time','Electric Current and Its Effects','Light','Water A Precious Resource','Forests Our Lifeline','Wastewater Story'] },
  // Class 8 Science ✅
  { std: 8, subject: 'Science', prefix: 'hesc1', ch1: 1, chN: 18,
    names: ['Crop Production and Management','Microorganisms Friend and Foe','Coal and Petroleum','Combustion and Flame','Conservation of Plants and Animals','Reproduction in Animals','Reaching the Age of Adolescence','Force and Pressure','Friction','Sound','Chemical Effects of Electric Current','Some Natural Phenomena','Light','Stars and The Solar System','Pollution of Air and Water'] },
  // Class 8 Mathematics ✅
  { std: 8, subject: 'Mathematics', prefix: 'hemh1', ch1: 1, chN: 16,
    names: ['Rational Numbers','Linear Equations in One Variable','Understanding Quadrilaterals','Practical Geometry','Data Handling','Squares and Square Roots','Cubes and Cube Roots','Comparing Quantities','Algebraic Expressions and Identities','Visualising Solid Shapes','Mensuration','Exponents and Powers','Direct and Inverse Proportions','Factorisation','Introduction to Graphs','Playing with Numbers'] },
  // Class 9 Science ✅
  { std: 9, subject: 'Science', prefix: 'iesc1', ch1: 1, chN: 15,
    names: ['Matter in Our Surroundings','Is Matter Around Us Pure?','Atoms and Molecules','Structure of the Atom','The Fundamental Unit of Life','Tissues','Diversity in Living Organisms','Motion','Force and Laws of Motion','Gravitation','Work and Energy','Sound','Why Do We Fall Ill','Natural Resources','Improvement in Food Resources'] },
  // Class 9 Mathematics ✅
  { std: 9, subject: 'Mathematics', prefix: 'iemh1', ch1: 1, chN: 15,
    names: ['Number Systems','Polynomials','Coordinate Geometry','Linear Equations in Two Variables','Introduction to Euclids Geometry','Lines and Angles','Triangles','Quadrilaterals','Areas of Parallelograms and Triangles','Circles','Constructions','Herons Formula','Surface Areas and Volumes','Statistics','Probability'] },
  // Class 10 Science ✅
  { std: 10, subject: 'Science', prefix: 'jesc1', ch1: 1, chN: 16,
    names: ['Chemical Reactions and Equations','Acids Bases and Salts','Metals and Non-Metals','Carbon and its Compounds','Life Processes','Control and Coordination','How do Organisms Reproduce?','Heredity and Evolution','Light – Reflection and Refraction','The Human Eye and the Colourful World','Electricity','Magnetic Effects of Electric Current','Our Environment','Sustainable Management of Natural Resources'] },
  // Class 10 Mathematics ✅
  { std: 10, subject: 'Mathematics', prefix: 'jemh1', ch1: 1, chN: 15,
    names: ['Real Numbers','Polynomials','Pair of Linear Equations in Two Variables','Quadratic Equations','Arithmetic Progressions','Triangles','Coordinate Geometry','Introduction to Trigonometry','Some Applications of Trigonometry','Circles','Areas Related to Circles','Surface Areas and Volumes','Statistics','Probability'] },
];

async function seedPdfs() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB\n');

  await NcertPdf.deleteMany({});
  console.log('Cleared existing PDF records\n');

  let total = 0;
  for (const book of BOOKS) {
    let seeded = 0;
    for (let ch = book.ch1; ch <= book.chN; ch++) {
      const idx = ch - 1;
      const name = book.names[idx];
      if (!name) continue;

      const ncertUrl = `${NCERT_BASE}/${book.prefix}${PAD(ch)}.pdf`;
      await NcertPdf.create({
        std: book.std, board: 'CBSE', subjectName: book.subject,
        chapterName: name, ncertUrl, language: 'en'
      });
      seeded++;
      total++;
    }
    console.log(`  ✓ Std ${book.std} ${book.subject} (${seeded} chapters)`);
  }

  console.log(`\nNote: NCERT only provides chapter PDFs for classes 5, 7-10.`);
  console.log(`For classes 1-4, 6, use the NCERT website textbook viewer.`);

  await mongoose.disconnect();
  console.log(`\n✅ Done! ${total} PDF records seeded.`);
}

seedPdfs().catch(err => { console.error(err); process.exit(1); });
