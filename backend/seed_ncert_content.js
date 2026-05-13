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

// TRUTH: Match seed_pdfs.js exactly
const BOOKS = [
  { std:1, subject:'English', code:'aemr1', names:['My Family and Me','Picture Time','Friends Together','The Cap-seller and the Monkeys','A Farm','My Home','The Park','Funny Bunny','A Greeting Card','A Visit to the Doctor'] },
  { std:1, subject:'Mathematics', code:'aejm1', names:['Finding the Furry Cat','What is Long?','Mango Treat','Making 10','How Many?','Vegetable Farm','Linas Family','How Much Can We Hold?','Patterns','How Many Times?'] },
  { std:2, subject:'English', code:'bemr1', names:['My Bicycle','Picture Reading','It Is Fun','Seeing without Seeing','Come Back Soon','Between Home and School','This is My Town','A Show of Clouds','My Name','The Crow'] },
  { std:2, subject:'Mathematics', code:'bejm1', names:['Fun with Numbers','Counting in Groups','How Much?','Tens and Ones','Patterns','Footprints','Jugs and Mugs','Multiply Me','Shapes','How Many?'] },
  { std:3, subject:'English', code:'cesa1', names:['The Magic Garden','Nina and the Baby Sparrows','Little by Little','The Enormous Turnip','Sea Song','A Little Fish Story','The Yellow Butterfly','The Ship of the Desert','Good Morning','Bird Talk'] },
  { std:3, subject:'Mathematics', code:'cemm1', names:['Where to Look From','Fun with Numbers','Give and Take','Long and Short','Shapes and Designs','Fun with Give and Take','Time Goes On','Who is Heavier?','How Many Times?','Play with Patterns'] },
  { std:4, subject:'English', code:'desa1', names:['Wake Up','Nehas Alarm Clock','Noses','The Little Fir Tree','Run','Nasruddins Aim','Why','Alice in Wonderland','Dont Be Afraid of the Dark','A Watering Rhyme'] },
  { std:4, subject:'Mathematics', code:'demm1', names:['Building with Bricks','Long and Short','A Trip to Bhopal','Tick Tick Tick','The Way the World Looks','The Junk Seller','Jugs and Mugs','Carts and Wheels','Halves and Quarters','Play with Patterns'] },
  { std:4, subject:'EVS', code:'deap1', names:['Going to School','Ear to Ear','A Day with Nandu','The Story of Amrita','Anitas Kitchen','OManas Journey','From the Window','Reaching Grandmothers House','Changing Families','Hu Tu Tu Hu Tu Tu','The Valley of Flowers','Changing Times','A Rivers Tale','Basvas Farm','Poet and Farmer','A Busy Month','Nandita in Mumbai','Too Much Water Too Little Water','Abdul in the Garden','Eating Together','Food and Fun','The World in My Home','Pochampalli','Home and Abroad','Spicy Riddles','Defence Officer Wahida','Chuskit Goes to School'] },
  { std:5, subject:'Mathematics', code:'eemh1', names:['The Fish Tale','Shapes and Angles','How Many Squares?','Parts and Wholes','Does it Look the Same?','Be My Multiple Ill Be Your Factor','Can You See the Pattern?','Mapping Your Way','Boxes and Sketches','Tenths and Hundredths','Area and its Boundary','Smart Charts','Ways to Multiply and Divide','How Big How Heavy'] },
  { std:6, subject:'Mathematics', code:'fegp1', names:['Patterns in Mathematics','Lines and Angles','Number Play','Data Handling and Presentation','Prime Time','Perimeter and Area','Fractions'] },
  { std:6, subject:'Science', code:'fecu1', names:['Food: Where Does It Come From?','Components of Food','Fibre to Fabric','Sorting Materials into Groups','Separation of Substances','Changes Around Us','Getting to Know Plants','Body Movements','The Living Organisms and Their Surroundings','Motion and Measurement of Distances','Light Shadows and Reflections','Electricity and Circuits'] },
  { std:7, subject:'Mathematics', code:'gegp1', names:['Large Numbers Around Us','Arithmetic Expressions','A Peek Beyond the Point','Expressions using Letter-Variables','Parallel and Intersecting Lines','Number Play','A Tale of Three Intersecting Lines','Working with Fractions'] },
  { std:7, subject:'Science', code:'gecu1', names:['Nutrition in Plants','Nutrition in Animals','Fibre to Fabric','Heat','Acids Bases and Salts','Physical and Chemical Changes','Weather Climate and Adaptations','Winds Storms and Cyclones','Soil','Respiration in Organisms','Transportation in Animals and Plants','Reproduction in Plants'] },
  { std:8, subject:'Mathematics', code:'hegp1', names:['Rational Numbers','Power Play','A Story of Numbers','Quadrilaterals','Number Play','We Distribute, Yet Things...','Proportional Reasoning-1'] },
  { std:8, subject:'Science', code:'hecu1', names:['Crop Production and Management','Microorganisms Friend and Foe','Coal and Petroleum','Combustion and Flame','Conservation of Plants and Animals','Reproduction in Animals','Reaching the Age of Adolescence','Force and Pressure','Friction','Sound','Chemical Effects of Electric Current','Some Natural Phenomena','Light'] },
  { std:9, subject:'Mathematics', code:'iemh1', names:['Orienting Yourself: The Use of Coordinates','Introduction to Linear Polynomials','The World of Numbers','Exploring Algebraic Identities','I’m Up and Down, and Round and Round','Measuring Space: Perimeter and Area','The Mathematics of Maybe: Introduction to Probability','Predicting What Comes Next: Exploring Sequences'] },
  { std:9, subject:'Science', code:'iesc1', names:['Matter in Our Surroundings','Is Matter Around Us Pure?','Atoms and Molecules','Structure of the Atom','The Fundamental Unit of Life','Tissues','Diversity in Living Organisms','Motion','Force and Laws of Motion','Gravitation','Work and Energy','Sound','Why Do We Fall Ill','Natural Resources','Improvement in Food Resources'] },
  { std:10, subject:'Mathematics', code:'jemh1', names:['Real Numbers','Polynomials','Pair of Linear Equations in Two Variables','Quadratic Equations','Arithmetic Progressions','Triangles','Coordinate Geometry','Introduction to Trigonometry','Some Applications of Trigonometry','Circles','Areas Related to Circles','Surface Areas and Volumes','Statistics','Probability'] },
  { std:10, subject:'Science', code:'jesc1', names:['Chemical Reactions and Equations','Acids Bases and Salts','Metals and Non-Metals','Carbon and its Compounds','Life Processes','Control and Coordination','How do Organisms Reproduce?','Heredity and Evolution','Light – Reflection and Refraction','The Human Eye and the Colourful World','Electricity','Magnetic Effects of Electric Current','Our Environment','Sustainable Management of Natural Resources'] },
];

