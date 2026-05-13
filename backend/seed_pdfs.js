require('dotenv').config();
const mongoose = require('mongoose');
const NcertPdf = require('./src/models/NcertPdf');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';
const NCERT_BASE = 'https://ncert.nic.in/textbook/pdf';

const PAD = (n) => String(n).padStart(2, '0');

const BOOKS = [
  // ============ CLASS 1 ============
  { std: 1, subject: 'Mathematics', prefix: 'aemh1', ch1: 1, chN: 13,
    names: ['Shapes and Space','Numbers from One to Nine','Addition','Subtraction','Numbers from Ten to Twenty','Time','Measurement','Numbers from Twenty-one to Fifty','Data Handling','Patterns','Numbers','Money','How Many'] },
  { std: 1, subject: 'English', prefix: 'aeen1', ch1: 1, chN: 10,
    names: ['A Happy Child','Three Little Pigs','After a Bath','The Bubble the Straw and the Shoe','One Little Kitten','Lalu and Peelu','Once I Saw a Little Bird','The Tiger and the Mosquito','Clouds','Anandis Rainbow'] },
  { std: 1, subject: 'Hindi', prefix: 'ahhn1', ch1: 1, chN: 10,
    names: ['Jhoola','Aam Ki Kahani','Aam Ki Tokri','Patte Hi Patte','Pakodi','Chhuk Chhuk Gaadi','Rasoighar','Chuho Miyaan','Aaloo Chaaval','Titali Aur Kali'] },
  // ============ CLASS 2 ============
  { std: 2, subject: 'Mathematics', prefix: 'bemh1', ch1: 1, chN: 15,
    names: ['What is Long What is Round?','Counting in Groups','How Much Can You Carry?','Counting in Tens','Patterns','Footprints','Jugs and Mugs','Tens and Ones','My Funday','Add Our Points','Lines and Lines','Give and Take','The Longest Step','Birds Come Birds Go','How Many Ponytails?'] },
  { std: 2, subject: 'English', prefix: 'been1', ch1: 1, chN: 10,
    names: ['First Day at School','Haldis Adventure','I am Lucky','I Want','A Smile','The Wind and the Sun','Mushroom','Strange Talk','Granny Granny Please Comb My Hair','The Grasshopper and the Ant'] },
  { std: 2, subject: 'Hindi', prefix: 'bhhn1', ch1: 1, chN: 10,
    names: ['Oont Chala','Bhaalu Ne Kheli Football','Miyaun Miyaun','Adhik Balwan Kaun','Dost Ki Madad','Bahut Hua','Meri Kitaab','Titli Aur Kali','Bulbul','Mithu Mithu'] },
  // ============ CLASS 3 ============
  { std: 3, subject: 'Mathematics', prefix: 'cemh1', ch1: 1, chN: 14,
    names: ['Where to Look From','Fun with Numbers','Give and Take','Long and Short','Shapes and Designs','Fun with Give and Take','Time Goes On','Who is Heavier?','How Many Times?','Play with Patterns','Jugs and Mugs','Can We Share?','Smart Charts','Rupees and Paise'] },
  { std: 3, subject: 'English', prefix: 'ceen1', ch1: 1, chN: 10,
    names: ['Good Morning','The Magic Garden','Bird Talk','Nina and the Baby Sparrows','Little by Little','The Enormous Turnip','Sea Song','A Little Fish Story','The Yellow Butterfly','The Ship of the Desert'] },
  { std: 3, subject: 'Hindi', prefix: 'chhn1', ch1: 1, chN: 10,
    names: ['Seedi Bachchi','Shekhibaaz Makkhi','Chand Wali Amma','Man Karta Hai','Bahadur Bitto','Hamse Sab Kahte','Tapr Toap','Mujhe Peero!','Kya Dharu Kya Naa','Kyonjimal'] },
  { std: 3, subject: 'EVS', prefix: 'ceap1', ch1: 1, chN: 10,
    names: ['Poonams Day Out','The Plant Fairy','Water O Water','Our First School','Chhotus House','Foods We Eat','Saying without Speaking','Flying High','Its Raining','What is Cooking'] },
  // ============ CLASS 4 ============
  { std: 4, subject: 'Mathematics', prefix: 'demh1', ch1: 1, chN: 14,
    names: ['Building with Bricks','Long and Short','A Trip to Bhopal','Tick Tick Tick','The Way the World Looks','The Junk Seller','Jugs and Mugs','Carts and Wheels','Halves and Quarters','Play with Patterns','Tables and Shares','How Heavy How Light','Fields and Fences','Smart Charts'] },
  { std: 4, subject: 'English', prefix: 'deen1', ch1: 1, chN: 9,
    names: ['Wake Up','Nehas Alarm Clock','Noses','The Little Fir Tree','Run','Nasruddins Aim','Why','Alice in Wonderland','Dont Be Afraid of the Dark'] },
  { std: 4, subject: 'Hindi', prefix: 'dhhn1', ch1: 1, chN: 10,
    names: ['Mann Ke Bhole Bhale Badal','Jaisa Sawaal Waisa Jawaab','Kirmich Ki Gend','Paapa Jab Bachche The','Dost Ki Poshak','Naav Banao Naav Banao','Daani Ka Kaaryakram','Kaun','Swatantrata Ki Aur','Thapp Roti Thapp Daal'] },
  { std: 4, subject: 'EVS', prefix: 'deap1', ch1: 1, chN: 10,
    names: ['Going to School','Ear to Ear','A Day with Nandu','The Story of Amrita','Anitas Kitchen','OManas Journey','From the Window','Reaching Grandmothers House','Changing Families','Hu Tu Tu Hu Tu Tu'] },
  // ============ CLASS 5 ============
  { std: 5, subject: 'Mathematics', prefix: 'eemh1', ch1: 1, chN: 14,
    names: ['The Fish Tale','Shapes and Angles','How Many Squares?','Parts and Wholes','Does it Look the Same?','Be My Multiple Ill Be Your Factor','Can You See the Pattern?','Mapping Your Way','Boxes and Sketches','Tenths and Hundredths','Area and its Boundary','Smart Charts','Ways to Multiply and Divide','How Big How Heavy'] },
  { std: 5, subject: 'English', prefix: 'eeen1', ch1: 1, chN: 10,
    names: ['Ice-Cream Man','Wonderful Waste','My Shadow','Robinson Crusoe Discovers a Footprint','Rip Van Winkle','Talkative Barber','Gullivers Travels','The Little Bully','Around the World','Who Will be Ningthou'] },
  { std: 5, subject: 'Hindi', prefix: 'ehhn1', ch1: 1, chN: 10,
    names: ['Rakh Ki Rassi','Faslon Ke Tyohaar','Khilaune Vaala','Nanha Phankar','Jaahan Chaah Vahaan Raah','Chitthi Ka Safar','Daaktar Ka Aaana','Dino Ke Baad','Mela','Gurur aur Kisaan'] },
  { std: 5, subject: 'EVS', prefix: 'eeap1', ch1: 1, chN: 10,
    names: ['Super Senses','A Snake Charmers Story','From Tasting to Digesting','Mangoes Round the Year','Seeds and Seeds','Every Drop Counts','Experiments with Water','A Treat for Mosquitoes','Up You Go','Walls Tell Stories'] },
  // ============ CLASS 6 ============
  { std: 6, subject: 'Science', prefix: 'fesc1', ch1: 1, chN: 16,
    names: ['Food: Where Does It Come From?','Components of Food','Fibre to Fabric','Sorting Materials into Groups','Separation of Substances','Changes Around Us','Getting to Know Plants','Body Movements','The Living Organisms and Their Surroundings','Motion and Measurement of Distances','Light Shadows and Reflections','Electricity and Circuits','Fun with Magnets','Water','Air Around Us','Garbage In Garbage Out'] },
  { std: 6, subject: 'Mathematics', prefix: 'femh1', ch1: 1, chN: 14,
    names: ['Knowing Our Numbers','Whole Numbers','Playing with Numbers','Basic Geometrical Ideas','Understanding Elementary Shapes','Integers','Fractions','Decimals','Data Handling','Mensuration','Algebra','Ratio and Proportion','Symmetry','Practical Geometry'] },
  // ============ CLASS 7 ============
  { std: 7, subject: 'Science', prefix: 'gesc1', ch1: 1, chN: 18,
    names: ['Nutrition in Plants','Nutrition in Animals','Fibre to Fabric','Heat','Acids Bases and Salts','Physical and Chemical Changes','Weather Climate and Adaptations of Animals to Climate','Winds Storms and Cyclones','Soil','Respiration in Organisms','Transportation in Animals and Plants','Reproduction in Plants','Motion and Time','Electric Current and Its Effects','Light','Water A Precious Resource','Forests Our Lifeline','Wastewater Story'] },
  { std: 7, subject: 'Mathematics', prefix: 'gemh1', ch1: 1, chN: 15,
    names: ['Integers','Fractions and Decimals','Data Handling','Simple Equations','Lines and Angles','The Triangle and Its Properties','Congruence of Triangles','Comparing Quantities','Rational Numbers','Practical Geometry','Perimeter and Area','Algebraic Expressions','Exponents and Powers','Symmetry','Visualising Solid Shapes'] },
  // ============ CLASS 8 ============
  { std: 8, subject: 'Science', prefix: 'hesc1', ch1: 1, chN: 18,
    names: ['Crop Production and Management','Microorganisms Friend and Foe','Coal and Petroleum','Combustion and Flame','Conservation of Plants and Animals','Reproduction in Animals','Reaching the Age of Adolescence','Force and Pressure','Friction','Sound','Chemical Effects of Electric Current','Some Natural Phenomena','Light','Stars and The Solar System','Pollution of Air and Water'] },
  { std: 8, subject: 'Mathematics', prefix: 'hemh1', ch1: 1, chN: 16,
    names: ['Rational Numbers','Linear Equations in One Variable','Understanding Quadrilaterals','Practical Geometry','Data Handling','Squares and Square Roots','Cubes and Cube Roots','Comparing Quantities','Algebraic Expressions and Identities','Visualising Solid Shapes','Mensuration','Exponents and Powers','Direct and Inverse Proportions','Factorisation','Introduction to Graphs','Playing with Numbers'] },
  // ============ CLASS 9 ============
  { std: 9, subject: 'Science', prefix: 'iesc1', ch1: 1, chN: 15,
    names: ['Matter in Our Surroundings','Is Matter Around Us Pure?','Atoms and Molecules','Structure of the Atom','The Fundamental Unit of Life','Tissues','Diversity in Living Organisms','Motion','Force and Laws of Motion','Gravitation','Work and Energy','Sound','Why Do We Fall Ill','Natural Resources','Improvement in Food Resources'] },
  { std: 9, subject: 'Mathematics', prefix: 'iemh1', ch1: 1, chN: 15,
    names: ['Number Systems','Polynomials','Coordinate Geometry','Linear Equations in Two Variables','Introduction to Euclids Geometry','Lines and Angles','Triangles','Quadrilaterals','Areas of Parallelograms and Triangles','Circles','Constructions','Herons Formula','Surface Areas and Volumes','Statistics','Probability'] },
  // ============ CLASS 10 ============
  { std: 10, subject: 'Science', prefix: 'jesc1', ch1: 1, chN: 16,
    names: ['Chemical Reactions and Equations','Acids Bases and Salts','Metals and Non-Metals','Carbon and its Compounds','Life Processes','Control and Coordination','How do Organisms Reproduce?','Heredity and Evolution','Light – Reflection and Refraction','The Human Eye and the Colourful World','Electricity','Magnetic Effects of Electric Current','Our Environment','Sustainable Management of Natural Resources'] },
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

  await mongoose.disconnect();
  console.log(`\n✅ Done! ${total} PDF records seeded for classes 1-10.`);
}

seedPdfs().catch(err => { console.error(err); process.exit(1); });
