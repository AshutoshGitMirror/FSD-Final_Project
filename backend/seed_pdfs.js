require('dotenv').config();
const mongoose = require('mongoose');
const NcertPdf = require('./src/models/NcertPdf');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';
const NCERT_BASE = 'https://ncert.nic.in/textbook/pdf';
const PAD = (n) => String(n).padStart(2, '0');

// Codes verified via HTTP 200 from NCERT server (May 2026)
// Rationalised 2023-24 onward + NEP 2020 textbooks
const BOOKS = [
  // ══════ CLASS 1 (NEP 2020) ══════
  { std: 1, subject: 'English', code: 'aemr1', ch1: 1, chN: 10,
    names: ['My Family and Me','Picture Time','Friends Together','The Cap-seller and the Monkeys','A Farm','My Home','The Park','Funny Bunny','A Greeting Card','A Visit to the Doctor'] },

  // ══════ CLASS 2 (NEP 2020) ══════
  { std: 2, subject: 'English', code: 'bemr1', ch1: 1, chN: 10,
    names: ['My Bicycle','Picture Reading','It Is Fun','Seeing without Seeing','Come Back Soon','Between Home and School','This is My Town','A Show of Clouds','My Name','The Crow'] },

  // ══════ CLASS 4 ══════
  { std: 4, subject: 'EVS', code: 'deap1', ch1: 1, chN: 27,
    names: ['Going to School','Ear to Ear','A Day with Nandu','The Story of Amrita','Anitas Kitchen','OManas Journey','From the Window','Reaching Grandmothers House','Changing Families','Hu Tu Tu Hu Tu Tu','The Valley of Flowers','Changing Times','A Rivers Tale','Basvas Farm','Poet and Farmer','A Busy Month','Nandita in Mumbai','Too Much Water Too Little Water','Abdul in the Garden','Eating Together','Food and Fun','The World in My Home','Pochampalli','Home and Abroad','Spicy Riddles','Defence Officer Wahida','Chuskit Goes to School'] },

  // ══════ CLASS 5 ══════
  { std: 5, subject: 'Mathematics', code: 'eemh1', ch1: 1, chN: 14,
    names: ['The Fish Tale','Shapes and Angles','How Many Squares?','Parts and Wholes','Does it Look the Same?','Be My Multiple Ill Be Your Factor','Can You See the Pattern?','Mapping Your Way','Boxes and Sketches','Tenths and Hundredths','Area and its Boundary','Smart Charts','Ways to Multiply and Divide','How Big How Heavy'] },
  { std: 5, subject: 'English', code: 'eeen1', ch1: 1, chN: 10,
    names: ['Ice-Cream Man','Wonderful Waste','My Shadow','Robinson Crusoe Discovers a Footprint','Rip Van Winkle','Talkative Barber','Gullivers Travels','The Little Bully','Around the World','Who Will be Ningthou'] },
  { std: 5, subject: 'Hindi', code: 'ehhn1', ch1: 1, chN: 10,
    names: ['Rakh Ki Rassi','Faslon Ke Tyohaar','Khilaune Vaala','Nanha Phankar','Jaahan Chaah Vahaan Raah','Chitthi Ka Safar','Daaktar Ka Aaana','Dino Ke Baad','Mela','Gurur aur Kisaan'] },
  { std: 5, subject: 'EVS', code: 'eeap1', ch1: 1, chN: 10,
    names: ['Super Senses','A Snake Charmers Story','From Tasting to Digesting','Mangoes Round the Year','Seeds and Seeds','Every Drop Counts','Experiments with Water','A Treat for Mosquitoes','Up You Go','Walls Tell Stories'] },

  // ══════ CLASS 7 ══════
  { std: 7, subject: 'Science', code: 'gesc1', ch1: 1, chN: 18,
    names: ['Nutrition in Plants','Nutrition in Animals','Fibre to Fabric','Heat','Acids Bases and Salts','Physical and Chemical Changes','Weather Climate and Adaptations of Animals to Climate','Winds Storms and Cyclones','Soil','Respiration in Organisms','Transportation in Animals and Plants','Reproduction in Plants','Motion and Time','Electric Current and Its Effects','Light','Water A Precious Resource','Forests Our Lifeline','Wastewater Story'] },
  { std: 7, subject: 'English', code: 'gehc1', ch1: 1, chN: 10,
    names: ['Three Questions','A Gift of Chappals','Gopal and the Hilsa Fish','The Ashes That Made Trees Bloom','Quality','Expert Detectives','The Invention of Vita-Wonk','Fire: Friend and Foe','A Bicycle in Good Repair','The Story of Cricket'] },
  { std: 7, subject: 'Hindi', code: 'ghvs1', ch1: 1, chN: 10,
    names: ['Hum Panchhi Unmukt Gagan Ke','Dadi Maa','Himalaya Ki Betiyan','Kaathputli','Mithaiwala','Rakt Aur Hamara Shareer','Papa Kho Gaye','Sharam Ekta Aur Tava','Chidiya Ki Bachchi','Apsara Ki Sangit'] },
  { std: 7, subject: 'Social Studies', code: 'gess3', ch1: 1, chN: 9,
    names: ['Equality in Indian Democracy','Role of the Government in Health','How the State Government Works','Growing Up as Boys and Girls','Women Change the World','Understanding Media','Markets Around Us','A Shirt in the Market','Struggles for Equality'] },

  // ══════ CLASS 8 ══════
  { std: 8, subject: 'Mathematics', code: 'hemh1', ch1: 1, chN: 16,
    names: ['Rational Numbers','Linear Equations in One Variable','Understanding Quadrilaterals','Practical Geometry','Data Handling','Squares and Square Roots','Cubes and Cube Roots','Comparing Quantities','Algebraic Expressions and Identities','Visualising Solid Shapes','Mensuration','Exponents and Powers','Direct and Inverse Proportions','Factorisation','Introduction to Graphs','Playing with Numbers'] },
  { std: 8, subject: 'Science', code: 'hesc1', ch1: 1, chN: 18,
    names: ['Crop Production and Management','Microorganisms Friend and Foe','Coal and Petroleum','Combustion and Flame','Conservation of Plants and Animals','Reproduction in Animals','Reaching the Age of Adolescence','Force and Pressure','Friction','Sound','Chemical Effects of Electric Current','Some Natural Phenomena','Light','Stars and The Solar System','Pollution of Air and Water'] },
  { std: 8, subject: 'English', code: 'hehd1', ch1: 1, chN: 10,
    names: ['The Best Christmas Present in the World','The Tsunami','Glimpses of the Past','Bepin Choudhurys Lapse of Memory','The Summit Within','This is Jodys Fawn','A Visit to Cambridge','A Short Monsoon Diary','The Great Stone Face I','The Great Stone Face II'] },
  { std: 8, subject: 'Hindi', code: 'hhvs1', ch1: 1, chN: 10,
    names: ['Dhool','Lakh Ki Choodiyan','Bus Ki Yatra','Deewanone Ki Hasti','Chitthiyon Ki Anoothi Duniya','Bhagwan Ke Dakiye','Kya Nirash Hua Jaye','Yeh Danturit Muskan','Kabir Ki Sakhiyan','Kaamchor Aur Khas Kaa Kavi'] },

  // ══════ CLASS 9 ══════
  { std: 9, subject: 'Mathematics', code: 'iemh1', ch1: 1, chN: 15,
    names: ['Number Systems','Polynomials','Coordinate Geometry','Linear Equations in Two Variables','Introduction to Euclids Geometry','Lines and Angles','Triangles','Quadrilaterals','Areas of Parallelograms and Triangles','Circles','Constructions','Herons Formula','Surface Areas and Volumes','Statistics','Probability'] },
  { std: 9, subject: 'Science', code: 'iesc1', ch1: 1, chN: 15,
    names: ['Matter in Our Surroundings','Is Matter Around Us Pure?','Atoms and Molecules','Structure of the Atom','The Fundamental Unit of Life','Tissues','Diversity in Living Organisms','Motion','Force and Laws of Motion','Gravitation','Work and Energy','Sound','Why Do We Fall Ill','Natural Resources','Improvement in Food Resources'] },
  { std: 9, subject: 'English', code: 'iebe1', ch1: 1, chN: 11,
    names: ['The Fun They Had','The Sound of Music','The Little Girl','A Truly Beautiful Mind','The Snake and the Mirror','My Childhood','Packing','Reach for the Top','The Bond of Love','Kathmandu','If I Were You'] },

  // ══════ CLASS 10 ══════
  { std: 10, subject: 'Mathematics', code: 'jemh1', ch1: 1, chN: 15,
    names: ['Real Numbers','Polynomials','Pair of Linear Equations in Two Variables','Quadratic Equations','Arithmetic Progressions','Triangles','Coordinate Geometry','Introduction to Trigonometry','Some Applications of Trigonometry','Circles','Areas Related to Circles','Surface Areas and Volumes','Statistics','Probability'] },
  { std: 10, subject: 'Science', code: 'jesc1', ch1: 1, chN: 16,
    names: ['Chemical Reactions and Equations','Acids Bases and Salts','Metals and Non-Metals','Carbon and its Compounds','Life Processes','Control and Coordination','How do Organisms Reproduce?','Heredity and Evolution','Light – Reflection and Refraction','The Human Eye and the Colourful World','Electricity','Magnetic Effects of Electric Current','Our Environment','Sustainable Management of Natural Resources'] },
  { std: 10, subject: 'English', code: 'jeff1', ch1: 1, chN: 11,
    names: ['A Letter to God','Nelson Mandela Long Walk to Freedom','Two Stories about Flying','From the Diary of Anne Frank','The Hundred Dresses I','The Hundred Dresses II','Glimpses of India','Mijbil the Otter','Madam Rides the Bus','The Sermon at Benares','The Proposal'] },
  { std: 10, subject: 'Hindi', code: 'jhks1', ch1: 1, chN: 10,
    names: ['Soor Das','Tulsidas','Dev','Jaishankar Prasad','Suryakant Tripathi Nirala','Nagraj Manushyachar','Girijakumar Mathur','Rambriksh Benipuri','Manglesh Dabral','Swaroopanand'] },
  { std: 10, subject: 'Social Studies', code: 'jess1', ch1: 1, chN: 7,
    names: ['Resources and Development','Forest and Wildlife Resources','Water Resources','Agriculture','Minerals and Energy Resources','Manufacturing Industries','Lifelines of National Economy'] },
];

