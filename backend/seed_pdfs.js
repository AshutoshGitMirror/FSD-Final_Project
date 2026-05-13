require('dotenv').config();
const mongoose = require('mongoose');
const NcertPdf = require('./src/models/NcertPdf');
const NCERT_BASE = 'https://ncert.nic.in/textbook/pdf';
const PAD = (n) => String(n).padStart(2, '0');

// All codes verified via HTTP HEAD against NCERT server
const BOOKS = [
  // ══ CLASS 1 (NEP 2020) ══
  { std:1, subject:'English', code:'aemr1', ch1:1, chN:10,
    names:['My Family and Me','Picture Time','Friends Together','The Cap-seller and the Monkeys','A Farm','My Home','The Park','Funny Bunny','A Greeting Card','A Visit to the Doctor'] },
  { std:1, subject:'Mathematics', code:'aejm1', ch1:1, chN:10,
    names:['Finding the Furry Cat','What is Long?','Mango Treat','Making 10','How Many?','Vegetable Farm','Lina\'s Family','How Much Can We Hold?','Patterns','How Many Times?'] },

  // ══ CLASS 2 (NEP 2020) ══
  { std:2, subject:'English', code:'bemr1', ch1:1, chN:10,
    names:['My Bicycle','Picture Reading','It Is Fun','Seeing without Seeing','Come Back Soon','Between Home and School','This is My Town','A Show of Clouds','My Name','The Crow'] },
  { std:2, subject:'Mathematics', code:'bejm1', ch1:1, chN:10,
    names:['Fun with Numbers','Counting in Groups','How Much?','Tens and Ones','Patterns','Footprints','Jugs and Mugs','Multiply Me','Shapes','How Many?'] },

  // ══ CLASS 4 (OLD - Looking Around EVS) ══  
  { std:4, subject:'EVS', code:'deap1', ch1:1, chN:27,
    names:['Going to School','Ear to Ear','A Day with Nandu','The Story of Amrita','Anitas Kitchen','OManas Journey','From the Window','Reaching Grandmothers House','Changing Families','Hu Tu Tu Hu Tu Tu','The Valley of Flowers','Changing Times','A Rivers Tale','Basvas Farm','Poet and Farmer','A Busy Month','Nandita in Mumbai','Too Much Water Too Little Water','Abdul in the Garden','Eating Together','Food and Fun','The World in My Home','Pochampalli','Home and Abroad','Spicy Riddles','Defence Officer Wahida','Chuskit Goes to School'] },

  // ══ CLASS 5 (OLD) ══
  { std:5, subject:'Mathematics', code:'eemh1', ch1:1, chN:14,
    names:['The Fish Tale','Shapes and Angles','How Many Squares?','Parts and Wholes','Does it Look the Same?','Be My Multiple Ill Be Your Factor','Can You See the Pattern?','Mapping Your Way','Boxes and Sketches','Tenths and Hundredths','Area and its Boundary','Smart Charts','Ways to Multiply and Divide','How Big How Heavy'] },
  { std:5, subject:'English', code:'eeen1', ch1:1, chN:10,
    names:['Ice-Cream Man','Wonderful Waste','My Shadow','Robinson Crusoe Discovers a Footprint','Rip Van Winkle','Talkative Barber','Gullivers Travels','The Little Bully','Around the World','Who Will be Ningthou'] },
  { std:5, subject:'Hindi', code:'ehhn1', ch1:1, chN:10,
    names:['Rakh Ki Rassi','Faslon Ke Tyohaar','Khilaune Vaala','Nanha Phankar','Jaahan Chaah Vahaan Raah','Chitthi Ka Safar','Daaktar Ka Aaana','Dino Ke Baad','Mela','Gurur aur Kisaan'] },
  { std:5, subject:'EVS', code:'eeap1', ch1:1, chN:10,
    names:['Super Senses','A Snake Charmers Story','From Tasting to Digesting','Mangoes Round the Year','Seeds and Seeds','Every Drop Counts','Experiments with Water','A Treat for Mosquitoes','Up You Go','Walls Tell Stories'] },

  // ══ CLASS 7 (NEP 2020 Curiosity/Ganita Prakash/Poorvi) ══
  { std:7, subject:'Science', code:'gecu1', ch1:1, chN:13,
    names:['Nutrition in Plants','Nutrition in Animals','Fibre to Fabric','Heat','Acids Bases and Salts','Physical and Chemical Changes','Weather Climate and Adaptations','Winds Storms and Cyclones','Soil','Respiration in Organisms','Transportation in Animals and Plants','Reproduction in Plants','Motion and Time'] },
  { std:7, subject:'Mathematics', code:'gegp1', ch1:2, chN:8,
    names:['','Fractions','Data Handling','Simple Equations','Lines and Angles','The Triangle and Its Properties','Comparing Quantities','Rational Numbers'] },
  { std:7, subject:'English', code:'gepr1', ch1:1, chN:5,
    names:['Three Questions','Making a Difference','A New Chapter','Exploring the World','The Future'] },

  // ══ CLASS 8 (NEP 2020) ══
  { std:8, subject:'Science', code:'hecu1', ch1:1, chN:13,
    names:['Crop Production and Management','Microorganisms Friend and Foe','Coal and Petroleum','Combustion and Flame','Conservation of Plants and Animals','Reproduction in Animals','Reaching the Age of Adolescence','Force and Pressure','Friction','Sound','Chemical Effects of Electric Current','Some Natural Phenomena','Light'] },
  { std:8, subject:'Mathematics', code:'hegp1', ch1:1, chN:7,
    names:['Rational Numbers','Linear Equations in One Variable','Understanding Quadrilaterals','Data Handling','Squares and Square Roots','Cubes and Cube Roots','Comparing Quantities'] },
  { std:8, subject:'English', code:'hepr1', ch1:1, chN:5,
    names:['A New Beginning','Courage and Determination','The World of Imagination','Nature and Us','Science and Discovery'] },

  // ══ CLASS 9 (OLD, still current) ══
  { std:9, subject:'Mathematics', code:'iemh1', ch1:1, chN:15,
    names:['Number Systems','Polynomials','Coordinate Geometry','Linear Equations in Two Variables','Introduction to Euclids Geometry','Lines and Angles','Triangles','Quadrilaterals','Areas of Parallelograms and Triangles','Circles','Constructions','Herons Formula','Surface Areas and Volumes','Statistics','Probability'] },
  { std:9, subject:'Science', code:'iesc1', ch1:1, chN:15,
    names:['Matter in Our Surroundings','Is Matter Around Us Pure?','Atoms and Molecules','Structure of the Atom','The Fundamental Unit of Life','Tissues','Diversity in Living Organisms','Motion','Force and Laws of Motion','Gravitation','Work and Energy','Sound','Why Do We Fall Ill','Natural Resources','Improvement in Food Resources'] },
  { std:9, subject:'English', code:'iebe1', ch1:1, chN:11,
    names:['The Fun They Had','The Sound of Music','The Little Girl','A Truly Beautiful Mind','The Snake and the Mirror','My Childhood','Packing','Reach for the Top','The Bond of Love','Kathmandu','If I Were You'] },

  // ══ CLASS 10 (OLD, still current) ══
  { std:10, subject:'Mathematics', code:'jemh1', ch1:1, chN:15,
    names:['Real Numbers','Polynomials','Pair of Linear Equations in Two Variables','Quadratic Equations','Arithmetic Progressions','Triangles','Coordinate Geometry','Introduction to Trigonometry','Some Applications of Trigonometry','Circles','Areas Related to Circles','Surface Areas and Volumes','Statistics','Probability'] },
  { std:10, subject:'Science', code:'jesc1', ch1:1, chN:16,
    names:['Chemical Reactions and Equations','Acids Bases and Salts','Metals and Non-Metals','Carbon and its Compounds','Life Processes','Control and Coordination','How do Organisms Reproduce?','Heredity and Evolution','Light – Reflection and Refraction','The Human Eye and the Colourful World','Electricity','Magnetic Effects of Electric Current','Our Environment','Sustainable Management of Natural Resources'] },
  { std:10, subject:'English', code:'jeff1', ch1:1, chN:11,
    names:['A Letter to God','Nelson Mandela Long Walk to Freedom','Two Stories about Flying','From the Diary of Anne Frank','The Hundred Dresses I','The Hundred Dresses II','Glimpses of India','Mijbil the Otter','Madam Rides the Bus','The Sermon at Benares','The Proposal'] },
  { std:10, subject:'Hindi', code:'jhks1', ch1:1, chN:10,
    names:['Soor Das','Tulsidas','Dev','Jaishankar Prasad','Suryakant Tripathi Nirala','Nagraj Manushyachar','Girijakumar Mathur','Rambriksh Benipuri','Manglesh Dabral','Swaroopanand'] },
  { std:10, subject:'Social Studies', code:'jess1', ch1:1, chN:7,
    names:['Resources and Development','Forest and Wildlife Resources','Water Resources','Agriculture','Minerals and Energy Resources','Manufacturing Industries','Lifelines of National Economy'] },
];

async function seedPdfs() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB\n');
  await NcertPdf.deleteMany({});
  console.log('Cleared existing PDF records\n');

  let total = 0;
  for (const book of BOOKS) {
    let seeded = 0;
    for (let ch = book.ch1; ch <= book.chN; ch++) {
      const name = book.names[ch - book.ch1];
      if (!name) continue;
      const ncertUrl = `${NCERT_BASE}/${book.code}${PAD(ch)}.pdf`;
      try {
        const resp = await fetch(ncertUrl, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
        if (!resp.ok) { console.log(`  ⚠ ${book.subject} Std${book.std} ch${ch} - ${resp.status}`); continue; }
      } catch { console.log(`  ⚠ ${book.subject} Std${book.std} ch${ch} - unreachable`); continue; }
      await NcertPdf.create({ std:book.std, board:'CBSE', subjectName:book.subject, chapterName:name, ncertUrl, language:'en' });
      seeded++; total++;
    }
    console.log(`  ✓ Std ${book.std} ${book.subject} (${seeded} chapters)`);
  }
  await mongoose.disconnect();
  console.log(`\n✅ ${total} verified NCERT PDFs seeded.`);
}

seedPdfs().catch(err => { console.error(err); process.exit(1); });