async function processChapter(std, subject, code, chNum) {
  const url = `${NCERT_BASE}/${code}${PAD(chNum)}.pdf`;
  const pdfPath = path.join(TMP_DIR, `${code}${PAD(chNum)}.pdf`);
  const txtPath = path.join(TMP_DIR, `${code}${PAD(chNum)}.txt`);

  try {
    execSync(`curl -sL -A "Mozilla/5.0" --max-time 30 "${url}" -o "${pdfPath}" 2>/dev/null`, { stdio: 'pipe' });
    if (!fs.existsSync(pdfPath) || fs.statSync(pdfPath).size < 1000) return null;
    execSync(`pdftotext -layout "${pdfPath}" "${txtPath}" 2>/dev/null`, { stdio: 'pipe' });
    if (!fs.existsSync(txtPath)) return null;
    let content = fs.readFileSync(txtPath, 'utf-8').trim();
    content = content.replace(/^.*?Rationalised 2023-24[\s\S]*?(?=^[A-Z])/m, '').trim();
    content = content.replace(/\n{4,}/g, '\n\n');
    return content;
  } catch { return null; }
}

async function main() {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB\n');

  for (const book of BOOKS) {
    console.log(`📚 Processing Std ${book.std} ${book.subject}...`);
    for (let i = 0; i < book.names.length; i++) {
      const chNum = i + 1;
      const chapterName = book.names[i];
      const content = await processChapter(book.std, book.subject, book.code, chNum);
      if (content) {
        await NcertContent.findOneAndUpdate(
          { std: book.std, board: 'CBSE', subjectName: book.subject, chapterName },
          { content },
          { upsert: true }
        );
        process.stdout.write(`  ✓ ${chapterName} `);
      } else {
        process.stdout.write(`  ✗ ${chapterName} `);
      }
    }
    console.log('\n');
  }
  await mongoose.disconnect();
  console.log('✅ Re-seeding complete!');
}

main().catch(err => { console.error(err); process.exit(1); });