async function seedPdfs() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB\n');

  await NcertPdf.deleteMany({});
  console.log('Cleared existing PDF records\n');

  let total = 0;
  for (const book of BOOKS) {
    let seeded = 0;
    for (let ch = book.ch1; ch <= Math.min(book.chN, book.names.length); ch++) {
      const name = book.names[ch - 1];
      if (!name) continue;

      const ncertUrl = `${NCERT_BASE}/${book.code}${PAD(ch)}.pdf`;
      // Verify URL exists (skip if 404)
      try {
        const resp = await fetch(ncertUrl, { method: 'HEAD' });
        if (!resp.ok) {
          console.log(`  ⚠ ${book.subject} Std${book.std} ch${ch} - 404, skipping`);
          continue;
        }
      } catch {
        console.log(`  ⚠ ${book.subject} Std${book.std} ch${ch} - unreachable, skipping`);
        continue;
      }

      await NcertPdf.create({
        std: book.std, board: 'CBSE', subjectName: book.subject,
        chapterName: name, ncertUrl, language: 'en'
      });
      seeded++;
      total++;
    }
    console.log(`  ✓ Std ${book.std} ${book.subject} (${seeded} chapters)`);
  }

  await mongoose.disconnect();
  console.log(`\n✅ Done! ${total} verified PDF records seeded.`);
}

seedPdfs().catch(err => { console.error(err); process.exit(1); });
