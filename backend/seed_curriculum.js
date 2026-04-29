// ═══════════════════════════════════════════════════════════════
// COMPREHENSIVE NCERT/CBSE CURRICULUM SEEDER — Classes 1–12
// Source: Official NCERT textbooks (ncert.nic.in) & CBSE Syllabus 2025-26
// ═══════════════════════════════════════════════════════════════
const mongoose = require('mongoose');
require('dotenv').config();

const Curriculum = require('./models/Curriculum');
const Quiz = require('./models/Quiz');
const KnowledgeGraph = require('./models/KnowledgeGraph');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

// Helper: upsert a curriculum entry
async function upsertCurriculum(entry) {
  await Curriculum.findOneAndUpdate(
    { subjectName: entry.subjectName, std: entry.std, board: entry.board },
    entry,
    { upsert: true, new: true }
  );
}

// Helper: upsert a quiz entry
async function upsertQuiz(entry) {
  await Quiz.findOneAndUpdate(
    { subjectName: entry.subjectName, chapterName: entry.chapterName },
    entry,
    { upsert: true, new: true }
  );
}

// Helper: upsert a knowledge graph entry
async function upsertGraph(entry) {
  await KnowledgeGraph.findOneAndUpdate(
    { subjectName: entry.subjectName, std: entry.std, board: entry.board },
    entry,
    { upsert: true, new: true }
  );
}

async function seedAll() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB for curriculum seeding');

  const BOARD = 'CBSE';


  // ═══════════════════════════════════════════════════════════
  // CLASS 1
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 1...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 1, board: BOARD,
    chapters: [
      { chapterName: 'Shapes and Space', description: 'Identifying basic shapes — circles, squares, triangles, rectangles in surroundings' },
      { chapterName: 'Numbers from One to Nine', description: 'Counting, reading and writing numbers 1-9' },
      { chapterName: 'Addition', description: 'Adding single-digit numbers using objects and pictures' },
      { chapterName: 'Subtraction', description: 'Taking away — understanding subtraction with visuals' },
      { chapterName: 'Numbers from Ten to Twenty', description: 'Place value introduction, teen numbers' },
      { chapterName: 'Time', description: 'Understanding earlier, later, morning, evening concepts' },
      { chapterName: 'Measurement', description: 'Comparing lengths, weights — longer, shorter, heavier, lighter' },
      { chapterName: 'Numbers from Twenty-one to Fifty', description: 'Reading, writing and ordering numbers to 50' },
      { chapterName: 'Data Handling', description: 'Collecting and recording simple data using pictures' },
      { chapterName: 'Patterns', description: 'Recognizing and extending simple patterns' },
      { chapterName: 'Numbers', description: 'Numbers up to 100, skip counting by 2s, 5s, 10s' },
      { chapterName: 'Money', description: 'Identifying coins and notes, simple transactions' },
      { chapterName: 'How Many', description: 'Counting in groups, estimation' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 1, board: BOARD,
    chapters: [
      { chapterName: 'A Happy Child', description: 'Poem — rhyming words, basic vocabulary' },
      { chapterName: 'Three Little Kittens', description: 'Story — reading comprehension, animal vocabulary' },
      { chapterName: 'After a Bath', description: 'Poem — daily routine vocabulary, action words' },
      { chapterName: 'The Bubble, the Straw and the Shoe', description: 'Story — friendship, cooperation' },
      { chapterName: 'One Little Kitten', description: 'Poem — counting, animal names' },
      { chapterName: 'Lalu and Peelu', description: 'Story — colours, descriptions' },
      { chapterName: 'Once I Saw a Little Bird', description: 'Poem — nature, observation' },
      { chapterName: 'Mittu and the Yellow Mango', description: 'Story — fruits, sharing' },
      { chapterName: 'Merry-Go-Round', description: 'Poem — playground, fun activities' },
      { chapterName: 'Circle', description: 'Story — shapes in everyday life' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 1, board: BOARD,
    chapters: [
      { chapterName: 'झूला', description: 'कविता — खेल और प्रकृति' },
      { chapterName: 'आम की कहानी', description: 'कहानी — फलों के नाम, ऋतुएँ' },
      { chapterName: 'आम की टोकरी', description: 'कविता — गिनती, फल' },
      { chapterName: 'पत्ते ही पत्ते', description: 'कहानी — पेड़-पौधे, पत्तों की विविधता' },
      { chapterName: 'पकौड़ी', description: 'कविता — भोजन, स्वाद' },
      { chapterName: 'छोटी का कमाल', description: 'कहानी — बहादुरी, आत्मविश्वास' },
      { chapterName: 'रसोईघर', description: 'कविता — रसोई की वस्तुएँ' },
      { chapterName: 'चूहो! म्याऊँ सो रही है', description: 'कहानी — जानवर, चतुराई' },
      { chapterName: 'बंदर और गिलहरी', description: 'कविता — जानवर, दोस्ती' },
      { chapterName: 'पगड़ी', description: 'कहानी — पहनावा, परंपरा' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'EVS', std: 1, board: BOARD,
    chapters: [
      { chapterName: 'My Family', description: 'Family members, relationships, living together' },
      { chapterName: 'My Body', description: 'Body parts, senses, personal hygiene' },
      { chapterName: 'Food We Eat', description: 'Types of food, healthy eating habits' },
      { chapterName: 'Our Clothes', description: 'Types of clothes, weather-appropriate dressing' },
      { chapterName: 'Our House', description: 'Types of houses, rooms, keeping house clean' },
      { chapterName: 'Plants Around Us', description: 'Parts of a plant, types of plants' },
      { chapterName: 'Animals Around Us', description: 'Domestic and wild animals, pet care' },
      { chapterName: 'Water', description: 'Uses of water, sources, conservation' },
      { chapterName: 'Weather and Seasons', description: 'Rainy, summer, winter — changes in nature' },
      { chapterName: 'Transport', description: 'Modes of transport, road safety basics' }
    ]
  });

  // ═══════════════════════════════════════════════════════════
  // CLASS 2
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 2...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 2, board: BOARD,
    chapters: [
      { chapterName: 'What is Long, What is Round?', description: 'Shapes and their properties, 3D shapes introduction' },
      { chapterName: 'Counting in Groups', description: 'Skip counting, grouping objects in 2s, 5s, 10s' },
      { chapterName: 'How Much Can You Carry?', description: 'Weight comparison — heavier, lighter, balancing' },
      { chapterName: 'Counting in Tens', description: 'Place value — tens and ones, numbers up to 100' },
      { chapterName: 'Patterns', description: 'Growing patterns, number patterns, tiling' },
      { chapterName: 'Footprints', description: 'Measurement using non-standard units — foot lengths, handspans' },
      { chapterName: 'Jugs and Mugs', description: 'Capacity — comparing volumes, full, half, empty' },
      { chapterName: 'Tens and Ones', description: 'Two-digit numbers, expanded form' },
      { chapterName: 'My Funday', description: 'Reading a calendar, days of the week, dates' },
      { chapterName: 'Add Our Points', description: 'Addition of two-digit numbers with and without carry' },
      { chapterName: 'Lines and Lines', description: 'Straight lines, curved lines, standing and sleeping lines' },
      { chapterName: 'Give and Take', description: 'Subtraction of two-digit numbers, word problems' },
      { chapterName: 'The Longest Step', description: 'Measuring length — estimation and comparison' },
      { chapterName: 'Birds Come, Birds Go', description: 'Data collection using tally marks, pictographs' },
      { chapterName: 'How Many Ponytails?', description: 'Data handling, counting and comparing' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 2, board: BOARD,
    chapters: [
      { chapterName: 'First Day at School', description: 'Poem — school life, feelings, rhyming' },
      { chapterName: 'Haldi\'s Adventure', description: 'Story — animal adventure, comprehension' },
      { chapterName: 'I am Lucky!', description: 'Poem — gratitude, self-awareness' },
      { chapterName: 'I Want', description: 'Story — wishes, imagination, descriptive writing' },
      { chapterName: 'A Smile', description: 'Poem — kindness, happiness' },
      { chapterName: 'The Wind and the Sun', description: 'Story — Aesop\'s fable, persuasion vs force' },
      { chapterName: 'Rain', description: 'Poem — weather, nature vocabulary' },
      { chapterName: 'Zoo Manners', description: 'Story — animals, proper behavior' },
      { chapterName: 'Greetings', description: 'Poem — social skills, politeness' },
      { chapterName: 'The Grasshopper and the Ant', description: 'Story — hard work, planning ahead' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 2, board: BOARD,
    chapters: [
      { chapterName: 'ऊँट चला', description: 'कविता — जानवर, हास्य' },
      { chapterName: 'भालू ने खेली फुटबॉल', description: 'कहानी — खेल, जानवर' },
      { chapterName: 'म्याऊँ, म्याऊँ!!', description: 'कविता — बिल्ली, ध्वनि' },
      { chapterName: 'अधिक बलवान कौन?', description: 'कहानी — प्रकृति की शक्तियाँ' },
      { chapterName: 'दोस्त की मदद', description: 'कहानी — मित्रता, सहयोग' },
      { chapterName: 'बहुत हुआ', description: 'कविता — पर्यावरण, जागरूकता' },
      { chapterName: 'मेरी किताब', description: 'कविता — पढ़ाई का महत्व' },
      { chapterName: 'तितली और कली', description: 'कविता — प्रकृति, सुंदरता' },
      { chapterName: 'बुलबुल', description: 'कहानी — पक्षी, स्वतंत्रता' },
      { chapterName: 'मीठी सारंगी', description: 'कहानी — संगीत, कला' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'EVS', std: 2, board: BOARD,
    chapters: [
      { chapterName: 'My Neighbourhood', description: 'People around us, helpers in the community' },
      { chapterName: 'Our School', description: 'School environment, classrooms, playground' },
      { chapterName: 'Good Habits', description: 'Cleanliness, manners, daily routine' },
      { chapterName: 'Air and Water', description: 'Importance of clean air and water, pollution basics' },
      { chapterName: 'Our Earth', description: 'Land forms, water bodies on Earth' },
      { chapterName: 'Food and Health', description: 'Balanced diet, junk food vs healthy food' },
      { chapterName: 'Safety Rules', description: 'Road safety, fire safety, stranger danger' },
      { chapterName: 'National Symbols', description: 'Flag, emblem, anthem, national animal and bird' },
      { chapterName: 'Festivals of India', description: 'Major festivals, unity in diversity' },
      { chapterName: 'The World of Animals', description: 'Habitats, food habits, baby animals' }
    ]
  });


  // ═══════════════════════════════════════════════════════════
  // CLASS 3
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 3...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 3, board: BOARD,
    chapters: [
      { chapterName: 'Where to Look From', description: 'Perspective and viewpoints, top view, front view' },
      { chapterName: 'Fun with Numbers', description: 'Numbers up to 1000, comparison, ordering' },
      { chapterName: 'Give and Take', description: 'Addition and subtraction of 3-digit numbers' },
      { chapterName: 'Long and Short', description: 'Measuring length in cm and m, estimation' },
      { chapterName: 'Shapes and Designs', description: 'Tiling patterns, symmetry, rangoli' },
      { chapterName: 'Fun with Give and Take', description: 'Word problems on addition and subtraction' },
      { chapterName: 'Time Goes On', description: 'Reading clock — hours and minutes, calendar' },
      { chapterName: 'Who is Heavier?', description: 'Weighing in grams and kilograms' },
      { chapterName: 'How Many Times?', description: 'Introduction to multiplication — groups and repeated addition' },
      { chapterName: 'Play with Patterns', description: 'Number patterns, growing patterns, magic squares' },
      { chapterName: 'Jugs and Mugs', description: 'Measuring capacity in litres and millilitres' },
      { chapterName: 'Can We Share?', description: 'Introduction to division — equal sharing' },
      { chapterName: 'Smart Charts', description: 'Bar graphs, pictographs, data interpretation' },
      { chapterName: 'Rupees and Paise', description: 'Money — bills, making change, simple transactions' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 3, board: BOARD,
    chapters: [
      { chapterName: 'Good Morning', description: 'Poem — greetings, nature in the morning' },
      { chapterName: 'The Magic Garden', description: 'Story — imagination, descriptive vocabulary' },
      { chapterName: 'Bird Talk', description: 'Poem — birds, sounds of nature' },
      { chapterName: 'Nina and the Baby Sparrows', description: 'Story — caring for animals, empathy' },
      { chapterName: 'The Little Fish', description: 'Poem — contentment, moral values' },
      { chapterName: 'The Enormous Turnip', description: 'Story — teamwork, cooperation' },
      { chapterName: 'Sea Song', description: 'Poem — ocean, marine life vocabulary' },
      { chapterName: 'A Little Turtle', description: 'Poem — animals, movement verbs' },
      { chapterName: 'The Balloon Man', description: 'Poem — colours, festival atmosphere' },
      { chapterName: 'The Story of the Road', description: 'Story — transportation, community helpers' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 3, board: BOARD,
    chapters: [
      { chapterName: 'कक्कू', description: 'कविता — पक्षी कोयल, ऋतु बसंत' },
      { chapterName: 'शेखीबाज़ मक्खी', description: 'कहानी — घमंड का परिणाम' },
      { chapterName: 'चाँद वाली अम्मा', description: 'कहानी — दादी माँ, पारिवारिक प्रेम' },
      { chapterName: 'मन करता है', description: 'कविता — बचपन की इच्छाएँ' },
      { chapterName: 'हमसे सब कहते', description: 'कहानी — बच्चों की जिज्ञासा' },
      { chapterName: 'सबसे अच्छा पेड़', description: 'कहानी — पेड़ों का महत्व, पर्यावरण' },
      { chapterName: 'टिपटिपवा', description: 'कविता — बारिश, मौसम' },
      { chapterName: 'बंदर बाँट', description: 'कहानी — न्याय, बँटवारा' },
      { chapterName: 'अक्ल बड़ी या भैंस', description: 'कहानी — बुद्धि का उपयोग' },
      { chapterName: 'क्योंजीमल और कैसे कैसलिया', description: 'कहानी — जिज्ञासा, प्रश्न पूछना' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'EVS', std: 3, board: BOARD,
    chapters: [
      { chapterName: 'Poonam\'s Day Out', description: 'Observing animals, their homes and habits' },
      { chapterName: 'The Plant Fairy', description: 'How plants grow, parts of plants' },
      { chapterName: 'Water O Water', description: 'Sources of water, conservation, water cycle' },
      { chapterName: 'Our First School', description: 'Family as first school, learning from elders' },
      { chapterName: 'Chhotu\'s House', description: 'Different types of houses, materials used' },
      { chapterName: 'Foods We Eat', description: 'Variety of food across India, cooking methods' },
      { chapterName: 'Saying Without Speaking', description: 'Animal communication, body language' },
      { chapterName: 'Flying High', description: 'Birds — types, features, nests, migration' },
      { chapterName: 'It\'s Raining', description: 'Rain, weather changes, daily life effects' },
      { chapterName: 'What is Cooking?', description: 'Fuels for cooking, kitchen safety, utensils' },
      { chapterName: 'From Here to There', description: 'Communication and transport — past and present' },
      { chapterName: 'Work We Do', description: 'Different occupations, respect for all work' }
    ]
  });

  // ═══════════════════════════════════════════════════════════
  // CLASS 4
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 4...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 4, board: BOARD,
    chapters: [
      { chapterName: 'Building with Bricks', description: 'Patterns using bricks, floor plans, area concepts' },
      { chapterName: 'Long and Short', description: 'Measuring length, converting km-m-cm' },
      { chapterName: 'A Trip to Bhopal', description: 'Reading maps, distance, fare charts' },
      { chapterName: 'Tick Tick Tick', description: 'Time — reading clocks, duration, timetables' },
      { chapterName: 'The Way the World Looks', description: 'Mapping, directions, bird\'s eye view' },
      { chapterName: 'The Junk Seller', description: 'Weight — kg and g, weighing balance' },
      { chapterName: 'Jugs and Mugs', description: 'Volume and capacity, litres and ml' },
      { chapterName: 'Carts and Wheels', description: 'Circles, radius, drawing circles' },
      { chapterName: 'Halves and Quarters', description: 'Fractions — half, quarter, three-fourths' },
      { chapterName: 'Play with Patterns', description: 'Number sequences, magic triangles, tessellations' },
      { chapterName: 'Tables and Shares', description: 'Multiplication tables up to 10, division' },
      { chapterName: 'How Heavy? How Light?', description: 'Estimation of weight, standard units' },
      { chapterName: 'Fields and Fences', description: 'Perimeter — calculating boundary lengths' },
      { chapterName: 'Smart Charts', description: 'Data handling using bar graphs and tables' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 4, board: BOARD,
    chapters: [
      { chapterName: 'Wake Up!', description: 'Poem — morning, nature, seasons' },
      { chapterName: 'Neha\'s Alarm Clock', description: 'Story — responsibility, time management' },
      { chapterName: 'Noses', description: 'Poem — animals and their noses, comparisons' },
      { chapterName: 'The Little Fir Tree', description: 'Story — contentment, wishing for change' },
      { chapterName: 'Run!', description: 'Poem — exercise, outdoor activities' },
      { chapterName: 'Nasruddin\'s Aim', description: 'Story — humor, wit, Nasruddin tales' },
      { chapterName: 'Why?', description: 'Poem — curiosity, questioning nature' },
      { chapterName: 'Alice in Wonderland', description: 'Story — fantasy, imagination, adventure' },
      { chapterName: 'Don\'t Be Afraid of the Dark', description: 'Poem — courage, overcoming fear' },
      { chapterName: 'Helen Keller', description: 'Biography — determination, overcoming disability' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 4, board: BOARD,
    chapters: [
      { chapterName: 'मन के भोले-भाले बादल', description: 'कविता — बादल, कल्पना' },
      { chapterName: 'जैसा सवाल वैसा जवाब', description: 'कहानी — चतुराई, बुद्धिमत्ता' },
      { chapterName: 'किरमिच की गेंद', description: 'कहानी — खेल, दोस्ती' },
      { chapterName: 'पापा जब बच्चे थे', description: 'कहानी — बचपन की यादें' },
      { chapterName: 'दोस्त की पोशाक', description: 'कहानी — बाहरी दिखावा vs असली गुण' },
      { chapterName: 'नाव बनाओ नाव बनाओ', description: 'कविता — बारिश, कागज़ की नाव' },
      { chapterName: 'दान का हिसाब', description: 'कहानी — ईमानदारी, गणित' },
      { chapterName: 'ऐसे-ऐसे', description: 'कहानी — हास्य, बीमारी का बहाना' },
      { chapterName: 'स्वतंत्रता की ओर', description: 'कहानी — देशभक्ति' },
      { chapterName: 'थप्प रोटी थप्प दाल', description: 'कविता — भोजन, खेल' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'EVS', std: 4, board: BOARD,
    chapters: [
      { chapterName: 'Going to School', description: 'Different ways children reach school across India' },
      { chapterName: 'Ear to Ear', description: 'Hearing, sound, caring for ears' },
      { chapterName: 'A Day with Nandu', description: 'Elephants — habitat, family, conservation' },
      { chapterName: 'The Story of Amrita', description: 'Trees, Bishnoi community, environmental protection' },
      { chapterName: 'Anita and the Honeybees', description: 'Bees, honey making, pollination' },
      { chapterName: 'Omana\'s Journey', description: 'Kerala backwaters, water transport' },
      { chapterName: 'From the Window', description: 'Observing from a train, landscapes' },
      { chapterName: 'Reaching Grandmother\'s House', description: 'Different terrains, travel' },
      { chapterName: 'Changing Families', description: 'Family structures, joint and nuclear families' },
      { chapterName: 'The World in My Home', description: 'Diversity, religions, languages' },
      { chapterName: 'The Valley of Flowers', description: 'Mountains, flora, national parks' },
      { chapterName: 'Changing Times', description: 'How things have changed — then and now' }
    ]
  });

  // ═══════════════════════════════════════════════════════════
  // CLASS 5
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 5...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 5, board: BOARD,
    chapters: [
      { chapterName: 'The Fish Tale', description: 'Large numbers, place value, Indian numbering system' },
      { chapterName: 'Shapes and Angles', description: 'Types of angles — right, acute, obtuse; shapes' },
      { chapterName: 'How Many Squares?', description: 'Area — counting squares, sq cm, sq m' },
      { chapterName: 'Parts and Wholes', description: 'Fractions — equivalent, comparing, mixed numbers' },
      { chapterName: 'Does It Look the Same?', description: 'Symmetry — line of symmetry, mirror images' },
      { chapterName: 'Be My Multiple, I\'ll Be Your Factor', description: 'Multiples, factors, prime and composite' },
      { chapterName: 'Can You See the Pattern?', description: 'Number and shape patterns, rules of patterns' },
      { chapterName: 'Mapping Your Way', description: 'Maps, scale, directions, coordinates' },
      { chapterName: 'Boxes and Sketches', description: '3D shapes — cubes, cuboids, nets of shapes' },
      { chapterName: 'Tenths and Hundredths', description: 'Decimals — introduction, place value, money' },
      { chapterName: 'Area and Its Boundary', description: 'Area vs perimeter, composite shapes' },
      { chapterName: 'Smart Charts', description: 'Pie charts, bar graphs, data interpretation' },
      { chapterName: 'Ways to Multiply and Divide', description: 'Multi-digit multiplication and long division' },
      { chapterName: 'How Big? How Heavy?', description: 'Volume, weight, real-life measurement problems' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 5, board: BOARD,
    chapters: [
      { chapterName: 'Ice Cream Man', description: 'Poem — summer, ice cream vendor' },
      { chapterName: 'Wonderful Waste!', description: 'Story — recycling, composting, waste management' },
      { chapterName: 'Teamwork', description: 'Poem — cooperation, working together' },
      { chapterName: 'Flying Together', description: 'Story — birds, migration, unity' },
      { chapterName: 'My Shadow', description: 'Poem — Robert Louis Stevenson, observation' },
      { chapterName: 'Robinson Crusoe', description: 'Story — adventure, survival, resilience' },
      { chapterName: 'Crying', description: 'Poem — emotions, expression' },
      { chapterName: 'My Elder Brother', description: 'Story — Premchand, sibling relationships' },
      { chapterName: 'The Lazy Frog', description: 'Poem — humor, laziness' },
      { chapterName: 'Rip Van Winkle', description: 'Story — classic tale, passage of time' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 5, board: BOARD,
    chapters: [
      { chapterName: 'राख की रस्सी', description: 'कहानी — अकबर-बीरबल, बुद्धिमत्ता' },
      { chapterName: 'फ़सलों के त्योहार', description: 'लेख — भारत के त्योहार, खेती' },
      { chapterName: 'खिलौनेवाला', description: 'कविता — बचपन, खिलौने' },
      { chapterName: 'नन्हा फ़नकार', description: 'कहानी — कला, प्रतिभा' },
      { chapterName: 'जहाँ चाह वहाँ राह', description: 'कहानी — संकल्प, मेहनत' },
      { chapterName: 'चिट्ठी का सफ़र', description: 'लेख — डाक सेवा, संचार का इतिहास' },
      { chapterName: 'डाकिए की कहानी, कँवरसिंह की ज़ुबानी', description: 'साक्षात्कार — सेवा, समर्पण' },
      { chapterName: 'वे दिन भी क्या दिन थे', description: 'कहानी — विज्ञान कथा, भविष्य' },
      { chapterName: 'पानी रे पानी', description: 'लेख — जल संरक्षण, जल संकट' },
      { chapterName: 'बिशन की दिलेरी', description: 'कहानी — बहादुरी, साहस' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'EVS', std: 5, board: BOARD,
    chapters: [
      { chapterName: 'Super Senses', description: 'Animal senses — sight, smell, hearing compared to humans' },
      { chapterName: 'A Snake Charmer\'s Story', description: 'Snakes, wildlife protection laws' },
      { chapterName: 'From Tasting to Digesting', description: 'Digestive system, taste buds, nutrition' },
      { chapterName: 'Mangoes Round the Year', description: 'Food preservation — drying, pickling, freezing' },
      { chapterName: 'Seeds and Seeds', description: 'Seed dispersal, germination, plant reproduction' },
      { chapterName: 'Every Drop Counts', description: 'Water scarcity, rainwater harvesting, conservation' },
      { chapterName: 'Experiments with Water', description: 'Solubility, filtration, sedimentation' },
      { chapterName: 'A Treat for Mosquitoes', description: 'Malaria, dengue, disease prevention' },
      { chapterName: 'Up You Go!', description: 'Mountains, altitude, life in hilly areas' },
      { chapterName: 'Walls Tell Stories', description: 'Historical monuments, architecture, heritage' },
      { chapterName: 'Sunita in Space', description: 'Sunita Williams, space exploration, gravity' },
      { chapterName: 'What If It Finishes?', description: 'Fossil fuels, renewable energy, conservation' },
      { chapterName: 'A Shelter So High!', description: 'Houses in different climates, building materials' },
      { chapterName: 'When the Earth Shook!', description: 'Earthquakes, disaster preparedness, safety' },
      { chapterName: 'Blow Hot, Blow Cold', description: 'Breathing, air, lungs, respiratory system basics' }
    ]
  });

  // ═══════════════════════════════════════════════════════════
  // CLASS 6
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 6...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 6, board: BOARD,
    chapters: [
      { chapterName: 'Knowing Our Numbers', description: 'Comparing numbers, Indian and International place value, estimation' },
      { chapterName: 'Whole Numbers', description: 'Natural numbers, whole numbers, number line, properties' },
      { chapterName: 'Playing with Numbers', description: 'Factors, multiples, prime, composite, HCF, LCM' },
      { chapterName: 'Basic Geometrical Ideas', description: 'Points, lines, line segments, rays, curves, polygons' },
      { chapterName: 'Understanding Elementary Shapes', description: 'Angles, triangles, quadrilaterals, 3D shapes' },
      { chapterName: 'Integers', description: 'Negative numbers, number line, addition and subtraction of integers' },
      { chapterName: 'Fractions', description: 'Types of fractions, comparison, addition, subtraction' },
      { chapterName: 'Decimals', description: 'Place value, comparison, operations on decimals' },
      { chapterName: 'Data Handling', description: 'Pictograph, bar graph, mean, median, mode basics' },
      { chapterName: 'Mensuration', description: 'Perimeter and area of rectangles, squares, composite figures' },
      { chapterName: 'Algebra', description: 'Variables, expressions, equations — introduction' },
      { chapterName: 'Ratio and Proportion', description: 'Ratios, equivalent ratios, unitary method, proportion' },
      { chapterName: 'Symmetry', description: 'Lines of symmetry, reflectional symmetry' },
      { chapterName: 'Practical Geometry', description: 'Constructions using ruler and compass' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Science', std: 6, board: BOARD,
    chapters: [
      { chapterName: 'Food: Where Does It Come From?', description: 'Sources of food, food variety, herbivores, carnivores, omnivores' },
      { chapterName: 'Components of Food', description: 'Nutrients — carbohydrates, proteins, fats, vitamins, minerals' },
      { chapterName: 'Fibre to Fabric', description: 'Plant and animal fibres, spinning, weaving' },
      { chapterName: 'Sorting Materials into Groups', description: 'Properties of materials — transparency, solubility, appearance' },
      { chapterName: 'Separation of Substances', description: 'Handpicking, sieving, filtration, evaporation, sedimentation' },
      { chapterName: 'Changes Around Us', description: 'Reversible and irreversible changes' },
      { chapterName: 'Getting to Know Plants', description: 'Parts of plant, herbs, shrubs, trees, functions' },
      { chapterName: 'Body Movements', description: 'Human skeletal system, joints, movement in animals' },
      { chapterName: 'The Living Organisms and Their Surroundings', description: 'Habitat, adaptation, biotic and abiotic' },
      { chapterName: 'Motion and Measurement of Distances', description: 'Types of motion, standard units of measurement' },
      { chapterName: 'Light, Shadows and Reflections', description: 'Sources of light, shadows, transparent, translucent, opaque' },
      { chapterName: 'Electricity and Circuits', description: 'Electric cell, circuits, conductors, insulators' },
      { chapterName: 'Fun with Magnets', description: 'Properties of magnets, poles, magnetic and non-magnetic' },
      { chapterName: 'Water', description: 'Water cycle, states of water, conservation' },
      { chapterName: 'Air Around Us', description: 'Composition of air, properties, importance' },
      { chapterName: 'Garbage In, Garbage Out', description: 'Waste management, composting, vermicomposting, reduce-reuse-recycle' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Social Science', std: 6, board: BOARD,
    chapters: [
      { chapterName: 'What, Where, How and When?', description: 'History — sources, timeline, archaeological evidence' },
      { chapterName: 'On the Trail of the Earliest People', description: 'Hunter-gatherers, stone tools, cave paintings' },
      { chapterName: 'From Gathering to Growing Food', description: 'Neolithic revolution, farming, domestication' },
      { chapterName: 'In the Earliest Cities', description: 'Harappan civilization, urban planning, trade' },
      { chapterName: 'Kingdoms, Kings and an Early Republic', description: 'Mahajanapadas, republics, Magadha' },
      { chapterName: 'The Earth in the Solar System', description: 'Geography — planets, sun, moon, stars' },
      { chapterName: 'Globe: Latitudes and Longitudes', description: 'Geographical grid, coordinates, time zones' },
      { chapterName: 'Motions of the Earth', description: 'Rotation, revolution, seasons, day and night' },
      { chapterName: 'Maps', description: 'Components of maps, scale, symbols, types' },
      { chapterName: 'Understanding Diversity', description: 'Civics — social, cultural, religious diversity in India' },
      { chapterName: 'Diversity and Discrimination', description: 'Prejudice, stereotypes, inequality, Constitution' },
      { chapterName: 'What is Government?', description: 'Levels of government, democracy, decision making' },
      { chapterName: 'Key Elements of a Democratic Government', description: 'Participation, accountability, justice, equality' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 6, board: BOARD,
    chapters: [
      { chapterName: 'Who Did Patrick\'s Homework?', description: 'Story — a boy and an elf, responsibility' },
      { chapterName: 'How the Dog Found Himself a New Master', description: 'Story — a dog seeking the most powerful master' },
      { chapterName: 'Taro\'s Reward', description: 'Story — Japanese tale, filial duty, honesty' },
      { chapterName: 'An Indian — American Woman in Space: Kalpana Chawla', description: 'Biography — space, inspiration, perseverance' },
      { chapterName: 'A Different Kind of School', description: 'Story — empathy, understanding disabilities' },
      { chapterName: 'Who I Am', description: 'Self-descriptions — identity, aspirations, diversity' },
      { chapterName: 'Fair Play', description: 'Story — justice, cricket, sportsmanship' },
      { chapterName: 'A Game of Chance', description: 'Story — village fair, luck vs skill' },
      { chapterName: 'Desert Animals', description: 'Informational — camels, snakes, desert adaptations' },
      { chapterName: 'The Banyan Tree', description: 'Story — nature, animals, observation of a fight' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 6, board: BOARD,
    chapters: [
      { chapterName: 'वह चिड़िया जो', description: 'कविता — प्रकृति प्रेम, स्वतंत्रता' },
      { chapterName: 'बचपन', description: 'संस्मरण — बचपन की यादें' },
      { chapterName: 'नादान दोस्त', description: 'कहानी — पक्षी, करुणा' },
      { chapterName: 'चाँद से थोड़ी-सी गप्पें', description: 'कविता — चाँद, कल्पना' },
      { chapterName: 'अक्षरों का महत्व', description: 'निबंध — लिपि, भाषा का विकास' },
      { chapterName: 'पार नज़र के', description: 'कहानी — विज्ञान कथा' },
      { chapterName: 'साथी हाथ बढ़ाना', description: 'कविता — सहयोग, एकता' },
      { chapterName: 'ऐसे-ऐसे', description: 'एकांकी — हास्य, नाटक' },
      { chapterName: 'टिकट-अलबम', description: 'कहानी — शौक, दोस्ती' },
      { chapterName: 'झाँसी की रानी', description: 'कविता — वीरता, देशभक्ति' },
      { chapterName: 'जो देखकर भी नहीं देखते', description: 'निबंध — हेलेन केलर, अनुभूति' },
      { chapterName: 'संसार पुस्तक है', description: 'पत्र — जवाहरलाल नेहरू, ज्ञान' }
    ]
  });

  // ═══════════════════════════════════════════════════════════
  // CLASS 7
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 7...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 7, board: BOARD,
    chapters: [
      { chapterName: 'Integers', description: 'Properties of integers, multiplication and division of integers' },
      { chapterName: 'Fractions and Decimals', description: 'Multiplication and division of fractions and decimals' },
      { chapterName: 'Data Handling', description: 'Mean, median, mode, bar graphs, probability introduction' },
      { chapterName: 'Simple Equations', description: 'Solving linear equations in one variable' },
      { chapterName: 'Lines and Angles', description: 'Pairs of angles, parallel lines with transversal' },
      { chapterName: 'The Triangle and its Properties', description: 'Medians, altitudes, angle sum, Pythagoras intro' },
      { chapterName: 'Congruence of Triangles', description: 'SSS, SAS, ASA, RHS congruence criteria' },
      { chapterName: 'Comparing Quantities', description: 'Ratio, percentage, profit-loss, simple interest' },
      { chapterName: 'Rational Numbers', description: 'Positive and negative rationals, number line, operations' },
      { chapterName: 'Practical Geometry', description: 'Constructing triangles given SSS, SAS, ASA, RHS' },
      { chapterName: 'Perimeter and Area', description: 'Area of parallelograms, triangles, circles' },
      { chapterName: 'Algebraic Expressions', description: 'Terms, coefficients, like terms, addition and subtraction' },
      { chapterName: 'Exponents and Powers', description: 'Laws of exponents, expressing large numbers' },
      { chapterName: 'Symmetry', description: 'Lines of symmetry, rotational symmetry' },
      { chapterName: 'Visualising Solid Shapes', description: '3D shapes, faces, edges, vertices, nets' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Science', std: 7, board: BOARD,
    chapters: [
      { chapterName: 'Nutrition in Plants', description: 'Photosynthesis, parasitic and insectivorous plants' },
      { chapterName: 'Nutrition in Animals', description: 'Digestive system, digestion in ruminants, amoeba' },
      { chapterName: 'Fibre to Fabric', description: 'Animal fibres — wool, silk, sericulture' },
      { chapterName: 'Heat', description: 'Conduction, convection, radiation, thermometer' },
      { chapterName: 'Acids, Bases and Salts', description: 'Indicators, neutralization, everyday uses' },
      { chapterName: 'Physical and Chemical Changes', description: 'Types of changes, rusting, crystallization' },
      { chapterName: 'Weather, Climate and Adaptations', description: 'Weather elements, climate zones, animal adaptations' },
      { chapterName: 'Winds, Storms and Cyclones', description: 'Air pressure, wind currents, cyclone structure, safety' },
      { chapterName: 'Soil', description: 'Soil profile, types of soil, soil erosion, conservation' },
      { chapterName: 'Respiration in Organisms', description: 'Aerobic, anaerobic, breathing in different organisms' },
      { chapterName: 'Transportation in Animals and Plants', description: 'Circulatory system, blood, xylem, phloem' },
      { chapterName: 'Reproduction in Plants', description: 'Vegetative, asexual, sexual reproduction, pollination' },
      { chapterName: 'Motion and Time', description: 'Speed, distance-time graphs, oscillatory motion' },
      { chapterName: 'Electric Current and Its Effects', description: 'Heating effect, magnetic effect, electromagnets, fuses' },
      { chapterName: 'Light', description: 'Reflection, plane mirrors, concave/convex, sunlight spectrum' },
      { chapterName: 'Water: A Precious Resource', description: 'Water table, depletion, conservation strategies' },
      { chapterName: 'Forests: Our Lifeline', description: 'Forest ecosystem, food chains, deforestation' },
      { chapterName: 'Wastewater Story', description: 'Water treatment, sewage, sanitation' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Social Science', std: 7, board: BOARD,
    chapters: [
      { chapterName: 'Tracing Changes through a Thousand Years', description: 'History — medieval India, sources, periodization' },
      { chapterName: 'New Kings and Kingdoms', description: 'Rajputs, Cholas, administration, temples' },
      { chapterName: 'The Delhi Sultans', description: 'Delhi Sultanate, administration, architecture' },
      { chapterName: 'The Mughal Empire', description: 'Mughal rulers, administration, culture, decline' },
      { chapterName: 'Rulers and Buildings', description: 'Temple architecture, mosques, forts, gardens' },
      { chapterName: 'Environment', description: 'Geography — ecosystem, environment, human interaction' },
      { chapterName: 'Inside Our Earth', description: 'Interior of Earth, rocks, minerals' },
      { chapterName: 'Our Changing Earth', description: 'Lithospheric plates, earthquakes, volcanoes, weathering' },
      { chapterName: 'Air', description: 'Atmosphere layers, composition, weather and climate' },
      { chapterName: 'Water', description: 'Water cycle, ocean movements, tides, currents' },
      { chapterName: 'Equality in Indian Democracy', description: 'Civics — right to equality, discrimination' },
      { chapterName: 'Role of the Government in Health', description: 'Public health, healthcare, right to health' },
      { chapterName: 'How the State Government Works', description: 'Legislature, executive, MLAs, Chief Minister' },
      { chapterName: 'Growing Up as Boys and Girls', description: 'Gender roles, inequality, stereotypes' },
      { chapterName: 'Markets Around Us', description: 'Weekly markets, shops, malls, chain of markets' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 7, board: BOARD,
    chapters: [
      { chapterName: 'Three Questions', description: 'Story — Leo Tolstoy, wisdom, present moment' },
      { chapterName: 'A Gift of Chappals', description: 'Story — kindness, children sharing with a music teacher' },
      { chapterName: 'Gopal and the Hilsa Fish', description: 'Story — wit, humor, problem solving' },
      { chapterName: 'The Ashes That Made Trees Bloom', description: 'Story — Japanese tale, kindness rewarded' },
      { chapterName: 'Quality', description: 'Story — John Galsworthy, craftsmanship, dedication' },
      { chapterName: 'Expert Detectives', description: 'Story — observation skills, mystery' },
      { chapterName: 'The Invention of Vita-Wonk', description: 'Story — Roald Dahl, imagination, invention' },
      { chapterName: 'Fire: Friend and Foe', description: 'Informational — fire safety, uses, dangers' },
      { chapterName: 'A Bicycle in Good Repair', description: 'Story — humor, cycling adventure' },
      { chapterName: 'The Story of Cricket', description: 'Informational — history and evolution of cricket' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 7, board: BOARD,
    chapters: [
      { chapterName: 'हम पंछी उन्मुक्त गगन के', description: 'कविता — स्वतंत्रता, पक्षी' },
      { chapterName: 'दादी माँ', description: 'कहानी — दादी का प्रेम, पारिवारिक मूल्य' },
      { chapterName: 'हिमालय की बेटियाँ', description: 'निबंध — नदियाँ, हिमालय' },
      { chapterName: 'कठपुतली', description: 'कविता — स्वतंत्रता, बंधन' },
      { chapterName: 'मिठाईवाला', description: 'कहानी — त्याग, बच्चों से प्रेम' },
      { chapterName: 'रक्त और हमारा शरीर', description: 'लेख — रक्त, स्वास्थ्य' },
      { chapterName: 'पापा खो गए', description: 'नाटक — बाल श्रम, सामाजिक चिंता' },
      { chapterName: 'शाम – एक किसान', description: 'कविता — प्रकृति, किसान' },
      { chapterName: 'चिड़िया की बच्ची', description: 'कहानी — स्वतंत्रता, करुणा' },
      { chapterName: 'अपूर्व अनुभव', description: 'कहानी — साइकिल चलाना, आत्मविश्वास' }
    ]
  });

  // ═══════════════════════════════════════════════════════════
  // CLASS 8
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 8...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 8, board: BOARD,
    chapters: [
      { chapterName: 'Rational Numbers', description: 'Properties of rational numbers, representation on number line' },
      { chapterName: 'Linear Equations in One Variable', description: 'Solving equations with variable on both sides' },
      { chapterName: 'Understanding Quadrilaterals', description: 'Types of quadrilaterals, angle sum property' },
      { chapterName: 'Practical Geometry', description: 'Constructing quadrilaterals with given measurements' },
      { chapterName: 'Data Handling', description: 'Organising data, pie charts, probability' },
      { chapterName: 'Squares and Square Roots', description: 'Perfect squares, patterns, finding square roots' },
      { chapterName: 'Cubes and Cube Roots', description: 'Perfect cubes, prime factorization method' },
      { chapterName: 'Comparing Quantities', description: 'Ratios, percentages, compound interest, discount, tax' },
      { chapterName: 'Algebraic Expressions and Identities', description: 'Multiplication, standard identities, factorization' },
      { chapterName: 'Visualising Solid Shapes', description: 'Views of 3D shapes, Euler\'s formula, mapping' },
      { chapterName: 'Mensuration', description: 'Area of trapezium, polygon; surface area and volume of cube, cuboid, cylinder' },
      { chapterName: 'Exponents and Powers', description: 'Negative exponents, standard form, laws' },
      { chapterName: 'Direct and Inverse Proportions', description: 'Direct proportion, inverse proportion, applications' },
      { chapterName: 'Factorisation', description: 'Common factors, regrouping, division of polynomials' },
      { chapterName: 'Introduction to Graphs', description: 'Linear graphs, reading graphs, plotting points' },
      { chapterName: 'Playing with Numbers', description: 'Divisibility rules, puzzles with numbers' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Science', std: 8, board: BOARD,
    chapters: [
      { chapterName: 'Crop Production and Management', description: 'Agricultural practices, irrigation, harvesting, storage' },
      { chapterName: 'Microorganisms: Friend and Foe', description: 'Bacteria, virus, fungi, antibiotics, vaccines' },
      { chapterName: 'Synthetic Fibres and Plastics', description: 'Types of synthetic fibres, plastics, 4R principle' },
      { chapterName: 'Materials: Metals and Non-Metals', description: 'Physical and chemical properties, reactivity, uses' },
      { chapterName: 'Coal and Petroleum', description: 'Fossil fuels, formation, exhaustible resources' },
      { chapterName: 'Combustion and Flame', description: 'Ignition temperature, types of combustion, flame zones' },
      { chapterName: 'Conservation of Plants and Animals', description: 'Deforestation, biodiversity, endangered species, biosphere reserves' },
      { chapterName: 'Cell — Structure and Functions', description: 'Cell theory, organelles, plant vs animal cell' },
      { chapterName: 'Reproduction in Animals', description: 'Sexual and asexual reproduction, fertilization, embryo' },
      { chapterName: 'Reaching the Age of Adolescence', description: 'Puberty, hormones, reproductive health' },
      { chapterName: 'Force and Pressure', description: 'Contact and non-contact forces, pressure, atmospheric pressure' },
      { chapterName: 'Friction', description: 'Types of friction, factors affecting friction, reducing friction' },
      { chapterName: 'Sound', description: 'Vibration, frequency, amplitude, human ear, noise pollution' },
      { chapterName: 'Chemical Effects of Electric Current', description: 'Conductors, electroplating, LED' },
      { chapterName: 'Some Natural Phenomena', description: 'Lightning, earthquakes, electroscope, earthing' },
      { chapterName: 'Light', description: 'Laws of reflection, regular and diffuse reflection, human eye, Braille' },
      { chapterName: 'Stars and the Solar System', description: 'Celestial objects, constellations, planets, moon' },
      { chapterName: 'Pollution of Air and Water', description: 'Air and water pollutants, effects, purification' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Social Science', std: 8, board: BOARD,
    chapters: [
      { chapterName: 'How, When and Where', description: 'History — importance of dates, surveys, official records' },
      { chapterName: 'From Trade to Territory', description: 'East India Company, establishment of British rule' },
      { chapterName: 'Ruling the Countryside', description: 'Permanent Settlement, Mahalwari, Ryotwari systems' },
      { chapterName: 'Tribals, Dikus and the Vision of a Golden Age', description: 'Tribal revolts, Birsa Munda' },
      { chapterName: 'When People Rebel — 1857 and After', description: 'Revolt of 1857, causes, consequences' },
      { chapterName: 'Resources', description: 'Geography — types of resources, conservation, sustainable development' },
      { chapterName: 'Land, Soil, Water, Natural Vegetation and Wildlife', description: 'Land use, soil types, water resources' },
      { chapterName: 'Mineral and Power Resources', description: 'Types of minerals, conventional and non-conventional energy' },
      { chapterName: 'Agriculture', description: 'Types of farming, major crops, agricultural development' },
      { chapterName: 'Industries', description: 'Classification, iron and steel, textile, IT industry' },
      { chapterName: 'The Indian Constitution', description: 'Civics — Preamble, fundamental rights, directive principles' },
      { chapterName: 'Understanding Secularism', description: 'Secularism in Indian context, separation of religion and state' },
      { chapterName: 'Parliament and the Making of Laws', description: 'Lok Sabha, Rajya Sabha, law-making process' },
      { chapterName: 'The Judiciary', description: 'Courts structure, independence, judicial review, PIL' },
      { chapterName: 'Understanding Marginalisation', description: 'Adivasis, minorities, social justice' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 8, board: BOARD,
    chapters: [
      { chapterName: 'The Best Christmas Present in the World', description: 'Story — WWI, letters, peace, humanity' },
      { chapterName: 'The Tsunami', description: 'Real accounts — natural disaster, survival, bravery' },
      { chapterName: 'Glimpses of the Past', description: 'Comic format — Indian independence movement' },
      { chapterName: 'Bepin Choudhury\'s Lapse of Memory', description: 'Story — Satyajit Ray, humor, memory' },
      { chapterName: 'The Summit Within', description: 'Essay — Everest climb, inner and outer summit' },
      { chapterName: 'This is Jody\'s Fawn', description: 'Story — The Yearling, caring for animals' },
      { chapterName: 'A Visit to Cambridge', description: 'Interview — Stephen Hawking, disability, achievement' },
      { chapterName: 'A Short Monsoon Diary', description: 'Diary entries — Ruskin Bond, monsoon in Mussoorie' },
      { chapterName: 'The Great Stone Face I', description: 'Story — Nathaniel Hawthorne, character, goodness' },
      { chapterName: 'The Great Stone Face II', description: 'Story — continuation, true greatness' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 8, board: BOARD,
    chapters: [
      { chapterName: 'ध्वनि', description: 'कविता — सूर्योदय, नई शुरुआत' },
      { chapterName: 'लाख की चूड़ियाँ', description: 'कहानी — ग्रामीण कला, आजीविका' },
      { chapterName: 'बस की यात्रा', description: 'व्यंग्य — खराब सड़कें, परिवहन' },
      { chapterName: 'दीवानों की हस्ती', description: 'कविता — फकीरी, जीवन दर्शन' },
      { chapterName: 'चिट्ठियों की अनूठी दुनिया', description: 'निबंध — पत्र लेखन, संचार' },
      { chapterName: 'भगवान के डाकिए', description: 'कविता — प्रकृति, संदेशवाहक' },
      { chapterName: 'क्या निराश हुआ जाए', description: 'निबंध — आशावाद, मानवता' },
      { chapterName: 'यह सबसे कठिन समय नहीं', description: 'कविता — उम्मीद, हिम्मत' },
      { chapterName: 'कबीर की साखियाँ', description: 'दोहे — कबीर, जीवन ज्ञान' },
      { chapterName: 'कामचोर', description: 'कहानी — हास्य, आलस्य' },
      { chapterName: 'जब सिनेमा ने बोलना सीखा', description: 'लेख — भारतीय सिनेमा का इतिहास' },
      { chapterName: 'सुदामा चरित', description: 'कविता — कृष्ण-सुदामा, मित्रता' }
    ]
  });

  // ═══════════════════════════════════════════════════════════
  // CLASS 9
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 9...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 9, board: BOARD,
    chapters: [
      { chapterName: 'Number Systems', description: 'Rational and irrational numbers, real numbers, decimal expansions, number line' },
      { chapterName: 'Polynomials', description: 'Polynomials in one variable, zeroes, remainder and factor theorems' },
      { chapterName: 'Coordinate Geometry', description: 'Cartesian plane, plotting points, quadrants' },
      { chapterName: 'Linear Equations in Two Variables', description: 'Equations, solutions, graph of linear equation' },
      { chapterName: 'Introduction to Euclid\'s Geometry', description: 'Axioms, postulates, Euclid\'s five postulates' },
      { chapterName: 'Lines and Angles', description: 'Types of angles, parallel lines and transversal, angle sum' },
      { chapterName: 'Triangles', description: 'Congruence, inequalities in triangles, SAS, ASA, SSS, RHS' },
      { chapterName: 'Quadrilaterals', description: 'Properties, mid-point theorem, parallelogram theorems' },
      { chapterName: 'Circles', description: 'Chords, arcs, angles subtended, cyclic quadrilaterals' },
      { chapterName: 'Heron\'s Formula', description: 'Area of triangle using sides, application to quadrilaterals' },
      { chapterName: 'Surface Areas and Volumes', description: 'Cube, cuboid, cylinder, cone, sphere — SA and volume' },
      { chapterName: 'Statistics', description: 'Data collection, frequency distribution, mean, median, mode, bar/histogram' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Science', std: 9, board: BOARD,
    chapters: [
      { chapterName: 'Matter in Our Surroundings', description: 'States of matter, change of state, evaporation' },
      { chapterName: 'Is Matter Around Us Pure', description: 'Mixtures, solutions, suspensions, colloids, separation techniques' },
      { chapterName: 'Atoms and Molecules', description: 'Laws of chemical combination, Dalton\'s theory, molecular and formula mass' },
      { chapterName: 'Structure of the Atom', description: 'Electrons, protons, neutrons, Thomson, Rutherford, Bohr models' },
      { chapterName: 'The Fundamental Unit of Life', description: 'Cell structure, organelles, prokaryotic vs eukaryotic' },
      { chapterName: 'Tissues', description: 'Plant and animal tissues — meristematic, permanent, epithelial, connective' },
      { chapterName: 'Diversity in Living Organisms', description: 'Classification, five kingdoms, nomenclature, hierarchy' },
      { chapterName: 'Motion', description: 'Distance, displacement, speed, velocity, acceleration, equations of motion, graphs' },
      { chapterName: 'Force and Laws of Motion', description: 'Newton\'s three laws, inertia, momentum, conservation' },
      { chapterName: 'Gravitation', description: 'Universal law of gravitation, free fall, weight vs mass, Kepler\'s laws' },
      { chapterName: 'Work and Energy', description: 'Work, kinetic energy, potential energy, conservation of energy, power' },
      { chapterName: 'Sound', description: 'Production, propagation, reflection, echo, human ear, ultrasound, sonar' },
      { chapterName: 'Why Do We Fall Ill', description: 'Health, disease, infectious agents, prevention, immunization' },
      { chapterName: 'Natural Resources', description: 'Air, water, soil — biogeochemical cycles, pollution' },
      { chapterName: 'Improvement in Food Resources', description: 'Crop and animal husbandry, green revolution, organic farming' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Social Science', std: 9, board: BOARD,
    chapters: [
      { chapterName: 'The French Revolution', description: 'History — causes, events, impact, Napoleon' },
      { chapterName: 'Socialism in Europe and the Russian Revolution', description: 'Socialism vs capitalism, Bolsheviks, Lenin' },
      { chapterName: 'Nazism and the Rise of Hitler', description: 'Weimar Republic, Hitler, Holocaust, WWII causes' },
      { chapterName: 'Forest Society and Colonialism', description: 'Colonial forest policies, deforestation, resistance' },
      { chapterName: 'Pastoralists in the Modern World', description: 'Nomadic communities, colonial impact, modern pastoralism' },
      { chapterName: 'India — Size and Location', description: 'Geography — India\'s position, neighbours, extent' },
      { chapterName: 'Physical Features of India', description: 'Mountains, plains, plateaus, deserts, coastal plains' },
      { chapterName: 'Drainage', description: 'River systems — Himalayan and Peninsular, lakes' },
      { chapterName: 'Climate', description: 'Monsoon mechanism, seasons, climate controls' },
      { chapterName: 'Natural Vegetation and Wildlife', description: 'Vegetation types, wildlife, conservation' },
      { chapterName: 'Population', description: 'Size, distribution, growth, composition, migration' },
      { chapterName: 'What is Democracy? Why Democracy?', description: 'Civics — features of democracy, merits and demerits' },
      { chapterName: 'Constitutional Design', description: 'Making of Indian Constitution, Preamble, guiding values' },
      { chapterName: 'Electoral Politics', description: 'Elections, political competition, challenges' },
      { chapterName: 'Working of Institutions', description: 'Parliament, Executive, Judiciary — roles and functions' },
      { chapterName: 'Democratic Rights', description: 'Fundamental rights, expanding scope, right to constitutional remedies' },
      { chapterName: 'The Story of Village Palampur', description: 'Economics — factors of production, farming, non-farm activities' },
      { chapterName: 'People as Resource', description: 'Human capital, education, health, employment' },
      { chapterName: 'Poverty as a Challenge', description: 'Poverty measurement, causes, anti-poverty measures' },
      { chapterName: 'Food Security in India', description: 'PDS, buffer stock, food insecurity, government programs' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 9, board: BOARD,
    chapters: [
      { chapterName: 'The Fun They Had', description: 'Story — Isaac Asimov, future of education, technology' },
      { chapterName: 'The Sound of Music', description: 'Biographies — Evelyn Glennie and Bismillah Khan' },
      { chapterName: 'The Little Girl', description: 'Story — Katherine Mansfield, father-daughter relationship' },
      { chapterName: 'A Truly Beautiful Mind', description: 'Biography — Albert Einstein, genius, humanity' },
      { chapterName: 'The Snake and the Mirror', description: 'Story — humor, vanity, encounter with a snake' },
      { chapterName: 'My Childhood', description: 'Autobiography — APJ Abdul Kalam, early life, inspiration' },
      { chapterName: 'Reach for the Top', description: 'Biographies — Santosh Yadav and Maria Sharapova' },
      { chapterName: 'Kathmandu', description: 'Travel essay — Vikram Seth, contrasts, observations' },
      { chapterName: 'If I Were You', description: 'Play — suspense, identity, wit' },
      { chapterName: 'The Lost Child', description: 'Supplementary — Mulk Raj Anand, fair, parent-child bond' },
      { chapterName: 'The Adventures of Toto', description: 'Supplementary — Ruskin Bond, mischievous monkey' },
      { chapterName: 'In the Kingdom of Fools', description: 'Supplementary — Kannada folktale, wisdom' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 9, board: BOARD,
    chapters: [
      { chapterName: 'दो बैलों की कथा', description: 'कहानी — प्रेमचंद, स्वतंत्रता, मित्रता' },
      { chapterName: 'ल्हासा की ओर', description: 'यात्रा वृत्तांत — तिब्बत यात्रा' },
      { chapterName: 'उपभोक्तावाद की संस्कृति', description: 'निबंध — उपभोक्तावाद, विज्ञापन' },
      { chapterName: 'साँवले सपनों की याद', description: 'संस्मरण — पक्षी, प्रकृति प्रेम' },
      { chapterName: 'नाना साहब की पुत्री', description: 'कहानी — 1857 का विद्रोह, वीरता' },
      { chapterName: 'प्रेमचंद के फटे जूते', description: 'व्यंग्य — सादगी, साहित्यकार' },
      { chapterName: 'मेरे बचपन के दिन', description: 'संस्मरण — महादेवी वर्मा, बचपन' },
      { chapterName: 'एक कुत्ता और एक मैना', description: 'निबंध — हजारीप्रसाद द्विवेदी, पशु-प्रेम' },
      { chapterName: 'सखियाँ एवं सबद', description: 'कविता — कबीर, आध्यात्मिक ज्ञान' },
      { chapterName: 'वाख', description: 'कविता — ललद्यद, कश्मीरी रहस्यवाद' },
      { chapterName: 'रसखान के सवैये', description: 'कविता — कृष्ण भक्ति' },
      { chapterName: 'कैदी और कोकिला', description: 'कविता — माखनलाल चतुर्वेदी, स्वतंत्रता' }
    ]
  });

  // ═══════════════════════════════════════════════════════════
  // CLASS 10
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 10...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 10, board: BOARD,
    chapters: [
      { chapterName: 'Real Numbers', description: 'Euclid\'s division lemma, Fundamental Theorem of Arithmetic, irrational and rational numbers' },
      { chapterName: 'Polynomials', description: 'Zeroes of polynomials, relationship between zeroes and coefficients, division algorithm' },
      { chapterName: 'Pair of Linear Equations in Two Variables', description: 'Graphical and algebraic methods — substitution, elimination, cross-multiplication' },
      { chapterName: 'Quadratic Equations', description: 'Solutions by factorization, completing the square, quadratic formula, discriminant' },
      { chapterName: 'Arithmetic Progressions', description: 'nth term, sum of n terms, applications' },
      { chapterName: 'Triangles', description: 'Similarity, BPT, criteria for similarity, Pythagoras theorem' },
      { chapterName: 'Coordinate Geometry', description: 'Distance formula, section formula, area of triangle' },
      { chapterName: 'Introduction to Trigonometry', description: 'Trigonometric ratios, ratios of complementary angles, identities' },
      { chapterName: 'Some Applications of Trigonometry', description: 'Heights and distances, angle of elevation and depression' },
      { chapterName: 'Circles', description: 'Tangent to a circle, number of tangents from a point, theorems' },
      { chapterName: 'Areas Related to Circles', description: 'Sector, segment, area of combinations of figures' },
      { chapterName: 'Surface Areas and Volumes', description: 'Combinations of solids, conversion of shapes, frustum' },
      { chapterName: 'Statistics', description: 'Mean, median, mode of grouped data, cumulative frequency, ogives' },
      { chapterName: 'Probability', description: 'Classical definition, simple problems on single events' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Science', std: 10, board: BOARD,
    chapters: [
      { chapterName: 'Chemical Reactions and Equations', description: 'Types of reactions, balancing equations, effects of oxidation' },
      { chapterName: 'Acids, Bases and Salts', description: 'Properties, pH scale, indicators, salts preparation' },
      { chapterName: 'Metals and Non-Metals', description: 'Properties, reactivity series, ionic bonding, corrosion, extraction' },
      { chapterName: 'Carbon and its Compounds', description: 'Covalent bonding, versatile carbon, homologous series, functional groups' },
      { chapterName: 'Life Processes', description: 'Nutrition, respiration, transportation, excretion in plants and animals' },
      { chapterName: 'Control and Coordination', description: 'Nervous system, reflex arc, hormones in animals and plants' },
      { chapterName: 'How do Organisms Reproduce?', description: 'Asexual and sexual reproduction, reproductive health' },
      { chapterName: 'Heredity and Evolution', description: 'Mendel\'s laws, sex determination, evolution and classification' },
      { chapterName: 'Light — Reflection and Refraction', description: 'Laws of reflection/refraction, mirrors, lenses, sign convention' },
      { chapterName: 'The Human Eye and the Colourful World', description: 'Eye defects, atmospheric refraction, dispersion, scattering' },
      { chapterName: 'Electricity', description: 'Ohm\'s law, resistance, series/parallel circuits, power, energy' },
      { chapterName: 'Magnetic Effects of Electric Current', description: 'Magnetic field, electromagnets, Fleming\'s rules, motors, generators' },
      { chapterName: 'Our Environment', description: 'Ecosystem, food chains and webs, ozone depletion, waste management' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Social Science', std: 10, board: BOARD,
    chapters: [
      { chapterName: 'The Rise of Nationalism in Europe', description: 'History — French Revolution impact, unification of Germany and Italy' },
      { chapterName: 'Nationalism in India', description: 'Non-Cooperation, Civil Disobedience, Quit India, different strands' },
      { chapterName: 'The Making of a Global World', description: 'Silk routes, colonialism, industrial revolution, globalization' },
      { chapterName: 'The Age of Industrialisation', description: 'Proto-industrialisation, factory system, industrialisation in India' },
      { chapterName: 'Print Culture and the Modern World', description: 'History of print, impact on society, censorship' },
      { chapterName: 'Resources and Development', description: 'Geography — types of resources, resource planning, land degradation' },
      { chapterName: 'Forest and Wildlife Resources', description: 'Conservation, biodiversity, community initiatives' },
      { chapterName: 'Water Resources', description: 'Dams, rainwater harvesting, watershed management' },
      { chapterName: 'Agriculture', description: 'Types of farming, cropping patterns, food security' },
      { chapterName: 'Minerals and Energy Resources', description: 'Types of minerals, conventional and non-conventional energy' },
      { chapterName: 'Manufacturing Industries', description: 'Industrial location, agro-based, mineral-based industries' },
      { chapterName: 'Lifelines of National Economy', description: 'Transport, communication, trade, tourism' },
      { chapterName: 'Power Sharing', description: 'Civics — Belgium and Sri Lanka, forms of power sharing' },
      { chapterName: 'Federalism', description: 'Federal provisions, linguistic states, decentralisation' },
      { chapterName: 'Gender, Religion and Caste', description: 'Social divisions in politics, communalism, secularism' },
      { chapterName: 'Political Parties', description: 'Types, party systems, national and state parties, challenges' },
      { chapterName: 'Outcomes of Democracy', description: 'Accountability, economic growth, inequality, dignity' },
      { chapterName: 'Development', description: 'Economics — income and other criteria, HDI, sustainability' },
      { chapterName: 'Sectors of the Indian Economy', description: 'Primary, secondary, tertiary, organised/unorganised' },
      { chapterName: 'Money and Credit', description: 'Modern forms of money, banking, credit, SHGs' },
      { chapterName: 'Globalisation and the Indian Economy', description: 'MNCs, liberalisation, WTO, impact on India' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 10, board: BOARD,
    chapters: [
      { chapterName: 'A Letter to God', description: 'Story — Gregorio Lopez, unshakeable faith' },
      { chapterName: 'Nelson Mandela: Long Walk to Freedom', description: 'Autobiography — apartheid, courage, inauguration' },
      { chapterName: 'Two Stories about Flying', description: 'His First Flight (Liam O\'Flaherty) and Black Aeroplane' },
      { chapterName: 'From the Diary of Anne Frank', description: 'Diary — WWII, adolescence, hiding' },
      { chapterName: 'Glimpses of India', description: 'A Baker from Goa, Coorg, Tea from Assam' },
      { chapterName: 'Mijbil the Otter', description: 'Story — Gavin Maxwell, unusual pet, travel' },
      { chapterName: 'Madam Rides the Bus', description: 'Story — Valliammai, curiosity, first bus ride' },
      { chapterName: 'The Sermon at Benares', description: 'Story — Buddha, suffering, acceptance' },
      { chapterName: 'The Proposal', description: 'Play — Anton Chekhov, comedy, marriage proposal' },
      { chapterName: 'A Triumph of Surgery', description: 'Supplementary — James Herriot, pampered dog' },
      { chapterName: 'The Thief\'s Story', description: 'Supplementary — Ruskin Bond, trust, transformation' },
      { chapterName: 'Footprints without Feet', description: 'Supplementary — H.G. Wells, invisible man' },
      { chapterName: 'The Making of a Scientist', description: 'Supplementary — Richard Ebright, curiosity, research' },
      { chapterName: 'The Necklace', description: 'Supplementary — Guy de Maupassant, vanity, irony' },
      { chapterName: 'Bholi', description: 'Supplementary — K.A. Abbas, education empowering women' },
      { chapterName: 'The Book That Saved the Earth', description: 'Supplementary — science fiction, humor' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Hindi', std: 10, board: BOARD,
    chapters: [
      { chapterName: 'सूरदास के पद', description: 'कविता — कृष्ण भक्ति, विनय, वात्सल्य' },
      { chapterName: 'राम-लक्ष्मण-परशुराम संवाद', description: 'कविता — तुलसीदास, वीर रस' },
      { chapterName: 'आत्मकथ्य', description: 'कविता — जयशंकर प्रसाद, आत्मावलोकन' },
      { chapterName: 'उत्साह और अट नहीं रही है', description: 'कविता — निराला, बादल, बसंत' },
      { chapterName: 'यह दंतुरित मुस्कान और फसल', description: 'कविता — नागार्जुन, बाल सौंदर्य, कृषि' },
      { chapterName: 'छाया मत छूना', description: 'कविता — गिरिजाकुमार माथुर, यथार्थ' },
      { chapterName: 'नेताजी का चश्मा', description: 'कहानी — देशभक्ति, सम्मान' },
      { chapterName: 'बालगोबिन भगत', description: 'कहानी — सादा जीवन, भक्ति' },
      { chapterName: 'लखनवी अंदाज़', description: 'कहानी — नवाबी शैली, व्यंग्य' },
      { chapterName: 'एक कहानी यह भी', description: 'आत्मकथा — मन्नू भंडारी, संघर्ष' },
      { chapterName: 'स्त्री शिक्षा के विरोधी कुतर्कों का खंडन', description: 'निबंध — महावीरप्रसाद द्विवेदी' },
      { chapterName: 'संस्कृति', description: 'निबंध — भदंत आनंद कौसल्यायन' }
    ]
  });

  // ═══════════════════════════════════════════════════════════
  // CLASS 11
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 11...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 11, board: BOARD,
    chapters: [
      { chapterName: 'Sets', description: 'Types of sets, Venn diagrams, operations, complement' },
      { chapterName: 'Relations and Functions', description: 'Cartesian product, relations, functions, domain and range' },
      { chapterName: 'Trigonometric Functions', description: 'Radian measure, identities, graphs, general solutions' },
      { chapterName: 'Principle of Mathematical Induction', description: 'Proof technique using induction' },
      { chapterName: 'Complex Numbers and Quadratic Equations', description: 'Algebra of complex numbers, Argand plane, quadratic equations' },
      { chapterName: 'Linear Inequalities', description: 'Solving inequalities, graphical representation' },
      { chapterName: 'Permutations and Combinations', description: 'Fundamental principle of counting, nPr, nCr' },
      { chapterName: 'Binomial Theorem', description: 'Binomial expansion, general and middle terms, Pascal\'s triangle' },
      { chapterName: 'Sequences and Series', description: 'AP, GP, relationship between AM and GM, sum to n terms' },
      { chapterName: 'Straight Lines', description: 'Slope, various forms of equations, distance of a point from line' },
      { chapterName: 'Conic Sections', description: 'Circles, ellipses, parabolas, hyperbolas' },
      { chapterName: 'Introduction to Three Dimensional Geometry', description: 'Coordinate axes, distance formula, section formula in 3D' },
      { chapterName: 'Limits and Derivatives', description: 'Intuitive idea of limits, derivatives from first principles' },
      { chapterName: 'Mathematical Reasoning', description: 'Statements, logical connectives, quantifiers, proofs' },
      { chapterName: 'Statistics', description: 'Mean deviation, variance, standard deviation' },
      { chapterName: 'Probability', description: 'Random experiments, events, axiomatic probability' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Physics', std: 11, board: BOARD,
    chapters: [
      { chapterName: 'Physical World', description: 'Scope of physics, fundamental forces, scientific method' },
      { chapterName: 'Units and Measurements', description: 'SI units, dimensional analysis, significant figures, errors' },
      { chapterName: 'Motion in a Straight Line', description: 'Position, velocity, acceleration, kinematic equations, graphs' },
      { chapterName: 'Motion in a Plane', description: 'Vectors, projectile motion, uniform circular motion' },
      { chapterName: 'Laws of Motion', description: 'Newton\'s laws, friction, circular motion dynamics, problem solving' },
      { chapterName: 'Work, Energy and Power', description: 'Work-energy theorem, potential energy, conservation, collisions' },
      { chapterName: 'System of Particles and Rotational Motion', description: 'Centre of mass, torque, angular momentum, moment of inertia' },
      { chapterName: 'Gravitation', description: 'Kepler\'s laws, gravitational potential energy, escape velocity, satellites' },
      { chapterName: 'Mechanical Properties of Solids', description: 'Stress, strain, Hooke\'s law, elastic moduli' },
      { chapterName: 'Mechanical Properties of Fluids', description: 'Pressure, Pascal\'s law, viscosity, Bernoulli\'s principle, surface tension' },
      { chapterName: 'Thermal Properties of Matter', description: 'Temperature, thermal expansion, calorimetry, heat transfer' },
      { chapterName: 'Thermodynamics', description: 'Zeroth, first, second laws, isothermal and adiabatic processes, Carnot engine' },
      { chapterName: 'Kinetic Theory', description: 'Molecular nature of matter, ideal gas, kinetic theory of gases' },
      { chapterName: 'Oscillations', description: 'SHM, spring-mass system, pendulum, damped and forced oscillations' },
      { chapterName: 'Waves', description: 'Transverse and longitudinal, speed, superposition, standing waves, beats, Doppler effect' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Chemistry', std: 11, board: BOARD,
    chapters: [
      { chapterName: 'Some Basic Concepts of Chemistry', description: 'Atomic and molecular masses, mole concept, stoichiometry' },
      { chapterName: 'Structure of Atom', description: 'Subatomic particles, Bohr model, quantum mechanics, orbitals, electronic configuration' },
      { chapterName: 'Classification of Elements and Periodicity', description: 'Periodic table, periodic trends, electronegativity, ionization energy' },
      { chapterName: 'Chemical Bonding and Molecular Structure', description: 'Ionic, covalent, VSEPR, hybridization, molecular orbital theory' },
      { chapterName: 'States of Matter', description: 'Gas laws, ideal gas equation, liquefaction, liquid state' },
      { chapterName: 'Thermodynamics', description: 'Enthalpy, Hess\'s law, entropy, Gibbs free energy, spontaneity' },
      { chapterName: 'Equilibrium', description: 'Chemical equilibrium, Le Chatelier, ionic equilibrium, pH, buffers' },
      { chapterName: 'Redox Reactions', description: 'Oxidation numbers, balancing redox equations, electrode processes' },
      { chapterName: 'Hydrogen', description: 'Position, isotopes, dihydrogen, water, hydrogen peroxide, hydrides' },
      { chapterName: 'The s-Block Elements', description: 'Alkali and alkaline earth metals, properties, diagonal relationship' },
      { chapterName: 'The p-Block Elements', description: 'Group 13 and 14, boron, aluminium, carbon, silicon, important compounds' },
      { chapterName: 'Organic Chemistry — Some Basic Principles', description: 'IUPAC nomenclature, isomerism, electronic effects, reaction mechanisms' },
      { chapterName: 'Hydrocarbons', description: 'Alkanes, alkenes, alkynes, aromatic hydrocarbons, reactions' },
      { chapterName: 'Environmental Chemistry', description: 'Air and water pollution, ozone, smog, greenhouse effect, green chemistry' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Biology', std: 11, board: BOARD,
    chapters: [
      { chapterName: 'The Living World', description: 'Biodiversity, taxonomy, classification systems' },
      { chapterName: 'Biological Classification', description: 'Five kingdom classification, viruses, viroids, lichens' },
      { chapterName: 'Plant Kingdom', description: 'Algae, bryophytes, pteridophytes, gymnosperms, angiosperms' },
      { chapterName: 'Animal Kingdom', description: 'Basis of classification, phylum characteristics, examples' },
      { chapterName: 'Morphology of Flowering Plants', description: 'Root, stem, leaf, flower, fruit, seed modifications' },
      { chapterName: 'Anatomy of Flowering Plants', description: 'Tissues, tissue systems, dicot vs monocot anatomy' },
      { chapterName: 'Structural Organisation in Animals', description: 'Animal tissues, organ systems, earthworm, cockroach, frog' },
      { chapterName: 'Cell: The Unit of Life', description: 'Cell theory, prokaryotic and eukaryotic cells, organelles' },
      { chapterName: 'Biomolecules', description: 'Carbohydrates, proteins, lipids, nucleic acids, enzymes' },
      { chapterName: 'Cell Cycle and Cell Division', description: 'Mitosis, meiosis, significance, cell cycle regulation' },
      { chapterName: 'Transport in Plants', description: 'Osmosis, plasmolysis, phloem transport, transpiration' },
      { chapterName: 'Mineral Nutrition', description: 'Essential minerals, deficiency symptoms, nitrogen metabolism' },
      { chapterName: 'Photosynthesis in Higher Plants', description: 'Light and dark reactions, C3 and C4 pathways, photorespiration' },
      { chapterName: 'Respiration in Plants', description: 'Glycolysis, TCA cycle, ETS, fermentation' },
      { chapterName: 'Plant Growth and Development', description: 'Growth phases, plant hormones, photoperiodism, vernalisation' },
      { chapterName: 'Digestion and Absorption', description: 'Human digestive system, digestion process, disorders' },
      { chapterName: 'Breathing and Exchange of Gases', description: 'Respiratory organs, mechanism, gas transport, disorders' },
      { chapterName: 'Body Fluids and Circulation', description: 'Blood, lymph, human heart, cardiac cycle, disorders' },
      { chapterName: 'Excretory Products and their Elimination', description: 'Kidney structure, urine formation, regulation, disorders' },
      { chapterName: 'Locomotion and Movement', description: 'Types of movement, skeletal system, muscle contraction, joints' },
      { chapterName: 'Neural Control and Coordination', description: 'Neuron, CNS, PNS, reflex action, sense organs' },
      { chapterName: 'Chemical Coordination and Integration', description: 'Endocrine glands, hormones, mechanism of action, disorders' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 11, board: BOARD,
    chapters: [
      { chapterName: 'The Portrait of a Lady', description: 'Prose — Khushwant Singh, grandmother, bond and change' },
      { chapterName: 'We\'re Not Afraid to Die', description: 'Prose — Gordon Cook, sea survival, courage' },
      { chapterName: 'Discovering Tut: The Saga Continues', description: 'Prose — Tutankhamun, archaeology, CT scan' },
      { chapterName: 'Landscape of the Soul', description: 'Prose — Chinese and European art, perspective' },
      { chapterName: 'The Ailing Planet: the Green Movement\'s Role', description: 'Prose — environment, sustainability' },
      { chapterName: 'The Browning Version', description: 'Prose — Terence Rattigan, play, teacher-student' },
      { chapterName: 'The Adventure', description: 'Prose — Jayant Narlikar, parallel universes, science fiction' },
      { chapterName: 'Silk Road', description: 'Prose — Nick Middleton, travel, Tibet' },
      { chapterName: 'A Photograph', description: 'Poetry — Shirley Toulson, memory, loss' },
      { chapterName: 'The Laburnum Top', description: 'Poetry — Ted Hughes, nature, goldfinch' },
      { chapterName: 'The Voice of the Rain', description: 'Poetry — Walt Whitman, rain cycle' },
      { chapterName: 'Childhood', description: 'Poetry — Marcus Natten, growing up, individuality' }
    ]
  });

  // ═══════════════════════════════════════════════════════════
  // CLASS 12
  // ═══════════════════════════════════════════════════════════
  console.log('📚 Seeding Class 12...');

  await upsertCurriculum({
    subjectName: 'Mathematics', std: 12, board: BOARD,
    chapters: [
      { chapterName: 'Relations and Functions', description: 'Types of relations, types of functions, composition, inverse' },
      { chapterName: 'Inverse Trigonometric Functions', description: 'Domain, range, principal value, properties' },
      { chapterName: 'Matrices', description: 'Types, operations, transpose, symmetric, elementary operations' },
      { chapterName: 'Determinants', description: 'Properties, cofactors, adjoint, inverse, Cramer\'s rule' },
      { chapterName: 'Continuity and Differentiability', description: 'Continuity, differentiability, chain rule, implicit, parametric, second order' },
      { chapterName: 'Application of Derivatives', description: 'Rate of change, tangents, maxima and minima, approximations' },
      { chapterName: 'Integrals', description: 'Indefinite integrals, methods, definite integrals, fundamental theorem' },
      { chapterName: 'Application of Integrals', description: 'Area under curves, area between curves' },
      { chapterName: 'Differential Equations', description: 'Order, degree, solving first-order equations, applications' },
      { chapterName: 'Vector Algebra', description: 'Types, addition, scalar and vector products, triple products' },
      { chapterName: 'Three Dimensional Geometry', description: 'Direction cosines, equations of line and plane, angles, distances' },
      { chapterName: 'Linear Programming', description: 'Mathematical formulation, graphical method, feasible region' },
      { chapterName: 'Probability', description: 'Conditional probability, Bayes\' theorem, random variables, binomial distribution' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Physics', std: 12, board: BOARD,
    chapters: [
      { chapterName: 'Electric Charges and Fields', description: 'Coulomb\'s law, electric field, dipole, Gauss\'s law' },
      { chapterName: 'Electrostatic Potential and Capacitance', description: 'Potential, equipotential surfaces, capacitors, dielectrics' },
      { chapterName: 'Current Electricity', description: 'Ohm\'s law, Kirchhoff\'s rules, Wheatstone bridge, potentiometer' },
      { chapterName: 'Moving Charges and Magnetism', description: 'Magnetic force, Biot-Savart law, Ampere\'s law, solenoid' },
      { chapterName: 'Magnetism and Matter', description: 'Bar magnets, Earth\'s magnetism, diamagnetic, paramagnetic, ferromagnetic' },
      { chapterName: 'Electromagnetic Induction', description: 'Faraday\'s laws, Lenz\'s law, eddy currents, self/mutual inductance' },
      { chapterName: 'Alternating Current', description: 'AC generator, phasor, LCR circuit, resonance, transformers' },
      { chapterName: 'Electromagnetic Waves', description: 'Displacement current, EM spectrum, properties and applications' },
      { chapterName: 'Ray Optics and Optical Instruments', description: 'Reflection, refraction, TIR, prism, lenses, microscopes, telescopes' },
      { chapterName: 'Wave Optics', description: 'Huygens\' principle, interference, diffraction, polarisation' },
      { chapterName: 'Dual Nature of Radiation and Matter', description: 'Photoelectric effect, Einstein\'s equation, de Broglie wavelength' },
      { chapterName: 'Atoms', description: 'Alpha particle scattering, Bohr model, hydrogen spectrum' },
      { chapterName: 'Nuclei', description: 'Nuclear size, mass defect, binding energy, radioactivity, fission, fusion' },
      { chapterName: 'Semiconductor Electronics', description: 'Energy bands, diodes, transistors, logic gates' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Chemistry', std: 12, board: BOARD,
    chapters: [
      { chapterName: 'The Solid State', description: 'Crystal lattice, unit cell, packing, defects, electrical properties' },
      { chapterName: 'Solutions', description: 'Types, concentration, Raoult\'s law, colligative properties, osmotic pressure' },
      { chapterName: 'Electrochemistry', description: 'Redox, Nernst equation, conductance, electrolysis, batteries, corrosion' },
      { chapterName: 'Chemical Kinetics', description: 'Rate of reaction, order, molecularity, Arrhenius equation' },
      { chapterName: 'Surface Chemistry', description: 'Adsorption, catalysis, colloids, emulsions' },
      { chapterName: 'General Principles of Isolation of Elements', description: 'Metallurgy, reduction, refining, thermodynamic and electrochemical principles' },
      { chapterName: 'The p-Block Elements', description: 'Group 15-18 elements, oxides, oxyacids, interhalogen compounds' },
      { chapterName: 'The d- and f-Block Elements', description: 'Transition metals, properties, lanthanides, actinides' },
      { chapterName: 'Coordination Compounds', description: 'Werner theory, IUPAC naming, isomerism, bonding, applications' },
      { chapterName: 'Haloalkanes and Haloarenes', description: 'Classification, nomenclature, reactions, SN1, SN2, elimination' },
      { chapterName: 'Alcohols, Phenols and Ethers', description: 'Classification, properties, reactions, preparation' },
      { chapterName: 'Aldehydes, Ketones and Carboxylic Acids', description: 'Nomenclature, reactions, nucleophilic addition, acidity' },
      { chapterName: 'Amines', description: 'Classification, properties, diazonium salts, identification' },
      { chapterName: 'Biomolecules', description: 'Carbohydrates, proteins, nucleic acids, vitamins, hormones' },
      { chapterName: 'Polymers', description: 'Classification, polymerization, copolymers, rubber, biodegradable' },
      { chapterName: 'Chemistry in Everyday Life', description: 'Drugs, soaps, detergents, food additives, antioxidants' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'Biology', std: 12, board: BOARD,
    chapters: [
      { chapterName: 'Reproduction in Organisms', description: 'Asexual and sexual reproduction, events in sexual reproduction' },
      { chapterName: 'Sexual Reproduction in Flowering Plants', description: 'Flower structure, pollination, fertilisation, embryo development' },
      { chapterName: 'Human Reproduction', description: 'Male and female reproductive systems, gametogenesis, menstrual cycle' },
      { chapterName: 'Reproductive Health', description: 'Family planning, STDs, infertility, ARTs' },
      { chapterName: 'Principles of Inheritance and Variation', description: 'Mendel\'s laws, linkage, sex-linked inheritance, chromosomal disorders' },
      { chapterName: 'Molecular Basis of Inheritance', description: 'DNA structure, replication, transcription, translation, genetic code, HGP' },
      { chapterName: 'Evolution', description: 'Origin of life, evidence, Darwin, Hardy-Weinberg, human evolution' },
      { chapterName: 'Human Health and Disease', description: 'Pathogens, immunity, AIDS, cancer, drugs and alcohol abuse' },
      { chapterName: 'Strategies for Enhancement in Food Production', description: 'Plant breeding, SCP, tissue culture, animal husbandry' },
      { chapterName: 'Microbes in Human Welfare', description: 'Fermentation, antibiotics, biogas, biocontrol, biofertilizers' },
      { chapterName: 'Biotechnology: Principles and Processes', description: 'rDNA technology, tools, PCR, gel electrophoresis, cloning vectors' },
      { chapterName: 'Biotechnology and its Applications', description: 'GM organisms, gene therapy, transgenic animals, biosafety, bioethics' },
      { chapterName: 'Organisms and Populations', description: 'Ecology — adaptations, population attributes, growth models, interactions' },
      { chapterName: 'Ecosystem', description: 'Structure, productivity, decomposition, energy flow, ecological pyramids' },
      { chapterName: 'Biodiversity and Conservation', description: 'Levels of biodiversity, patterns, loss, conservation strategies' },
      { chapterName: 'Environmental Issues', description: 'Pollution, solid waste, ozone depletion, deforestation, conservation acts' }
    ]
  });

  await upsertCurriculum({
    subjectName: 'English', std: 12, board: BOARD,
    chapters: [
      { chapterName: 'The Last Lesson', description: 'Prose — Alphonse Daudet, language loss, patriotism' },
      { chapterName: 'Lost Spring', description: 'Prose — Anees Jung, child labour, poverty' },
      { chapterName: 'Deep Water', description: 'Prose — William Douglas, fear and overcoming it' },
      { chapterName: 'The Rattrap', description: 'Prose — Selma Lagerlöf, human nature, kindness' },
      { chapterName: 'Indigo', description: 'Prose — Louis Fischer, Gandhi, Champaran movement' },
      { chapterName: 'Poets and Pancakes', description: 'Prose — Asokamitran, Gemini Studios, humor' },
      { chapterName: 'The Interview', description: 'Prose — Christopher Silvester, Umberto Eco' },
      { chapterName: 'Going Places', description: 'Prose — A.R. Barton, adolescence, dreams' },
      { chapterName: 'My Mother at Sixty-six', description: 'Poetry — Kamala Das, aging, love' },
      { chapterName: 'An Elementary School Classroom in a Slum', description: 'Poetry — Stephen Spender, inequality' },
      { chapterName: 'Keeping Quiet', description: 'Poetry — Pablo Neruda, introspection, peace' },
      { chapterName: 'A Thing of Beauty', description: 'Poetry — John Keats, beauty, joy' },
      { chapterName: 'Aunt Jennifer\'s Tigers', description: 'Poetry — Adrienne Rich, feminism, oppression' },
      { chapterName: 'The Third Level', description: 'Supplementary — Jack Finney, time travel, escapism' },
      { chapterName: 'The Tiger King', description: 'Supplementary — Kalki, satire, destiny' },
      { chapterName: 'The Enemy', description: 'Supplementary — Pearl S. Buck, humanity, war' },
      { chapterName: 'On the Face of It', description: 'Supplementary — Susan Hill, prejudice, friendship' },
      { chapterName: 'Memories of Childhood', description: 'Supplementary — Zitkala-Sa and Bama, discrimination' }
    ]
  });

  console.log('✅ All curriculum data seeded (Classes 1–12)!');

  // ═══════════════════════════════════════════════════════════
  // QUIZ DATA — Classes 1–5
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding quizzes for Classes 1–5...');

  // Class 1 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Shapes and Space', questions: [
    { q: 'Which shape has 3 sides?', options: ['Circle', 'Square', 'Triangle', 'Rectangle'], ans: 2 },
    { q: 'A ball is shaped like a ___', options: ['Cube', 'Sphere', 'Cone', 'Cylinder'], ans: 1 },
    { q: 'How many corners does a rectangle have?', options: ['2', '3', '4', '5'], ans: 2 },
    { q: 'Which shape has no corners?', options: ['Triangle', 'Square', 'Circle', 'Rectangle'], ans: 2 },
    { q: 'A dice is shaped like a ___', options: ['Sphere', 'Cylinder', 'Cube', 'Cone'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Addition', questions: [
    { q: 'What is 3 + 4?', options: ['6', '7', '8', '5'], ans: 1 },
    { q: 'What is 5 + 2?', options: ['3', '6', '7', '8'], ans: 2 },
    { q: '2 + 2 = ?', options: ['3', '4', '5', '6'], ans: 1 },
    { q: '6 + 1 = ?', options: ['5', '6', '7', '8'], ans: 2 },
    { q: 'If you have 4 apples and get 3 more, how many do you have?', options: ['5', '6', '7', '8'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Subtraction', questions: [
    { q: 'What is 7 - 3?', options: ['3', '4', '5', '6'], ans: 1 },
    { q: '9 - 5 = ?', options: ['3', '4', '5', '6'], ans: 1 },
    { q: 'You have 8 candies and eat 2. How many left?', options: ['4', '5', '6', '7'], ans: 2 },
    { q: '6 - 6 = ?', options: ['0', '1', '6', '12'], ans: 0 },
    { q: 'What is 5 - 1?', options: ['3', '4', '5', '6'], ans: 1 }
  ]});

  // Class 1 EVS
  await upsertQuiz({ subjectName: 'EVS', chapterName: 'My Family', questions: [
    { q: 'Your father\'s mother is your ___', options: ['Mother', 'Aunt', 'Grandmother', 'Sister'], ans: 2 },
    { q: 'Who is usually the youngest in a family?', options: ['Father', 'Mother', 'Grandparent', 'Baby'], ans: 3 },
    { q: 'A family that lives together helps each other. True or false?', options: ['True', 'False', 'Sometimes', 'Never'], ans: 0 },
    { q: 'Your mother\'s sister is your ___', options: ['Mother', 'Aunt', 'Grandmother', 'Cousin'], ans: 1 },
    { q: 'Which is NOT a family member?', options: ['Father', 'Brother', 'Teacher', 'Sister'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Plants Around Us', questions: [
    { q: 'Which part of the plant is underground?', options: ['Leaf', 'Stem', 'Root', 'Flower'], ans: 2 },
    { q: 'Trees are ___ plants', options: ['Small', 'Big and tall', 'Tiny', 'Floating'], ans: 1 },
    { q: 'We get fruits from ___', options: ['Roots', 'Leaves', 'Plants', 'Soil'], ans: 2 },
    { q: 'Flowers are usually ___', options: ['Colourful', 'Black', 'Invisible', 'Square'], ans: 0 },
    { q: 'Plants need ___ to grow', options: ['Toys', 'Water and sunlight', 'Stones', 'Darkness'], ans: 1 }
  ]});

  // Class 3 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'How Many Times?', questions: [
    { q: '3 × 4 = ?', options: ['7', '10', '12', '14'], ans: 2 },
    { q: '5 groups of 2 makes ___', options: ['7', '10', '12', '25'], ans: 1 },
    { q: '2 × 6 = ?', options: ['8', '10', '12', '14'], ans: 2 },
    { q: 'If each box has 4 pencils and there are 3 boxes, total pencils = ?', options: ['7', '12', '10', '15'], ans: 1 },
    { q: '1 × 9 = ?', options: ['0', '1', '9', '10'], ans: 2 }
  ]});

  // Class 3 EVS
  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Water O Water', questions: [
    { q: 'Which of these is a source of water?', options: ['Mountain', 'River', 'Desert', 'Fire'], ans: 1 },
    { q: 'We should ___ water', options: ['Waste', 'Pollute', 'Save', 'Colour'], ans: 2 },
    { q: 'Rain water comes from ___', options: ['Rivers', 'Clouds', 'Mountains', 'Ground'], ans: 1 },
    { q: 'Which is NOT a use of water?', options: ['Drinking', 'Cooking', 'Bathing', 'Flying'], ans: 3 },
    { q: 'Water that is safe to drink is called ___', options: ['Salt water', 'Dirty water', 'Potable water', 'River water'], ans: 2 }
  ]});

  // Class 5 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Parts and Wholes', questions: [
    { q: 'What fraction of a pizza is 1 slice out of 4 equal slices?', options: ['1/2', '1/3', '1/4', '1/8'], ans: 2 },
    { q: 'Which is greater: 1/2 or 1/4?', options: ['1/4', '1/2', 'Both equal', 'Cannot compare'], ans: 1 },
    { q: '2/4 is the same as ___', options: ['1/4', '1/2', '3/4', '1/3'], ans: 1 },
    { q: 'Half of 10 is ___', options: ['2', '4', '5', '10'], ans: 2 },
    { q: 'If you eat 3/8 of a cake, what fraction is left?', options: ['3/8', '5/8', '1/8', '4/8'], ans: 1 }
  ]});

  // Class 5 EVS
  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Super Senses', questions: [
    { q: 'Which animal can see well in the dark?', options: ['Cow', 'Owl', 'Hen', 'Sheep'], ans: 1 },
    { q: 'Dogs have a strong sense of ___', options: ['Sight', 'Hearing', 'Smell', 'Taste'], ans: 2 },
    { q: 'Snakes sense vibrations through their ___', options: ['Eyes', 'Ears', 'Body', 'Tongue'], ans: 2 },
    { q: 'Which insect uses antennae to sense?', options: ['Spider', 'Ant', 'Frog', 'Fish'], ans: 1 },
    { q: 'Dolphins communicate using ___', options: ['Light', 'Sound', 'Smell', 'Touch'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Every Drop Counts', questions: [
    { q: 'Rainwater harvesting means ___', options: ['Wasting rain', 'Collecting rain for use', 'Drinking rain directly', 'Playing in rain'], ans: 1 },
    { q: 'Which uses the MOST water?', options: ['Brushing teeth', 'Washing a car', 'Filling a swimming pool', 'Drinking a glass'], ans: 2 },
    { q: 'A dripping tap wastes ___', options: ['No water', 'Very little water', 'A lot of water over time', 'Only cold water'], ans: 2 },
    { q: 'To save water while brushing, you should ___', options: ['Keep tap running', 'Turn off tap', 'Use a hose', 'Brush faster'], ans: 1 },
    { q: 'Which is a sign of water scarcity?', options: ['Floods', 'Rivers drying up', 'Heavy rainfall', 'Full dams'], ans: 1 }
  ]});

  // ═══════════════════════════════════════════════════════════
  // QUIZ DATA — Classes 6–8
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding quizzes for Classes 6–8...');

  // Class 6 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Knowing Our Numbers', questions: [
    { q: 'The smallest 4-digit number is:', options: ['999', '1000', '1001', '9999'], ans: 1 },
    { q: 'In the Indian system, 1 lakh = ?', options: ['10,000', '1,00,000', '10,00,000', '1,000'], ans: 1 },
    { q: 'Which is the greatest: 9999, 10000, 9990, 10001?', options: ['9999', '10000', '9990', '10001'], ans: 3 },
    { q: 'The Roman numeral for 50 is:', options: ['V', 'X', 'L', 'C'], ans: 2 },
    { q: 'Estimation of 578 + 212 to nearest hundred is:', options: ['700', '800', '790', '900'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Playing with Numbers', questions: [
    { q: 'HCF of 12 and 18 is:', options: ['2', '4', '6', '12'], ans: 2 },
    { q: 'LCM of 4 and 6 is:', options: ['2', '6', '12', '24'], ans: 2 },
    { q: 'Which is a prime number?', options: ['4', '9', '13', '15'], ans: 2 },
    { q: 'A number divisible by 2 and 3 both is divisible by:', options: ['5', '6', '7', '8'], ans: 1 },
    { q: 'The smallest prime number is:', options: ['0', '1', '2', '3'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Algebra', questions: [
    { q: 'If x = 3, what is 2x + 1?', options: ['5', '6', '7', '8'], ans: 2 },
    { q: 'Which is a variable?', options: ['5', '10', 'x', '100'], ans: 2 },
    { q: 'The expression for "3 more than a number n" is:', options: ['n - 3', '3n', 'n + 3', 'n/3'], ans: 2 },
    { q: '5x means:', options: ['5 + x', '5 × x', '5 - x', '5 ÷ x'], ans: 1 },
    { q: 'If 2x = 10, then x = ?', options: ['2', '5', '10', '20'], ans: 1 }
  ]});

  // Class 6 Science
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Components of Food', questions: [
    { q: 'Which nutrient gives us energy?', options: ['Vitamins', 'Minerals', 'Carbohydrates', 'Water'], ans: 2 },
    { q: 'Deficiency of Vitamin C causes:', options: ['Rickets', 'Scurvy', 'Night blindness', 'Goitre'], ans: 1 },
    { q: 'Proteins are called:', options: ['Energy-giving food', 'Body-building food', 'Protective food', 'Junk food'], ans: 1 },
    { q: 'Iodine test is used to check for:', options: ['Protein', 'Fat', 'Starch', 'Vitamin'], ans: 2 },
    { q: 'Which is a balanced diet?', options: ['Only rice', 'Only fruits', 'All nutrients in right amounts', 'Only sweets'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Electricity and Circuits', questions: [
    { q: 'An electric cell has ___ terminals', options: ['1', '2', '3', '4'], ans: 1 },
    { q: 'A material that allows electric current to pass is called a:', options: ['Insulator', 'Conductor', 'Switch', 'Fuse'], ans: 1 },
    { q: 'Which is an insulator?', options: ['Copper', 'Iron', 'Rubber', 'Aluminium'], ans: 2 },
    { q: 'A switch is used to:', options: ['Generate electricity', 'Store electricity', 'Break or complete a circuit', 'Measure current'], ans: 2 },
    { q: 'In a torch, the source of electricity is:', options: ['Wire', 'Bulb', 'Cell/Battery', 'Switch'], ans: 2 }
  ]});

  // Class 7 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Integers', questions: [
    { q: '(-3) × (-4) = ?', options: ['-12', '-7', '7', '12'], ans: 3 },
    { q: '(-5) + 8 = ?', options: ['-13', '-3', '3', '13'], ans: 2 },
    { q: 'The additive inverse of -7 is:', options: ['-7', '0', '7', '1/7'], ans: 2 },
    { q: '(-20) ÷ 5 = ?', options: ['-4', '-15', '4', '15'], ans: 0 },
    { q: 'Which is the smallest: -5, -3, 0, 2?', options: ['-5', '-3', '0', '2'], ans: 0 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Comparing Quantities', questions: [
    { q: '25% of 200 is:', options: ['25', '50', '75', '100'], ans: 1 },
    { q: 'A shirt costs Rs 500. A 10% discount means you pay:', options: ['Rs 400', 'Rs 450', 'Rs 490', 'Rs 500'], ans: 1 },
    { q: 'Simple interest on Rs 1000 at 5% for 2 years is:', options: ['Rs 50', 'Rs 100', 'Rs 150', 'Rs 200'], ans: 1 },
    { q: 'Ratio of 15 to 25 in simplest form is:', options: ['15:25', '3:5', '5:3', '1:2'], ans: 1 },
    { q: 'If CP = Rs 200 and SP = Rs 250, then profit is:', options: ['Rs 25', 'Rs 50', 'Rs 200', 'Rs 250'], ans: 1 }
  ]});

  // Class 7 Science
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Nutrition in Plants', questions: [
    { q: 'The process by which plants make food is called:', options: ['Respiration', 'Photosynthesis', 'Digestion', 'Excretion'], ans: 1 },
    { q: 'Which gas do plants take in during photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], ans: 2 },
    { q: 'The green pigment in leaves is:', options: ['Haemoglobin', 'Chlorophyll', 'Melanin', 'Keratin'], ans: 1 },
    { q: 'Cuscuta is an example of a ___ plant', options: ['Insectivorous', 'Saprotrophic', 'Parasitic', 'Autotrophic'], ans: 2 },
    { q: 'Venus flytrap is a ___ plant', options: ['Parasitic', 'Insectivorous', 'Saprophytic', 'Symbiotic'], ans: 1 }
  ]});

  // Class 8 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Squares and Square Roots', questions: [
    { q: 'Square of 12 is:', options: ['24', '122', '144', '124'], ans: 2 },
    { q: 'Square root of 49 is:', options: ['5', '6', '7', '8'], ans: 2 },
    { q: 'Which is a perfect square?', options: ['50', '63', '81', '90'], ans: 2 },
    { q: 'How many non-square numbers lie between 4² and 5²?', options: ['6', '7', '8', '9'], ans: 2 },
    { q: '√169 = ?', options: ['11', '12', '13', '14'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Comparing Quantities', questions: [
    { q: 'Compound interest formula is:', options: ['P×R×T/100', 'A = P(1+R/100)^n', 'P+R+T', 'A = P×R×n'], ans: 1 },
    { q: 'A shopkeeper marks a shirt at Rs 500 and gives 20% discount. SP = ?', options: ['Rs 400', 'Rs 300', 'Rs 450', 'Rs 480'], ans: 0 },
    { q: 'GST stands for:', options: ['General Sales Tax', 'Goods and Services Tax', 'Global Standard Tax', 'Grand State Tax'], ans: 1 },
    { q: 'If Rs 10000 is invested at 10% CI for 2 years, amount is:', options: ['Rs 12000', 'Rs 12100', 'Rs 11000', 'Rs 11100'], ans: 1 },
    { q: 'Loss % = ?', options: ['(Loss/SP)×100', '(Loss/CP)×100', '(CP-SP)×100', '(SP/CP)×100'], ans: 1 }
  ]});

  // Class 8 Science
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Cell — Structure and Functions', questions: [
    { q: 'The basic structural and functional unit of life is:', options: ['Tissue', 'Organ', 'Cell', 'System'], ans: 2 },
    { q: 'Which organelle is called the "powerhouse of the cell"?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], ans: 1 },
    { q: 'Plant cells have ___ that animal cells don\'t', options: ['Nucleus', 'Cell wall', 'Mitochondria', 'Cytoplasm'], ans: 1 },
    { q: 'The control centre of the cell is:', options: ['Cytoplasm', 'Cell membrane', 'Nucleus', 'Vacuole'], ans: 2 },
    { q: 'Robert Hooke discovered cells in:', options: ['1565', '1665', '1765', '1865'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Friction', questions: [
    { q: 'Friction acts in the ___ direction of motion', options: ['Same', 'Opposite', 'Perpendicular', 'No specific'], ans: 1 },
    { q: 'Which surface produces more friction?', options: ['Glass', 'Ice', 'Rough road', 'Wet floor'], ans: 2 },
    { q: 'Friction can be reduced by:', options: ['Making surfaces rough', 'Using lubricants', 'Increasing weight', 'Removing wheels'], ans: 1 },
    { q: 'Static friction is ___ sliding friction', options: ['Less than', 'Equal to', 'Greater than', 'Same as'], ans: 2 },
    { q: 'Ball bearings help to:', options: ['Increase friction', 'Reduce friction', 'Stop motion', 'Create heat'], ans: 1 }
  ]});

  // ═══════════════════════════════════════════════════════════
  // QUIZ DATA — Class 9
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding quizzes for Class 9...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Number Systems', questions: [
    { q: 'Which of the following is irrational?', options: ['3/4', '√2', '0.5', '22/7'], ans: 1 },
    { q: 'Every rational number is:', options: ['An integer', 'A natural number', 'A real number', 'An irrational number'], ans: 2 },
    { q: 'The decimal expansion of √2 is:', options: ['Terminating', 'Non-terminating repeating', 'Non-terminating non-repeating', 'None'], ans: 2 },
    { q: 'Between 3 and 4, the number of irrational numbers is:', options: ['0', '1', '10', 'Infinite'], ans: 3 },
    { q: 'The value of 64^(1/3) is:', options: ['2', '4', '8', '16'], ans: 1 },
    { q: 'Which represents a rational number?', options: ['π', '√3', '0.333...', '√5'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Polynomials', questions: [
    { q: 'The degree of 5x³ + 4x² - 7 is:', options: ['1', '2', '3', '5'], ans: 2 },
    { q: 'A polynomial of degree 2 is called:', options: ['Linear', 'Quadratic', 'Cubic', 'Constant'], ans: 1 },
    { q: 'The zero of p(x) = 2x - 6 is:', options: ['2', '3', '6', '-3'], ans: 1 },
    { q: 'If x = 1 is a zero of p(x), then:', options: ['p(0) = 0', 'p(1) = 0', 'p(-1) = 0', 'p(2) = 0'], ans: 1 },
    { q: 'How many zeroes can a cubic polynomial have at most?', options: ['1', '2', '3', '4'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Triangles', questions: [
    { q: 'If two triangles are congruent, they have:', options: ['Same area only', 'Same shape only', 'Same shape and size', 'Different sizes'], ans: 2 },
    { q: 'SAS congruence means:', options: ['Side-Angle-Side', 'Side-Area-Side', 'Sum-Angle-Sum', 'Straight-Angle-Side'], ans: 0 },
    { q: 'The sum of angles of a triangle is:', options: ['90°', '180°', '270°', '360°'], ans: 1 },
    { q: 'In a triangle, the side opposite to the largest angle is:', options: ['Shortest', 'Equal', 'Longest', 'Medium'], ans: 2 },
    { q: 'An equilateral triangle has ___ lines of symmetry', options: ['0', '1', '2', '3'], ans: 3 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Matter in Our Surroundings', questions: [
    { q: 'Which state of matter has a definite shape and volume?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], ans: 0 },
    { q: 'The process of conversion from liquid to gas is called:', options: ['Condensation', 'Evaporation', 'Sublimation', 'Freezing'], ans: 1 },
    { q: 'Dry ice is solid form of:', options: ['Water', 'Oxygen', 'Carbon dioxide', 'Nitrogen'], ans: 2 },
    { q: 'Which has the highest kinetic energy of particles?', options: ['Solid', 'Liquid', 'Gas', 'All equal'], ans: 2 },
    { q: 'The boiling point of water is:', options: ['0°C', '100°C', '212°F', 'Both B and C'], ans: 3 },
    { q: 'Sublimation is the conversion from:', options: ['Solid to liquid', 'Liquid to gas', 'Solid to gas', 'Gas to solid'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Atoms and Molecules', questions: [
    { q: 'The law of conservation of mass was given by:', options: ['Dalton', 'Lavoisier', 'Proust', 'Avogadro'], ans: 1 },
    { q: 'The chemical formula of water is:', options: ['HO', 'H₂O', 'H₂O₂', 'OH₂'], ans: 1 },
    { q: 'One mole of any substance contains ___ particles', options: ['6.022 × 10²³', '6.022 × 10²²', '3.011 × 10²³', '1.6 × 10⁻¹⁹'], ans: 0 },
    { q: 'Atomic mass of carbon is:', options: ['6 u', '12 u', '14 u', '16 u'], ans: 1 },
    { q: 'The valency of oxygen is:', options: ['1', '2', '3', '4'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Motion', questions: [
    { q: 'SI unit of velocity is:', options: ['m/s²', 'm/s', 'km/h', 'm'], ans: 1 },
    { q: 'Acceleration due to gravity on Earth is approximately:', options: ['8.9 m/s²', '9.8 m/s²', '10.8 m/s²', '6.8 m/s²'], ans: 1 },
    { q: 'A body at rest has speed equal to:', options: ['1 m/s', '-1 m/s', '0 m/s', 'Infinity'], ans: 2 },
    { q: 'The area under a velocity-time graph gives:', options: ['Speed', 'Acceleration', 'Displacement', 'Force'], ans: 2 },
    { q: 'If a car moves in a circle at constant speed, its velocity is:', options: ['Constant', 'Changing', 'Zero', 'Infinite'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Force and Laws of Motion', questions: [
    { q: 'Newton\'s first law is also called the law of:', options: ['Momentum', 'Inertia', 'Action-reaction', 'Gravitation'], ans: 1 },
    { q: 'F = ma is Newton\'s ___ law', options: ['First', 'Second', 'Third', 'Zeroth'], ans: 1 },
    { q: 'Action and reaction forces act on:', options: ['Same body', 'Different bodies', 'No body', 'Only heavy bodies'], ans: 1 },
    { q: 'The SI unit of force is:', options: ['kg', 'Newton', 'Joule', 'Watt'], ans: 1 },
    { q: 'Momentum = mass × ___', options: ['Acceleration', 'Force', 'Velocity', 'Distance'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'The French Revolution', questions: [
    { q: 'The French Revolution began in:', options: ['1776', '1789', '1804', '1815'], ans: 1 },
    { q: 'The slogan of the French Revolution was:', options: ['Bread and Peace', 'Liberty, Equality, Fraternity', 'Workers Unite', 'Power to People'], ans: 1 },
    { q: 'The Bastille was a:', options: ['Palace', 'Church', 'Prison-fortress', 'University'], ans: 2 },
    { q: 'Who was the king of France during the Revolution?', options: ['Louis XIV', 'Louis XV', 'Louis XVI', 'Napoleon'], ans: 2 },
    { q: 'The Declaration of the Rights of Man was adopted in:', options: ['1789', '1791', '1793', '1799'], ans: 0 }
  ]});
  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'What is Democracy? Why Democracy?', questions: [
    { q: 'Democracy is a form of government where rulers are elected by:', options: ['Military', 'King', 'People', 'Judges'], ans: 2 },
    { q: 'Which is NOT a feature of democracy?', options: ['Free elections', 'Equal rights', 'Rule of one person', 'Free press'], ans: 2 },
    { q: 'India became a democratic republic in:', options: ['1947', '1949', '1950', '1952'], ans: 2 },
    { q: 'In a democracy, the final decision-making power rests with:', options: ['Army', 'Judiciary', 'Elected representatives', 'Business leaders'], ans: 2 },
    { q: 'Which country is NOT a democracy?', options: ['India', 'USA', 'North Korea', 'Japan'], ans: 2 }
  ]});

  // ═══════════════════════════════════════════════════════════
  // QUIZ DATA — Class 10
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding quizzes for Class 10...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Real Numbers', questions: [
    { q: 'The HCF of 26 and 91 is:', options: ['13', '26', '91', '7'], ans: 0 },
    { q: 'The Fundamental Theorem of Arithmetic states that every composite number can be expressed as a product of:', options: ['Two numbers', 'Primes', 'Even numbers', 'Odd numbers'], ans: 1 },
    { q: 'If HCF(a,b) = 1, then a and b are called:', options: ['Prime', 'Composite', 'Co-prime', 'Twin primes'], ans: 2 },
    { q: 'LCM(12, 18) = ?', options: ['6', '12', '36', '216'], ans: 2 },
    { q: 'HCF × LCM of two numbers equals:', options: ['Sum of numbers', 'Difference', 'Product of numbers', 'Quotient'], ans: 2 },
    { q: 'The decimal expansion of 17/8 is:', options: ['Terminating', 'Non-terminating repeating', 'Non-terminating non-repeating', 'None'], ans: 0 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Quadratic Equations', questions: [
    { q: 'The roots of x² - 5x + 6 = 0 are:', options: ['2, 3', '1, 6', '-2, -3', '-1, -6'], ans: 0 },
    { q: 'The discriminant of ax² + bx + c = 0 is:', options: ['b² - 4ac', 'b² + 4ac', '4ac - b²', '2b - ac'], ans: 0 },
    { q: 'If discriminant = 0, the equation has:', options: ['No real roots', 'Two distinct roots', 'Two equal roots', 'Infinite roots'], ans: 2 },
    { q: 'The sum of roots of x² - 7x + 10 = 0 is:', options: ['7', '-7', '10', '-10'], ans: 0 },
    { q: 'Which is a quadratic equation?', options: ['x + 1 = 0', 'x² + x = 0', 'x³ = 1', '1/x = 2'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Trigonometry', questions: [
    { q: 'sin 30° = ?', options: ['0', '1/2', '1/√2', '√3/2'], ans: 1 },
    { q: 'cos 0° = ?', options: ['0', '1/2', '1', '√3/2'], ans: 2 },
    { q: 'tan 45° = ?', options: ['0', '1', '√3', 'Undefined'], ans: 1 },
    { q: 'sin²θ + cos²θ = ?', options: ['0', '1', '2', 'sinθ'], ans: 1 },
    { q: 'The value of sec 60° is:', options: ['1', '√2', '2', '1/2'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Probability', questions: [
    { q: 'Probability of getting a head when tossing a coin is:', options: ['0', '1/4', '1/2', '1'], ans: 2 },
    { q: 'The probability of an impossible event is:', options: ['0', '1/2', '1', '-1'], ans: 0 },
    { q: 'A die is thrown. P(getting 6) = ?', options: ['1/2', '1/3', '1/6', '6'], ans: 2 },
    { q: 'P(E) + P(not E) = ?', options: ['0', '1/2', '1', '2'], ans: 2 },
    { q: 'Two dice are thrown. Total outcomes = ?', options: ['6', '12', '24', '36'], ans: 3 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Chemical Reactions and Equations', questions: [
    { q: 'A balanced chemical equation has equal number of ___ on both sides', options: ['Molecules', 'Atoms of each element', 'Compounds', 'Reactions'], ans: 1 },
    { q: 'Rusting of iron is an example of:', options: ['Combination', 'Decomposition', 'Oxidation', 'Reduction'], ans: 2 },
    { q: 'In a decomposition reaction, a single reactant breaks into:', options: ['One product', 'Two or more products', 'No products', 'Water only'], ans: 1 },
    { q: 'Fe + CuSO₄ → FeSO₄ + Cu is a ___ reaction', options: ['Combination', 'Decomposition', 'Displacement', 'Double displacement'], ans: 2 },
    { q: 'The burning of magnesium ribbon produces:', options: ['MgO', 'MgCl₂', 'Mg(OH)₂', 'MgSO₄'], ans: 0 },
    { q: 'An exothermic reaction ___ heat', options: ['Absorbs', 'Releases', 'Neither', 'Both'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Acids, Bases and Salts', questions: [
    { q: 'The pH of a neutral solution is:', options: ['0', '7', '14', '1'], ans: 1 },
    { q: 'Which turns blue litmus red?', options: ['Base', 'Acid', 'Salt', 'Water'], ans: 1 },
    { q: 'The formula of baking soda is:', options: ['NaCl', 'NaHCO₃', 'Na₂CO₃', 'NaOH'], ans: 1 },
    { q: 'Acid + Base → ___ + Water', options: ['Acid', 'Base', 'Salt', 'Gas'], ans: 2 },
    { q: 'Tooth decay is caused by pH ___ than 5.5', options: ['Greater', 'Less', 'Equal', 'None'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Life Processes', questions: [
    { q: 'The process by which organisms obtain energy from food is:', options: ['Nutrition', 'Respiration', 'Transportation', 'Excretion'], ans: 1 },
    { q: 'Photosynthesis occurs in:', options: ['Roots', 'Leaves', 'Stem', 'Flowers'], ans: 1 },
    { q: 'The human heart has ___ chambers', options: ['2', '3', '4', '5'], ans: 2 },
    { q: 'Xylem transports ___ in plants', options: ['Food', 'Water and minerals', 'Hormones', 'Oxygen'], ans: 1 },
    { q: 'The main excretory organ in humans is:', options: ['Liver', 'Lungs', 'Kidney', 'Skin'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Electricity', questions: [
    { q: 'The SI unit of electric current is:', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], ans: 2 },
    { q: 'V = IR is called:', options: ['Faraday\'s law', 'Ohm\'s law', 'Kirchhoff\'s law', 'Coulomb\'s law'], ans: 1 },
    { q: 'In a series circuit, the current is:', options: ['Different everywhere', 'Same everywhere', 'Zero', 'Infinite'], ans: 1 },
    { q: 'Electric power P = ?', options: ['V/I', 'V × I', 'I/V', 'V + I'], ans: 1 },
    { q: '1 kWh = ?', options: ['3.6 × 10⁶ J', '3600 J', '360 J', '36 J'], ans: 0 },
    { q: 'The resistance of a conductor ___ with increase in temperature', options: ['Decreases', 'Increases', 'Remains same', 'Becomes zero'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Science', chapterName: 'Light — Reflection and Refraction', questions: [
    { q: 'The angle of incidence equals the angle of reflection. This is:', options: ['Snell\'s law', 'Law of reflection', 'Law of refraction', 'Hooke\'s law'], ans: 1 },
    { q: 'A concave mirror converges light at its:', options: ['Centre', 'Pole', 'Focus', 'Radius'], ans: 2 },
    { q: 'The refractive index of glass is about:', options: ['1.0', '1.3', '1.5', '2.0'], ans: 2 },
    { q: 'When light goes from air to water, it bends ___ the normal', options: ['Away from', 'Towards', 'Parallel to', 'Does not bend'], ans: 1 },
    { q: 'The mirror formula is:', options: ['1/f = 1/v - 1/u', '1/f = 1/v + 1/u', 'f = v + u', 'f = v × u'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'Nationalism in India', questions: [
    { q: 'The Non-Cooperation Movement was launched in:', options: ['1919', '1920', '1930', '1942'], ans: 1 },
    { q: 'The Salt March was also known as:', options: ['Quit India March', 'Dandi March', 'Long March', 'Freedom March'], ans: 1 },
    { q: 'Who led the Civil Disobedience Movement?', options: ['Nehru', 'Subhas Bose', 'Mahatma Gandhi', 'Patel'], ans: 2 },
    { q: 'The Jallianwala Bagh massacre happened in:', options: ['Delhi', 'Mumbai', 'Amritsar', 'Kolkata'], ans: 2 },
    { q: 'The Simon Commission was boycotted because:', options: ['It was too large', 'It had no Indian member', 'It was too late', 'It was unofficial'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'Resources and Development', questions: [
    { q: 'Resources which are surveyed and their quality and quantity determined are called:', options: ['Potential', 'Developed', 'Stock', 'Reserve'], ans: 1 },
    { q: 'Soil formed by intense leaching in heavy rainfall areas is:', options: ['Alluvial', 'Black', 'Laterite', 'Red'], ans: 2 },
    { q: 'Which soil is ideal for cotton cultivation?', options: ['Alluvial', 'Black (Regur)', 'Red', 'Laterite'], ans: 1 },
    { q: 'Land degradation is caused by:', options: ['Afforestation', 'Overgrazing', 'Terracing', 'Contour ploughing'], ans: 1 },
    { q: 'The percentage of plain area in India is about:', options: ['23%', '30%', '43%', '60%'], ans: 2 }
  ]});

  // ═══════════════════════════════════════════════════════════
  // QUIZ DATA — Classes 11–12
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding quizzes for Classes 11–12...');

  // Class 11 Physics
  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Units and Measurements', questions: [
    { q: 'The SI unit of luminous intensity is:', options: ['Lumen', 'Candela', 'Lux', 'Watt'], ans: 1 },
    { q: 'Dimensional formula of force is:', options: ['[MLT⁻¹]', '[MLT⁻²]', '[ML²T⁻²]', '[M²LT⁻²]'], ans: 1 },
    { q: 'Number of significant figures in 0.0045 is:', options: ['1', '2', '3', '4'], ans: 1 },
    { q: '1 parsec = ?', options: ['3.26 light years', '1 AU', '1 km', '3.08 × 10¹⁶ m'], ans: 3 },
    { q: 'The principle of homogeneity of dimensions states:', options: ['All terms must have same units', 'All terms must have same dimensions', 'All terms must be equal', 'Dimensions can be different'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Laws of Motion', questions: [
    { q: 'A body of mass 5 kg is acted upon by a force of 10 N. The acceleration is:', options: ['2 m/s²', '5 m/s²', '10 m/s²', '50 m/s²'], ans: 0 },
    { q: 'In a tug of war, the rope does not accelerate because:', options: ['No force acts', 'Forces are unbalanced', 'Forces are balanced', 'Friction is zero'], ans: 2 },
    { q: 'The coefficient of static friction is generally ___ kinetic friction', options: ['Less than', 'Equal to', 'Greater than', 'Half of'], ans: 2 },
    { q: 'A person in a lift feels heavier when lift accelerates:', options: ['Downward', 'Upward', 'Horizontally', 'At constant speed'], ans: 1 },
    { q: 'Banking of roads helps in providing:', options: ['Friction', 'Centripetal force', 'Gravitational force', 'Magnetic force'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Thermodynamics', questions: [
    { q: 'In an isothermal process, the temperature:', options: ['Increases', 'Decreases', 'Remains constant', 'First increases then decreases'], ans: 2 },
    { q: 'The efficiency of a Carnot engine depends on:', options: ['Working substance', 'Temperature of source and sink', 'Pressure', 'Volume'], ans: 1 },
    { q: 'The first law of thermodynamics is a statement of:', options: ['Conservation of mass', 'Conservation of energy', 'Conservation of momentum', 'Entropy'], ans: 1 },
    { q: 'In an adiabatic process:', options: ['ΔQ = 0', 'ΔW = 0', 'ΔU = 0', 'ΔT = 0'], ans: 0 },
    { q: 'Entropy of the universe always:', options: ['Decreases', 'Remains constant', 'Increases', 'Oscillates'], ans: 2 }
  ]});

  // Class 11 Chemistry
  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Some Basic Concepts of Chemistry', questions: [
    { q: 'The number of moles in 36g of water is:', options: ['1', '2', '3', '4'], ans: 1 },
    { q: 'Avogadro\'s number is:', options: ['6.022 × 10²³', '6.022 × 10²²', '3.011 × 10²³', '1.6 × 10⁻¹⁹'], ans: 0 },
    { q: 'Molarity is defined as moles of solute per:', options: ['kg of solvent', 'litre of solution', 'litre of solvent', 'g of solution'], ans: 1 },
    { q: 'The law of definite proportions was given by:', options: ['Dalton', 'Proust', 'Lavoisier', 'Avogadro'], ans: 1 },
    { q: 'Empirical formula of glucose (C₆H₁₂O₆) is:', options: ['C₆H₁₂O₆', 'CH₂O', 'C₃H₆O₃', 'CHO'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Chemical Bonding and Molecular Structure', questions: [
    { q: 'The shape of methane (CH₄) is:', options: ['Linear', 'Trigonal planar', 'Tetrahedral', 'Square planar'], ans: 2 },
    { q: 'Hybridization of carbon in ethene is:', options: ['sp', 'sp²', 'sp³', 'sp³d'], ans: 1 },
    { q: 'A sigma bond is formed by:', options: ['Lateral overlap', 'Head-on overlap', 'No overlap', 'Sidewise overlap'], ans: 1 },
    { q: 'The bond angle in water molecule is about:', options: ['90°', '104.5°', '109.5°', '120°'], ans: 1 },
    { q: 'Ionic bonds are formed between:', options: ['Two metals', 'Two non-metals', 'Metal and non-metal', 'Noble gases'], ans: 2 }
  ]});

  // Class 11 Biology
  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Cell: The Unit of Life', questions: [
    { q: 'The fluid mosaic model of cell membrane was proposed by:', options: ['Robert Hooke', 'Singer and Nicolson', 'Watson and Crick', 'Schleiden'], ans: 1 },
    { q: 'Ribosomes are the site of:', options: ['Respiration', 'Protein synthesis', 'Photosynthesis', 'Lipid synthesis'], ans: 1 },
    { q: 'The Golgi apparatus was discovered by:', options: ['Robert Brown', 'Camillo Golgi', 'Robert Hooke', 'Schleiden'], ans: 1 },
    { q: 'Which organelle is absent in animal cells?', options: ['Mitochondria', 'Plastids', 'Ribosomes', 'Nucleus'], ans: 1 },
    { q: 'The cell wall in plants is made of:', options: ['Protein', 'Lipids', 'Cellulose', 'Starch'], ans: 2 }
  ]});
  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Photosynthesis in Higher Plants', questions: [
    { q: 'The light reaction of photosynthesis occurs in:', options: ['Stroma', 'Thylakoid', 'Cytoplasm', 'Nucleus'], ans: 1 },
    { q: 'The enzyme that fixes CO₂ in C3 plants is:', options: ['PEPcase', 'RuBisCO', 'ATP synthase', 'Kinase'], ans: 1 },
    { q: 'PS I has its reaction centre at:', options: ['P680', 'P700', 'P600', 'P720'], ans: 1 },
    { q: 'In C4 plants, the first stable product is:', options: ['PGA', 'OAA', 'RuBP', 'G3P'], ans: 1 },
    { q: 'The dark reactions occur in:', options: ['Thylakoid', 'Stroma', 'Cell membrane', 'Cytoplasm'], ans: 1 }
  ]});

  // Class 12 Physics
  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Electric Charges and Fields', questions: [
    { q: 'Coulomb\'s law is analogous to:', options: ['Newton\'s law of gravitation', 'Ohm\'s law', 'Faraday\'s law', 'Ampere\'s law'], ans: 0 },
    { q: 'The SI unit of electric field is:', options: ['V', 'N/C', 'C/m', 'J/C'], ans: 1 },
    { q: 'Electric field lines never:', options: ['Start from positive charge', 'End at negative charge', 'Cross each other', 'Curve'], ans: 2 },
    { q: 'The total electric flux through a closed surface with charge q inside is:', options: ['q/ε₀', 'qε₀', 'q²/ε₀', '0'], ans: 0 },
    { q: 'Like charges:', options: ['Attract', 'Repel', 'Have no effect', 'Neutralize'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Current Electricity', questions: [
    { q: 'The resistance of a wire is directly proportional to its:', options: ['Area', 'Length', 'Temperature only', 'Current'], ans: 1 },
    { q: 'Kirchhoff\'s junction rule is based on conservation of:', options: ['Energy', 'Charge', 'Momentum', 'Mass'], ans: 1 },
    { q: 'In a Wheatstone bridge at balance:', options: ['Current is zero', 'Galvanometer shows zero', 'Voltage is maximum', 'Resistance is zero'], ans: 1 },
    { q: 'The internal resistance of an ideal battery is:', options: ['Infinite', 'Very high', 'Zero', '1 Ohm'], ans: 2 },
    { q: 'Drift velocity is proportional to:', options: ['Electric field', 'Resistance', 'Temperature', 'Cross section area'], ans: 0 }
  ]});

  // Class 12 Chemistry
  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Solutions', questions: [
    { q: 'Raoult\'s law is obeyed by:', options: ['Real solutions', 'Ideal solutions', 'All solutions', 'Colloidal solutions'], ans: 1 },
    { q: 'Molality is expressed as:', options: ['mol/L', 'mol/kg', 'g/L', 'g/mol'], ans: 1 },
    { q: 'The elevation in boiling point is a ___ property', options: ['Colligative', 'Additive', 'Constitutive', 'Extensive'], ans: 0 },
    { q: 'Osmotic pressure (π) = ?', options: ['nRT', 'CRT', 'PV', 'nR/T'], ans: 1 },
    { q: 'Henry\'s law relates to:', options: ['Solubility of gas in liquid', 'Boiling point', 'Freezing point', 'Vapour pressure'], ans: 0 }
  ]});
  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Electrochemistry', questions: [
    { q: 'In a galvanic cell, oxidation occurs at:', options: ['Cathode', 'Anode', 'Salt bridge', 'Electrolyte'], ans: 1 },
    { q: 'The Nernst equation relates EMF to:', options: ['Temperature only', 'Concentration of reactants and products', 'Pressure only', 'Volume'], ans: 1 },
    { q: 'The SI unit of molar conductivity is:', options: ['S m² mol⁻¹', 'S cm⁻¹', 'Ω m', 'S/m'], ans: 0 },
    { q: 'Rusting of iron is an example of:', options: ['Chemical corrosion', 'Electrochemical corrosion', 'Erosion', 'Physical change'], ans: 1 },
    { q: 'Faraday\'s first law relates mass deposited to:', options: ['Voltage', 'Resistance', 'Quantity of charge', 'Temperature'], ans: 2 }
  ]});

  // Class 12 Biology
  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Molecular Basis of Inheritance', questions: [
    { q: 'DNA replication is:', options: ['Conservative', 'Semi-conservative', 'Dispersive', 'Random'], ans: 1 },
    { q: 'The central dogma of molecular biology is:', options: ['DNA→RNA→Protein', 'RNA→DNA→Protein', 'Protein→RNA→DNA', 'DNA→Protein→RNA'], ans: 0 },
    { q: 'The genetic code is:', options: ['Doublet', 'Triplet', 'Quadruplet', 'Singlet'], ans: 1 },
    { q: 'The enzyme that synthesizes DNA from DNA template is:', options: ['RNA polymerase', 'DNA polymerase', 'Ligase', 'Helicase'], ans: 1 },
    { q: 'HGP stands for:', options: ['Human Gene Project', 'Human Genome Project', 'Human Genetic Program', 'Higher Genome Pattern'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Biotechnology: Principles and Processes', questions: [
    { q: 'The "molecular scissors" used in rDNA technology are:', options: ['Ligases', 'Restriction enzymes', 'Polymerases', 'Helicases'], ans: 1 },
    { q: 'PCR stands for:', options: ['Protein Chain Reaction', 'Polymerase Chain Reaction', 'Plasmid Copy Reaction', 'Primer Chain Recombination'], ans: 1 },
    { q: 'pBR322 is a:', options: ['Gene', 'Cloning vector', 'Host organism', 'Restriction enzyme'], ans: 1 },
    { q: 'Gel electrophoresis separates DNA fragments by:', options: ['Colour', 'Size', 'Shape', 'Charge only'], ans: 1 },
    { q: 'The bacterium commonly used in genetic engineering is:', options: ['Bacillus', 'E. coli', 'Streptococcus', 'Staphylococcus'], ans: 1 }
  ]});

  // Class 12 Math
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Relations and Functions', questions: [
    { q: 'A relation that is reflexive, symmetric, and transitive is:', options: ['Partial order', 'Equivalence relation', 'Function', 'Total order'], ans: 1 },
    { q: 'A function f: A→B is onto if:', options: ['f is one-one', 'Range of f = B', 'A = B', 'f is constant'], ans: 1 },
    { q: 'The number of equivalence relations on {1,2,3} is:', options: ['3', '5', '8', '15'], ans: 1 },
    { q: 'If f(x) = x² and g(x) = √x, then (gof)(4) = ?', options: ['2', '4', '16', '8'], ans: 1 },
    { q: 'An injective function is also called:', options: ['Onto', 'One-one', 'Bijective', 'Surjective'], ans: 1 }
  ]});
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Probability', questions: [
    { q: 'If P(A) = 0.4 and P(B) = 0.5 and A, B are independent, then P(A∩B) = ?', options: ['0.2', '0.9', '0.1', '0.45'], ans: 0 },
    { q: 'Bayes\' theorem is used when:', options: ['Events are impossible', 'Prior probabilities are known', 'All events are independent', 'Only one event exists'], ans: 1 },
    { q: 'For a binomial distribution, the mean is:', options: ['np', 'npq', '√npq', 'n/p'], ans: 0 },
    { q: 'P(A|B) = P(A∩B) / ?', options: ['P(A)', 'P(B)', 'P(A∪B)', '1'], ans: 1 },
    { q: 'If X follows B(n,p), the variance is:', options: ['np', 'npq', 'nq', 'p/n'], ans: 1 }
  ]});

  console.log('✅ All quiz data seeded!');

  // ═══════════════════════════════════════════════════════════
  // EXPANDED QUIZZES — Classes 1-5 (6-8 questions each)
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding EXPANDED quizzes for Classes 1–5...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Numbers from One to Nine', questions: [
    { q: 'How many fingers do you have on one hand?', options: ['3', '4', '5', '6'], ans: 2 },
    { q: 'Which number comes after 7?', options: ['6', '7', '8', '9'], ans: 2 },
    { q: 'Which is the smallest: 9, 3, 6, 1?', options: ['9', '3', '6', '1'], ans: 3 },
    { q: 'What number comes before 5?', options: ['3', '4', '6', '7'], ans: 1 },
    { q: 'Count the vowels in A, E, I, O, U. How many?', options: ['3', '4', '5', '6'], ans: 2 },
    { q: 'Which is the biggest number here?', options: ['2', '5', '9', '7'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Patterns', questions: [
    { q: 'What comes next: 2, 4, 6, __?', options: ['7', '8', '9', '10'], ans: 1 },
    { q: 'Complete: Red, Blue, Red, Blue, __?', options: ['Green', 'Red', 'Yellow', 'Blue'], ans: 1 },
    { q: 'What comes next: 🔵🔴🔵🔴__?', options: ['🔴', '🔵', '🟢', '🟡'], ans: 1 },
    { q: 'Complete: 1, 3, 5, __?', options: ['6', '7', '8', '9'], ans: 1 },
    { q: 'What shape comes next: ▲ ■ ▲ ■ __?', options: ['■', '▲', '●', '◆'], ans: 1 },
    { q: 'Find the pattern: 10, 20, 30, __?', options: ['35', '40', '45', '50'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Money', questions: [
    { q: 'How many paise make 1 rupee?', options: ['10', '50', '100', '1000'], ans: 2 },
    { q: 'You have a Rs 10 note. You buy a pencil for Rs 3. How much change?', options: ['Rs 5', 'Rs 6', 'Rs 7', 'Rs 8'], ans: 2 },
    { q: 'Which coin is worth the most?', options: ['Rs 1', 'Rs 2', 'Rs 5', 'Rs 10'], ans: 3 },
    { q: 'A toffee costs Rs 2. How much for 3 toffees?', options: ['Rs 4', 'Rs 5', 'Rs 6', 'Rs 8'], ans: 2 },
    { q: 'Rs 5 + Rs 5 = ?', options: ['Rs 5', 'Rs 10', 'Rs 15', 'Rs 25'], ans: 1 },
    { q: 'Which is more money?', options: ['3 coins of Rs 1', 'Rs 2 coin', 'Rs 5 note', '2 coins of Rs 2'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'English', chapterName: 'A Happy Child', questions: [
    { q: 'A "happy" child is a child who is ___', options: ['Sad', 'Angry', 'Joyful', 'Sleepy'], ans: 2 },
    { q: 'Which word rhymes with "play"?', options: ['Fly', 'Day', 'Toy', 'Run'], ans: 1 },
    { q: 'What do children love to do?', options: ['Work', 'Sleep all day', 'Play', 'Cook'], ans: 2 },
    { q: 'A poem has words that ___', options: ['Are always long', 'Rhyme', 'Are always short', 'Are numbers'], ans: 1 },
    { q: '"Sing" is an action word. True or false?', options: ['True', 'False', 'Sometimes', 'Never'], ans: 0 },
    { q: 'Which is a naming word (noun)?', options: ['Run', 'Beautiful', 'Cat', 'Quickly'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'My Body', questions: [
    { q: 'How many eyes do we have?', options: ['1', '2', '3', '4'], ans: 1 },
    { q: 'Which sense organ do we use to hear?', options: ['Eyes', 'Nose', 'Ears', 'Tongue'], ans: 2 },
    { q: 'We use our ___ to taste food', options: ['Nose', 'Eyes', 'Hands', 'Tongue'], ans: 3 },
    { q: 'How many legs does a human have?', options: ['2', '4', '6', '8'], ans: 0 },
    { q: 'Which body part helps us breathe?', options: ['Hands', 'Legs', 'Nose', 'Ears'], ans: 2 },
    { q: 'We should brush our ___ every day', options: ['Hair only', 'Teeth', 'Clothes', 'Shoes'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Animals Around Us', questions: [
    { q: 'Which animal gives us milk?', options: ['Dog', 'Cat', 'Cow', 'Parrot'], ans: 2 },
    { q: 'A dog is a ___ animal', options: ['Wild', 'Domestic', 'Sea', 'Flying'], ans: 1 },
    { q: 'Which animal lives in water?', options: ['Elephant', 'Lion', 'Fish', 'Horse'], ans: 2 },
    { q: 'A lion is a ___ animal', options: ['Pet', 'Domestic', 'Farm', 'Wild'], ans: 3 },
    { q: 'Which animal can fly?', options: ['Cow', 'Fish', 'Bird', 'Snake'], ans: 2 },
    { q: 'Baby of a cat is called a ___', options: ['Puppy', 'Kitten', 'Calf', 'Cub'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Food We Eat', questions: [
    { q: 'Which is a healthy food?', options: ['Chips', 'Chocolate', 'Fruit', 'Candy'], ans: 2 },
    { q: 'We get milk from ___', options: ['Plants', 'Cows', 'Rocks', 'Water'], ans: 1 },
    { q: 'Rice is which type of food?', options: ['Fruit', 'Vegetable', 'Grain', 'Dairy'], ans: 2 },
    { q: 'Which meal do we eat in the morning?', options: ['Lunch', 'Dinner', 'Snack', 'Breakfast'], ans: 3 },
    { q: 'Vegetables help us stay ___', options: ['Sick', 'Healthy', 'Sleepy', 'Angry'], ans: 1 },
    { q: 'Which drink is best for health?', options: ['Cola', 'Coffee', 'Water', 'Soda'], ans: 2 }
  ]});

  // Class 2
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Counting in Groups', questions: [
    { q: 'Count by 2s: 2, 4, 6, __?', options: ['7', '8', '9', '10'], ans: 1 },
    { q: 'Count by 5s: 5, 10, 15, __?', options: ['16', '18', '20', '25'], ans: 2 },
    { q: 'Count by 10s: 10, 20, 30, __?', options: ['35', '40', '45', '50'], ans: 1 },
    { q: 'If you have 3 groups of 4, how many total?', options: ['7', '10', '12', '16'], ans: 2 },
    { q: 'How many pairs can you make from 8 socks?', options: ['2', '3', '4', '5'], ans: 2 },
    { q: 'Skip count by 2: How many steps from 0 to 10?', options: ['3', '4', '5', '10'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Add Our Points', questions: [
    { q: '25 + 13 = ?', options: ['35', '37', '38', '39'], ans: 2 },
    { q: '46 + 32 = ?', options: ['68', '76', '78', '82'], ans: 2 },
    { q: '18 + 27 = ?', options: ['35', '45', '55', '43'], ans: 1 },
    { q: '34 + 16 = ?', options: ['40', '44', '50', '54'], ans: 2 },
    { q: '55 + 25 = ?', options: ['70', '75', '80', '85'], ans: 2 },
    { q: 'What is 29 + 11?', options: ['38', '39', '40', '41'], ans: 2 }
  ]});

  // Class 3
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Fun with Numbers', questions: [
    { q: 'Which is the biggest: 456, 645, 564, 465?', options: ['456', '645', '564', '465'], ans: 1 },
    { q: 'Write 347 in expanded form:', options: ['3+4+7', '300+40+7', '30+40+7', '3+40+700'], ans: 1 },
    { q: 'What comes after 999?', options: ['9910', '1000', '9100', '990'], ans: 1 },
    { q: 'Arrange in ascending: 231, 132, 321, 213', options: ['132, 213, 231, 321', '321, 231, 213, 132', '132, 231, 213, 321', '213, 132, 231, 321'], ans: 0 },
    { q: 'The place value of 5 in 752 is:', options: ['5', '50', '500', '5000'], ans: 1 },
    { q: 'Round 67 to the nearest ten:', options: ['60', '65', '70', '100'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Can We Share?', questions: [
    { q: 'Share 12 sweets equally among 3 children. Each gets:', options: ['3', '4', '5', '6'], ans: 1 },
    { q: '20 ÷ 4 = ?', options: ['4', '5', '6', '8'], ans: 1 },
    { q: '15 ÷ 3 = ?', options: ['3', '4', '5', '6'], ans: 2 },
    { q: 'If 8 mangoes are shared between 2, each gets:', options: ['2', '3', '4', '6'], ans: 2 },
    { q: '18 ÷ 6 = ?', options: ['2', '3', '4', '6'], ans: 1 },
    { q: 'Division is the opposite of ___', options: ['Addition', 'Subtraction', 'Multiplication', 'Counting'], ans: 2 }
  ]});

  // Class 4
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Halves and Quarters', questions: [
    { q: 'Half of 20 is:', options: ['5', '10', '15', '20'], ans: 1 },
    { q: 'One quarter of 24 is:', options: ['4', '6', '8', '12'], ans: 1 },
    { q: 'Which is greater: 1/2 or 1/4?', options: ['1/2', '1/4', 'Both equal', 'Cannot tell'], ans: 0 },
    { q: '3/4 of 8 is:', options: ['2', '4', '6', '8'], ans: 2 },
    { q: 'How many quarters make a whole?', options: ['2', '3', '4', '5'], ans: 2 },
    { q: 'Half of a half is:', options: ['1/2', '1/3', '1/4', '1/8'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Fields and Fences', questions: [
    { q: 'Perimeter of a square with side 5 cm is:', options: ['10 cm', '15 cm', '20 cm', '25 cm'], ans: 2 },
    { q: 'Perimeter of a rectangle 6 cm × 4 cm is:', options: ['10 cm', '14 cm', '20 cm', '24 cm'], ans: 2 },
    { q: 'A fence goes around the ___ of a field', options: ['Inside', 'Middle', 'Boundary', 'Centre'], ans: 2 },
    { q: 'If a triangle has sides 3, 4, and 5 cm, its perimeter is:', options: ['7 cm', '9 cm', '12 cm', '15 cm'], ans: 2 },
    { q: 'Perimeter means the total ___ around a shape', options: ['Area', 'Distance', 'Weight', 'Height'], ans: 1 },
    { q: 'A square garden has side 10 m. How much fencing is needed?', options: ['20 m', '30 m', '40 m', '100 m'], ans: 2 }
  ]});

  // Class 5
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'The Fish Tale', questions: [
    { q: 'In the Indian system, 10 thousand = ?', options: ['1 lakh', '10 lakh', '10 thousand', '1 crore'], ans: 2 },
    { q: 'The largest 5-digit number is:', options: ['99000', '99999', '90999', '99990'], ans: 1 },
    { q: 'The place value of 6 in 46,302 is:', options: ['6', '60', '600', '6000'], ans: 3 },
    { q: '1 lakh = ___ thousands', options: ['10', '100', '1000', '10000'], ans: 1 },
    { q: 'Which is larger: 45,678 or 45,876?', options: ['45,678', '45,876', 'Both equal', 'Cannot tell'], ans: 1 },
    { q: 'The successor of 99,999 is:', options: ['99,998', '100,000', '99,000', '1,00,001'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Does It Look the Same?', questions: [
    { q: 'How many lines of symmetry does a circle have?', options: ['0', '1', '4', 'Infinite'], ans: 3 },
    { q: 'A square has ___ lines of symmetry', options: ['1', '2', '4', '8'], ans: 2 },
    { q: 'The letter "A" has ___ line(s) of symmetry', options: ['0', '1', '2', '3'], ans: 1 },
    { q: 'A rectangle has ___ lines of symmetry', options: ['1', '2', '3', '4'], ans: 1 },
    { q: 'Which letter has NO line of symmetry?', options: ['A', 'M', 'F', 'O'], ans: 2 },
    { q: 'A mirror image is also called a ___', options: ['Rotation', 'Reflection', 'Translation', 'Scaling'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Be My Multiple, I\'ll Be Your Factor', questions: [
    { q: 'Which is a factor of 12?', options: ['5', '7', '4', '8'], ans: 2 },
    { q: 'The first 3 multiples of 5 are:', options: ['5, 10, 15', '5, 10, 20', '1, 5, 10', '5, 15, 25'], ans: 0 },
    { q: 'Is 7 a prime or composite number?', options: ['Prime', 'Composite', 'Neither', 'Both'], ans: 0 },
    { q: 'How many factors does 1 have?', options: ['0', '1', '2', '3'], ans: 1 },
    { q: 'The LCM of 4 and 6 is:', options: ['2', '4', '12', '24'], ans: 2 },
    { q: 'All even numbers have ___ as a factor', options: ['1', '2', '3', '5'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Tenths and Hundredths', questions: [
    { q: '0.5 is the same as:', options: ['1/2', '1/5', '5/100', '1/50'], ans: 0 },
    { q: 'Rs 3.50 means:', options: ['3 rupees 5 paise', '3 rupees 50 paise', '35 rupees', '350 paise'], ans: 1 },
    { q: 'Which is greater: 0.7 or 0.65?', options: ['0.7', '0.65', 'Both equal', 'Cannot compare'], ans: 0 },
    { q: '0.25 = ___ / 100', options: ['2.5', '25', '250', '0.25'], ans: 1 },
    { q: '1 tenth = ___', options: ['0.01', '0.1', '1.0', '10'], ans: 1 },
    { q: '3.2 + 1.5 = ?', options: ['4.5', '4.7', '5.2', '5.7'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'From Tasting to Digesting', questions: [
    { q: 'Digestion begins in the ___', options: ['Stomach', 'Mouth', 'Intestine', 'Liver'], ans: 1 },
    { q: 'Which helps us taste food?', options: ['Teeth', 'Tongue', 'Lips', 'Throat'], ans: 1 },
    { q: 'How many types of teeth do we have?', options: ['1', '2', '3', '4'], ans: 2 },
    { q: 'Saliva helps in ___', options: ['Breathing', 'Digesting food', 'Seeing', 'Hearing'], ans: 1 },
    { q: 'The stomach churns food with ___', options: ['Water', 'Digestive juices', 'Blood', 'Air'], ans: 1 },
    { q: 'Spicy food makes our ___ feel hot', options: ['Eyes', 'Ears', 'Tongue', 'Nose'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Seeds and Seeds', questions: [
    { q: 'Seeds need ___ to grow', options: ['Darkness and cold', 'Water, air and warmth', 'Only sunlight', 'Only soil'], ans: 1 },
    { q: 'The process of a seed growing into a plant is called ___', options: ['Pollination', 'Germination', 'Fertilization', 'Photosynthesis'], ans: 1 },
    { q: 'Coconut seeds are dispersed by ___', options: ['Wind', 'Water', 'Animals', 'Explosion'], ans: 1 },
    { q: 'Dandelion seeds are dispersed by ___', options: ['Water', 'Animals', 'Wind', 'Gravity'], ans: 2 },
    { q: 'Which part of the seed grows into roots?', options: ['Plumule', 'Radicle', 'Cotyledon', 'Seed coat'], ans: 1 },
    { q: 'Seeds that stick to animal fur are dispersed by ___', options: ['Wind', 'Water', 'Animals', 'Explosion'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Sunita in Space', questions: [
    { q: 'Sunita Williams went to ___', options: ['Moon', 'Mars', 'International Space Station', 'Jupiter'], ans: 2 },
    { q: 'In space, objects float because of ___', options: ['Wind', 'Microgravity', 'Air pressure', 'Magnetism'], ans: 1 },
    { q: 'Astronauts wear ___ in space', options: ['Regular clothes', 'Space suits', 'Raincoats', 'Uniforms'], ans: 1 },
    { q: 'The Earth looks ___ from space', options: ['Flat', 'Square', 'Round and blue', 'Triangular'], ans: 2 },
    { q: 'Sunita Williams was born in ___', options: ['India', 'USA', 'England', 'Russia'], ans: 1 },
    { q: 'A space shuttle is used to ___', options: ['Travel on roads', 'Travel underwater', 'Travel to space', 'Travel on rails'], ans: 2 }
  ]});

  // ═══════════════════════════════════════════════════════════
  // EXPANDED QUIZZES — Classes 6-8 (6-8 questions each)
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding EXPANDED quizzes for Classes 6–8...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Integers', questions: [
    { q: '(-7) + 3 = ?', options: ['-10', '-4', '4', '10'], ans: 1 },
    { q: 'The absolute value of -15 is:', options: ['-15', '0', '15', '30'], ans: 2 },
    { q: 'Which is greater: -3 or -7?', options: ['-3', '-7', 'Both equal', 'Cannot compare'], ans: 0 },
    { q: '(-4) × (-5) = ?', options: ['-20', '-9', '9', '20'], ans: 3 },
    { q: '(-12) ÷ 4 = ?', options: ['-8', '-3', '3', '8'], ans: 1 },
    { q: 'On a number line, -3 is to the ___ of 0', options: ['Right', 'Left', 'Above', 'Below'], ans: 1 },
    { q: 'The sum of an integer and its additive inverse is:', options: ['-1', '0', '1', '2'], ans: 1 },
    { q: '(-6) - (-4) = ?', options: ['-10', '-2', '2', '10'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Fractions and Decimals', questions: [
    { q: '3/4 × 2/5 = ?', options: ['5/9', '6/20', '3/10', '6/9'], ans: 2 },
    { q: '1/2 ÷ 1/4 = ?', options: ['1/8', '1/4', '2', '4'], ans: 2 },
    { q: '0.3 × 0.2 = ?', options: ['0.06', '0.6', '6', '0.006'], ans: 0 },
    { q: '2.5 ÷ 0.5 = ?', options: ['1.25', '2', '5', '12.5'], ans: 2 },
    { q: 'Convert 3/8 to decimal:', options: ['0.25', '0.375', '0.38', '0.3'], ans: 1 },
    { q: '7/10 + 3/10 = ?', options: ['10/20', '1', '10/10', 'Both B and C'], ans: 3 },
    { q: 'Which is greater: 2/3 or 3/5?', options: ['2/3', '3/5', 'Both equal', 'Cannot tell'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Simple Equations', questions: [
    { q: 'Solve: x + 5 = 12', options: ['5', '7', '12', '17'], ans: 1 },
    { q: 'Solve: 3x = 18', options: ['3', '6', '9', '15'], ans: 1 },
    { q: 'Solve: x - 4 = 9', options: ['5', '9', '13', '36'], ans: 2 },
    { q: 'If 2x + 3 = 11, then x = ?', options: ['3', '4', '5', '7'], ans: 1 },
    { q: 'Solve: x/4 = 5', options: ['1.25', '9', '20', '25'], ans: 2 },
    { q: 'If 5x - 10 = 15, then x = ?', options: ['1', '3', '5', '25'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Congruence of Triangles', questions: [
    { q: 'Two triangles are congruent if they have the same:', options: ['Colour', 'Shape only', 'Shape and size', 'Size only'], ans: 2 },
    { q: 'SSS stands for:', options: ['Side-Side-Straight', 'Side-Side-Side', 'Sum-Side-Sum', 'Same-Same-Same'], ans: 1 },
    { q: 'In SAS congruence, the angle must be:', options: ['Any angle', 'Included angle between the two sides', 'Largest angle', 'Right angle'], ans: 1 },
    { q: 'ASA congruence requires:', options: ['Two angles and included side', 'Two angles and any side', 'All angles', 'All sides'], ans: 0 },
    { q: 'RHS congruence applies to ___ triangles only', options: ['Equilateral', 'Isosceles', 'Right-angled', 'All'], ans: 2 },
    { q: 'If ΔABC ≅ ΔDEF, then AB = ?', options: ['DF', 'DE', 'EF', 'Cannot tell'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Perimeter and Area', questions: [
    { q: 'Area of a rectangle with length 8 cm and width 5 cm is:', options: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'], ans: 2 },
    { q: 'Area of a triangle = ?', options: ['base × height', '½ × base × height', '2 × base × height', 'base + height'], ans: 1 },
    { q: 'The area of a parallelogram with base 10 cm and height 6 cm is:', options: ['16 cm²', '32 cm²', '60 cm²', '120 cm²'], ans: 2 },
    { q: 'Area of a circle = ?', options: ['πr', '2πr', 'πr²', 'πd'], ans: 2 },
    { q: 'Circumference of a circle = ?', options: ['πr²', '2πr', 'πr', 'πd²'], ans: 1 },
    { q: 'If the radius of a circle is 7 cm, its area is approximately:', options: ['22 cm²', '44 cm²', '154 cm²', '308 cm²'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Nutrition in Animals', questions: [
    { q: 'The process of taking food into the body is called:', options: ['Digestion', 'Ingestion', 'Absorption', 'Egestion'], ans: 1 },
    { q: 'Saliva contains an enzyme called:', options: ['Pepsin', 'Trypsin', 'Salivary amylase', 'Lipase'], ans: 2 },
    { q: 'The inner lining of the stomach secretes:', options: ['Bile', 'Hydrochloric acid', 'Insulin', 'Saliva'], ans: 1 },
    { q: 'The longest part of the alimentary canal is:', options: ['Stomach', 'Large intestine', 'Small intestine', 'Oesophagus'], ans: 2 },
    { q: 'Amoeba captures food using:', options: ['Mouth', 'Tentacles', 'Pseudopodia', 'Cilia'], ans: 2 },
    { q: 'Bile juice is stored in the:', options: ['Liver', 'Pancreas', 'Gall bladder', 'Stomach'], ans: 2 },
    { q: 'Cud-chewing animals are called:', options: ['Herbivores', 'Ruminants', 'Omnivores', 'Carnivores'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Heat', questions: [
    { q: 'Heat flows from a ___ body to a ___ body', options: ['Cold to hot', 'Hot to cold', 'Big to small', 'Small to big'], ans: 1 },
    { q: 'A clinical thermometer reads temperatures from:', options: ['0°C to 100°C', '35°C to 42°C', '-10°C to 110°C', '30°C to 50°C'], ans: 1 },
    { q: 'Transfer of heat without any medium is called:', options: ['Conduction', 'Convection', 'Radiation', 'Absorption'], ans: 2 },
    { q: 'Metals are good ___ of heat', options: ['Insulators', 'Conductors', 'Radiators', 'Absorbers'], ans: 1 },
    { q: 'Woollen clothes keep us warm because wool is a:', options: ['Conductor', 'Radiator', 'Good insulator', 'Metal'], ans: 2 },
    { q: 'Land heats up ___ than water', options: ['Slower', 'Faster', 'At the same rate', 'Never'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Acids, Bases and Salts', questions: [
    { q: 'Lemon juice is:', options: ['Acidic', 'Basic', 'Neutral', 'Salty'], ans: 0 },
    { q: 'Soap solution is:', options: ['Acidic', 'Basic', 'Neutral', 'Salty'], ans: 1 },
    { q: 'Litmus paper is obtained from:', options: ['A plant', 'A mineral', 'Lichens', 'Bacteria'], ans: 2 },
    { q: 'Acid + Base → Salt + ___', options: ['Acid', 'Base', 'Water', 'Gas'], ans: 2 },
    { q: 'Turmeric is a ___ indicator', options: ['Synthetic', 'Natural', 'Chemical', 'Artificial'], ans: 1 },
    { q: 'A neutral solution has pH:', options: ['0', '3', '7', '14'], ans: 2 },
    { q: 'Ant bite causes pain because ants inject:', options: ['Acetic acid', 'Formic acid', 'Citric acid', 'Hydrochloric acid'], ans: 1 }
  ]});

  // Class 8 expanded
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Linear Equations in One Variable', questions: [
    { q: 'Solve: 2x - 5 = 3x + 1', options: ['-6', '-4', '4', '6'], ans: 0 },
    { q: 'Solve: 5(x - 2) = 3x + 6', options: ['4', '6', '8', '10'], ans: 2 },
    { q: 'If 3x + 7 = 22, then x = ?', options: ['3', '5', '7', '15'], ans: 1 },
    { q: 'Solve: (x + 3)/4 = 5', options: ['13', '17', '20', '23'], ans: 1 },
    { q: 'Solve: 7x - 3 = 4x + 9', options: ['2', '3', '4', '6'], ans: 2 },
    { q: 'A linear equation has the highest power of the variable as:', options: ['0', '1', '2', '3'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Algebraic Expressions and Identities', questions: [
    { q: '(a + b)² = ?', options: ['a² + b²', 'a² + 2ab + b²', 'a² - 2ab + b²', '2a² + 2b²'], ans: 1 },
    { q: '(a - b)² = ?', options: ['a² + b²', 'a² + 2ab + b²', 'a² - 2ab + b²', 'a² - b²'], ans: 2 },
    { q: '(a + b)(a - b) = ?', options: ['a² + b²', 'a² - b²', '2ab', 'a² + 2ab + b²'], ans: 1 },
    { q: 'Expand: (x + 3)²', options: ['x² + 6', 'x² + 9', 'x² + 3x + 9', 'x² + 6x + 9'], ans: 3 },
    { q: '(2x + 5)(2x - 5) = ?', options: ['4x² - 25', '4x² + 25', '4x² - 10x + 25', '2x² - 25'], ans: 0 },
    { q: 'How many terms in 3x²y + 5xy² - 7?', options: ['1', '2', '3', '4'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Mensuration', questions: [
    { q: 'Volume of a cuboid = ?', options: ['l + b + h', 'l × b × h', '2(lb + bh + lh)', 'l × b'], ans: 1 },
    { q: 'Surface area of a cube with side 3 cm is:', options: ['9 cm²', '18 cm²', '27 cm²', '54 cm²'], ans: 3 },
    { q: 'Area of a trapezium = ?', options: ['½(a+b)×h', 'a×b×h', '(a+b)×h', '½×a×b'], ans: 0 },
    { q: 'Volume of a cylinder = ?', options: ['2πrh', 'πr²h', 'πr²', '2πr²h'], ans: 1 },
    { q: 'Total surface area of a cylinder = ?', options: ['2πrh', 'πr²h', '2πr(r+h)', '2πr²'], ans: 2 },
    { q: 'Volume of a cube with side 4 cm is:', options: ['16 cm³', '48 cm³', '64 cm³', '96 cm³'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Microorganisms: Friend and Foe', questions: [
    { q: 'Which of these is a microorganism?', options: ['Ant', 'Bacteria', 'Spider', 'Frog'], ans: 1 },
    { q: 'Yeast is used to make:', options: ['Salt', 'Bread', 'Spices', 'Oil'], ans: 1 },
    { q: 'Antibiotics were discovered by:', options: ['Louis Pasteur', 'Alexander Fleming', 'Edward Jenner', 'Robert Koch'], ans: 1 },
    { q: 'Pasteurization is a process to preserve:', options: ['Bread', 'Milk', 'Meat', 'Vegetables'], ans: 1 },
    { q: 'Virus can reproduce only inside:', options: ['Water', 'Soil', 'A living cell', 'Air'], ans: 2 },
    { q: 'The first vaccine was developed for:', options: ['Cholera', 'Smallpox', 'Typhoid', 'Malaria'], ans: 1 },
    { q: 'Nitrogen-fixing bacteria are found in roots of:', options: ['Rose', 'Mango', 'Leguminous plants', 'Grass'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Force and Pressure', questions: [
    { q: 'A push or pull on an object is called:', options: ['Energy', 'Force', 'Pressure', 'Work'], ans: 1 },
    { q: 'Gravity is a ___ force', options: ['Contact', 'Non-contact', 'Muscular', 'Frictional'], ans: 1 },
    { q: 'Pressure = ?', options: ['Force × Area', 'Force / Area', 'Force + Area', 'Force - Area'], ans: 1 },
    { q: 'Atmospheric pressure is caused by:', options: ['Gravity', 'Weight of air', 'Wind', 'Rain'], ans: 1 },
    { q: 'A sharp knife cuts better because it has:', options: ['More area', 'Less area', 'More weight', 'More handle'], ans: 1 },
    { q: 'Magnetic force is a ___ force', options: ['Contact', 'Non-contact', 'Muscular', 'Frictional'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Sound', questions: [
    { q: 'Sound is produced by:', options: ['Light', 'Vibration', 'Heat', 'Colour'], ans: 1 },
    { q: 'Sound cannot travel through:', options: ['Air', 'Water', 'Vacuum', 'Steel'], ans: 2 },
    { q: 'The unit of frequency is:', options: ['Metre', 'Second', 'Hertz', 'Decibel'], ans: 2 },
    { q: 'Humans can hear sounds of frequency:', options: ['Below 20 Hz', '20 Hz to 20,000 Hz', 'Above 20,000 Hz', 'All frequencies'], ans: 1 },
    { q: 'Sounds above 20,000 Hz are called:', options: ['Infrasonic', 'Ultrasonic', 'Audible', 'Musical'], ans: 1 },
    { q: 'Noise pollution can cause:', options: ['Better hearing', 'Hearing loss', 'Improved sleep', 'Better focus'], ans: 1 },
    { q: 'The loudness of sound is measured in:', options: ['Hertz', 'Metres', 'Decibels', 'Joules'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Light', questions: [
    { q: 'The angle of incidence equals the angle of ___', options: ['Refraction', 'Reflection', 'Diffraction', 'Dispersion'], ans: 1 },
    { q: 'A kaleidoscope uses:', options: ['Lenses', 'Prisms', 'Mirrors', 'Magnets'], ans: 2 },
    { q: 'Braille system is used by:', options: ['Deaf people', 'Visually impaired people', 'Mute people', 'Everyone'], ans: 1 },
    { q: 'White light is made up of ___ colours', options: ['3', '5', '7', '12'], ans: 2 },
    { q: 'Regular reflection happens on ___ surfaces', options: ['Rough', 'Smooth', 'Curved', 'Broken'], ans: 1 },
    { q: 'The image formed by a plane mirror is:', options: ['Inverted', 'Magnified', 'Laterally inverted', 'Diminished'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'The Indian Constitution', questions: [
    { q: 'The Indian Constitution came into effect on:', options: ['15 Aug 1947', '26 Jan 1950', '26 Nov 1949', '2 Oct 1950'], ans: 1 },
    { q: 'The Preamble starts with:', options: ['We, the citizens', 'We, the people', 'We, the government', 'We, the nation'], ans: 1 },
    { q: 'How many Fundamental Rights are there?', options: ['4', '5', '6', '7'], ans: 2 },
    { q: 'Right to Education is a:', options: ['Fundamental Right', 'Directive Principle', 'Fundamental Duty', 'Statutory Right'], ans: 0 },
    { q: 'Who is known as the Father of the Indian Constitution?', options: ['Gandhi', 'Nehru', 'Ambedkar', 'Patel'], ans: 2 },
    { q: 'The Constitution guarantees equality before ___', options: ['God', 'Society', 'Law', 'Parliament'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'When People Rebel — 1857 and After', questions: [
    { q: 'The Revolt of 1857 started from:', options: ['Delhi', 'Meerut', 'Lucknow', 'Kanpur'], ans: 1 },
    { q: 'The immediate cause of the 1857 revolt was:', options: ['Heavy taxes', 'Greased cartridges', 'Land grabbing', 'Religious conversion'], ans: 1 },
    { q: 'Who led the revolt in Jhansi?', options: ['Nana Saheb', 'Rani Laxmibai', 'Bahadur Shah', 'Tantia Tope'], ans: 1 },
    { q: 'Bahadur Shah Zafar was the last ___ emperor', options: ['British', 'Maratha', 'Mughal', 'Sikh'], ans: 2 },
    { q: 'After 1857, India was governed directly by the:', options: ['East India Company', 'British Crown', 'Indian leaders', 'French'], ans: 1 },
    { q: 'The revolt of 1857 is also called:', options: ['French Revolution', 'Sepoy Mutiny', 'Quit India', 'Civil War'], ans: 1 }
  ]});

  // ═══════════════════════════════════════════════════════════
  // EXPANDED QUIZZES — Classes 9-10 (6-8 questions each)
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding EXPANDED quizzes for Classes 9–10...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Coordinate Geometry', questions: [
    { q: 'The point (0, 0) is called the:', options: ['Vertex', 'Origin', 'Centre', 'Mid-point'], ans: 1 },
    { q: 'The point (3, -2) lies in quadrant:', options: ['I', 'II', 'III', 'IV'], ans: 3 },
    { q: 'The x-coordinate of a point on the y-axis is:', options: ['1', '-1', '0', 'Undefined'], ans: 2 },
    { q: 'The abscissa of point (5, 7) is:', options: ['5', '7', '12', '35'], ans: 0 },
    { q: 'Point (-4, -3) lies in which quadrant?', options: ['I', 'II', 'III', 'IV'], ans: 2 },
    { q: 'The ordinate of point (2, 9) is:', options: ['2', '9', '11', '18'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Linear Equations in Two Variables', questions: [
    { q: 'The equation y = 2x + 3 passes through:', options: ['(0, 3)', '(3, 0)', '(1, 1)', '(0, 0)'], ans: 0 },
    { q: 'A linear equation in two variables has ___ solutions', options: ['One', 'Two', 'No', 'Infinitely many'], ans: 3 },
    { q: 'The graph of x = 5 is a line parallel to:', options: ['x-axis', 'y-axis', 'Both axes', 'Neither axis'], ans: 1 },
    { q: 'The graph of y = 0 represents the:', options: ['y-axis', 'x-axis', 'Origin', 'A point'], ans: 1 },
    { q: 'If 2x + 3y = 12, when x = 0, y = ?', options: ['2', '3', '4', '6'], ans: 2 },
    { q: 'The standard form of a linear equation is:', options: ['y = mx + c', 'ax + by + c = 0', 'x + y = 0', 'ax² + bx + c = 0'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Heron\'s Formula', questions: [
    { q: 'Heron\'s formula gives the area of a:', options: ['Circle', 'Rectangle', 'Triangle', 'Square'], ans: 2 },
    { q: 'In Heron\'s formula, s stands for:', options: ['Side', 'Sum', 'Semi-perimeter', 'Square'], ans: 2 },
    { q: 'If sides of a triangle are 3, 4, 5, then s = ?', options: ['4', '5', '6', '12'], ans: 2 },
    { q: 'For a triangle with sides 3, 4, 5, area = ?', options: ['6', '10', '12', '20'], ans: 0 },
    { q: 'Heron\'s formula is: Area = √(s(s-a)(s-b)(s-c)). What is s?', options: ['a+b+c', '(a+b+c)/2', '(a+b+c)/3', 'a×b×c'], ans: 1 },
    { q: 'An equilateral triangle with side 6 cm has s = ?', options: ['6', '9', '12', '18'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Structure of the Atom', questions: [
    { q: 'Who discovered the electron?', options: ['Rutherford', 'J.J. Thomson', 'Bohr', 'Chadwick'], ans: 1 },
    { q: 'Neutrons were discovered by:', options: ['Thomson', 'Rutherford', 'Chadwick', 'Bohr'], ans: 2 },
    { q: 'In Rutherford\'s gold foil experiment, most alpha particles:', options: ['Were deflected', 'Were absorbed', 'Passed through', 'Bounced back'], ans: 2 },
    { q: 'The atomic number = number of:', options: ['Neutrons', 'Protons', 'Electrons + Neutrons', 'Protons + Neutrons'], ans: 1 },
    { q: 'Mass number = protons + ___', options: ['Electrons', 'Neutrons', 'Photons', 'Positrons'], ans: 1 },
    { q: 'Isotopes have same ___ but different ___', options: ['Mass number, atomic number', 'Atomic number, mass number', 'Electrons, protons', 'Protons, electrons'], ans: 1 },
    { q: 'Maximum electrons in the 2nd shell:', options: ['2', '8', '18', '32'], ans: 1 },
    { q: 'The valency of sodium (Na, Z=11) is:', options: ['1', '2', '3', '8'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'The Fundamental Unit of Life', questions: [
    { q: 'Who discovered cells?', options: ['Leeuwenhoek', 'Robert Hooke', 'Schleiden', 'Schwann'], ans: 1 },
    { q: 'The cell membrane is:', options: ['Fully permeable', 'Selectively permeable', 'Impermeable', 'Only found in plants'], ans: 1 },
    { q: 'The jelly-like substance inside the cell is:', options: ['Nucleus', 'Cytoplasm', 'Vacuole', 'Chloroplast'], ans: 1 },
    { q: 'Which organelle is called the "suicide bag"?', options: ['Mitochondria', 'Lysosome', 'Ribosome', 'Golgi body'], ans: 1 },
    { q: 'Chromosomes are found in the:', options: ['Cell wall', 'Cytoplasm', 'Nucleus', 'Vacuole'], ans: 2 },
    { q: 'Prokaryotic cells lack a:', options: ['Cell membrane', 'Ribosome', 'Well-defined nucleus', 'DNA'], ans: 2 },
    { q: 'Osmosis is the movement of ___ through a semi-permeable membrane', options: ['Solute', 'Air', 'Water', 'Food'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Gravitation', questions: [
    { q: 'The value of g on Earth is approximately:', options: ['6.67 m/s²', '9.8 m/s²', '10.8 m/s²', '3.14 m/s²'], ans: 1 },
    { q: 'Weight = mass × ___', options: ['Velocity', 'Acceleration due to gravity', 'Height', 'Speed'], ans: 1 },
    { q: 'The SI unit of weight is:', options: ['kg', 'Newton', 'Joule', 'Watt'], ans: 1 },
    { q: 'Mass of an object on Moon is ___ its mass on Earth', options: ['Less than', 'More than', 'Same as', '1/6 of'], ans: 2 },
    { q: 'Weight on Moon is ___ of weight on Earth', options: ['1/2', '1/4', '1/6', '1/10'], ans: 2 },
    { q: 'Gravitational force is ___ proportional to distance²', options: ['Directly', 'Inversely', 'Not', 'Exponentially'], ans: 1 },
    { q: 'In free fall, all objects have ___ acceleration', options: ['Zero', 'Different', 'Same', 'Increasing'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Work and Energy', questions: [
    { q: 'Work = Force × ___', options: ['Time', 'Mass', 'Displacement', 'Velocity'], ans: 2 },
    { q: 'The SI unit of work is:', options: ['Newton', 'Watt', 'Joule', 'Pascal'], ans: 2 },
    { q: 'Kinetic energy = ?', options: ['½mv', '½mv²', 'mgh', 'Fd'], ans: 1 },
    { q: 'Potential energy = ?', options: ['½mv²', 'mgh', 'Fd', 'mv'], ans: 1 },
    { q: 'Power = Work / ___', options: ['Force', 'Distance', 'Time', 'Mass'], ans: 2 },
    { q: 'The SI unit of power is:', options: ['Joule', 'Newton', 'Watt', 'Pascal'], ans: 2 },
    { q: '1 kWh = ___ Joules', options: ['1000', '3600', '3.6 × 10⁶', '36 × 10⁶'], ans: 2 }
  ]});

  // Class 10 expanded
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Pair of Linear Equations in Two Variables', questions: [
    { q: 'A pair of linear equations is consistent if it has:', options: ['No solution', 'At least one solution', 'Exactly two solutions', 'Infinite solutions only'], ans: 1 },
    { q: 'Parallel lines have ___ solution(s)', options: ['One', 'No', 'Infinite', 'Two'], ans: 1 },
    { q: 'Coincident lines have ___ solution(s)', options: ['One', 'No', 'Infinite', 'Two'], ans: 2 },
    { q: 'Intersecting lines have ___ solution(s)', options: ['One unique', 'No', 'Infinite', 'Two'], ans: 0 },
    { q: 'For the system a₁x + b₁y = c₁ and a₂x + b₂y = c₂, if a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the lines are:', options: ['Intersecting', 'Parallel', 'Coincident', 'Perpendicular'], ans: 1 },
    { q: 'Solve by elimination: x + y = 5 and x - y = 1. x = ?', options: ['2', '3', '4', '5'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Arithmetic Progressions', questions: [
    { q: 'In the AP 2, 5, 8, 11..., the common difference is:', options: ['2', '3', '5', '8'], ans: 1 },
    { q: 'The 10th term of the AP 3, 7, 11, 15... is:', options: ['35', '39', '43', '47'], ans: 1 },
    { q: 'The formula for nth term is:', options: ['a + nd', 'a + (n-1)d', 'a × n × d', 'a × (n-1)d'], ans: 1 },
    { q: 'Sum of first n terms: Sₙ = ?', options: ['n/2 × (a + l)', 'n × (a + l)', 'n/2 × d', 'n × a × d'], ans: 0 },
    { q: 'Is 101 a term in the AP 1, 4, 7, 10...?', options: ['Yes, it\'s the 34th term', 'No', 'Yes, it\'s the 33rd term', 'Yes, it\'s the 35th term'], ans: 0 },
    { q: 'Sum of first 10 natural numbers:', options: ['45', '50', '55', '100'], ans: 2 },
    { q: 'If a = 5, d = 3, n = 20, then the 20th term is:', options: ['57', '60', '62', '65'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Triangles', questions: [
    { q: 'If two triangles are similar, their corresponding angles are:', options: ['Different', 'Equal', 'Supplementary', 'Complementary'], ans: 1 },
    { q: 'BPT stands for:', options: ['Basic Proportionality Theorem', 'Base Point Theorem', 'Bisector Property Theorem', 'Basic Parallel Theorem'], ans: 0 },
    { q: 'In ΔABC, if DE ∥ BC and AD/DB = 2/3, then AE/EC = ?', options: ['3/2', '2/3', '2/5', '3/5'], ans: 1 },
    { q: 'Pythagorean theorem: c² = ?', options: ['a + b', 'a² - b²', 'a² + b²', '2ab'], ans: 2 },
    { q: 'In a right triangle with legs 6 and 8, the hypotenuse is:', options: ['7', '10', '14', '48'], ans: 1 },
    { q: 'AA similarity criterion needs:', options: ['Two equal angles', 'Two equal sides', 'Three equal angles', 'One equal side'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Circles', questions: [
    { q: 'A tangent to a circle touches it at ___ point(s)', options: ['0', '1', '2', 'Infinite'], ans: 1 },
    { q: 'The tangent at any point is ___ to the radius at that point', options: ['Parallel', 'Perpendicular', 'Equal', 'Opposite'], ans: 1 },
    { q: 'From an external point, ___ tangent(s) can be drawn to a circle', options: ['0', '1', '2', '3'], ans: 2 },
    { q: 'Lengths of tangents from an external point are:', options: ['Different', 'Equal', 'Zero', 'Infinite'], ans: 1 },
    { q: 'A secant intersects a circle at ___ points', options: ['0', '1', '2', '3'], ans: 2 },
    { q: 'The angle between a tangent and a radius at the point of tangency is:', options: ['0°', '45°', '90°', '180°'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Carbon and its Compounds', questions: [
    { q: 'Carbon has ___ valence electrons', options: ['1', '2', '4', '6'], ans: 2 },
    { q: 'The bonds in diamond are:', options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], ans: 1 },
    { q: 'The functional group -OH is called:', options: ['Aldehyde', 'Ketone', 'Alcohol', 'Carboxylic acid'], ans: 2 },
    { q: 'Methane (CH₄) has ___ covalent bonds', options: ['1', '2', '3', '4'], ans: 3 },
    { q: 'Ethanol is used as:', options: ['Fuel and solvent', 'Food', 'Medicine only', 'Fertilizer'], ans: 0 },
    { q: 'The general formula for alkanes is:', options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], ans: 1 },
    { q: 'Soaps are sodium or potassium salts of:', options: ['Mineral acids', 'Fatty acids', 'Amino acids', 'Nucleic acids'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Metals and Non-Metals', questions: [
    { q: 'Most metals are:', options: ['Soft', 'Hard and lustrous', 'Gaseous', 'Transparent'], ans: 1 },
    { q: 'The most reactive metal is:', options: ['Gold', 'Iron', 'Potassium', 'Copper'], ans: 2 },
    { q: 'Metals are good conductors of:', options: ['Heat only', 'Electricity only', 'Heat and electricity', 'Neither'], ans: 2 },
    { q: 'Gold and platinum are called noble metals because they:', options: ['Are expensive', 'Are shiny', 'Do not corrode easily', 'Are heavy'], ans: 2 },
    { q: 'Ionic compounds have ___ melting points', options: ['Low', 'High', 'Zero', 'Variable'], ans: 1 },
    { q: 'The ore of aluminium is:', options: ['Haematite', 'Bauxite', 'Galena', 'Cinnabar'], ans: 1 },
    { q: 'Corrosion of iron is called:', options: ['Tarnishing', 'Rusting', 'Galvanization', 'Anodising'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Heredity and Evolution', questions: [
    { q: 'The father of genetics is:', options: ['Darwin', 'Mendel', 'Lamarck', 'Watson'], ans: 1 },
    { q: 'Genes are located on:', options: ['Cell wall', 'Cytoplasm', 'Chromosomes', 'Cell membrane'], ans: 2 },
    { q: 'In Mendel\'s cross TT × tt, all F1 offspring are:', options: ['TT', 'tt', 'Tt', 'T or t'], ans: 2 },
    { q: 'The phenotypic ratio in F2 of a monohybrid cross is:', options: ['1:1', '1:2:1', '3:1', '9:3:3:1'], ans: 2 },
    { q: 'Sex in humans is determined by:', options: ['X chromosome of mother', 'Y chromosome of father', 'Autosome', 'Random'], ans: 1 },
    { q: 'Evolution is based on:', options: ['Use and disuse', 'Natural selection', 'Mutation only', 'Lamarckism'], ans: 1 },
    { q: 'Homologous organs have similar ___ but different ___', options: ['Function, structure', 'Structure, function', 'Size, shape', 'Colour, size'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Science', chapterName: 'Magnetic Effects of Electric Current', questions: [
    { q: 'A compass needle is a:', options: ['Permanent magnet', 'Electromagnet', 'Conductor', 'Insulator'], ans: 0 },
    { q: 'Oersted discovered that electricity produces:', options: ['Light', 'Sound', 'Magnetism', 'Heat only'], ans: 2 },
    { q: 'Fleming\'s Left Hand Rule is used for:', options: ['Generators', 'Motors', 'Transformers', 'Batteries'], ans: 1 },
    { q: 'An electric motor converts:', options: ['Mechanical to electrical', 'Electrical to mechanical', 'Chemical to electrical', 'Electrical to chemical'], ans: 1 },
    { q: 'A generator converts:', options: ['Mechanical to electrical', 'Electrical to mechanical', 'Chemical to electrical', 'Electrical to chemical'], ans: 0 },
    { q: 'The domestic supply in India is ___ Hz', options: ['50', '60', '100', '220'], ans: 0 },
    { q: 'A fuse wire has ___ melting point and ___ resistance', options: ['High, low', 'Low, high', 'High, high', 'Low, low'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'The Rise of Nationalism in Europe', questions: [
    { q: 'Who unified Germany?', options: ['Garibaldi', 'Mazzini', 'Bismarck', 'Napoleon'], ans: 2 },
    { q: 'The unification of Italy was completed in:', options: ['1850', '1861', '1871', '1890'], ans: 1 },
    { q: 'The concept of "nation-states" emerged in:', options: ['15th century', '17th century', '19th century', '20th century'], ans: 2 },
    { q: 'The French Revolution occurred in:', options: ['1776', '1789', '1848', '1871'], ans: 1 },
    { q: 'Garibaldi was associated with the unification of:', options: ['Germany', 'France', 'Italy', 'Poland'], ans: 2 },
    { q: 'The Vienna Congress was held in:', options: ['1800', '1815', '1848', '1870'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'Federalism', questions: [
    { q: 'In a federal system, power is divided between:', options: ['Two parties', 'Three parties', 'Central and state governments', 'People and government'], ans: 2 },
    { q: 'India is a ___ type of federation', options: ['Coming together', 'Holding together', 'Military', 'Unitary'], ans: 1 },
    { q: 'How many states does India currently have?', options: ['25', '28', '29', '36'], ans: 1 },
    { q: 'Panchayati Raj is a system of:', options: ['Central government', 'State government', 'Local self-government', 'Military government'], ans: 2 },
    { q: 'The Concurrent List contains subjects on which ___ can make laws', options: ['Only Centre', 'Only State', 'Both Centre and State', 'Neither'], ans: 2 },
    { q: 'Defence is in the ___ List', options: ['Union', 'State', 'Concurrent', 'Residuary'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Social Science', chapterName: 'Money and Credit', questions: [
    { q: 'The modern form of money includes:', options: ['Gold coins', 'Currency notes and coins', 'Barter goods', 'Salt'], ans: 1 },
    { q: 'In India, currency is issued by:', options: ['SBI', 'RBI', 'Finance Ministry', 'Prime Minister'], ans: 1 },
    { q: 'A bank charges a higher interest on ___ than it pays on ___', options: ['Deposits, loans', 'Loans, deposits', 'Both same', 'Neither'], ans: 1 },
    { q: 'SHG stands for:', options: ['State Help Group', 'Self Help Group', 'Social Help Group', 'Small Help Group'], ans: 1 },
    { q: 'Collateral is:', options: ['A type of loan', 'An asset pledged against a loan', 'A bank account', 'A credit card'], ans: 1 },
    { q: 'Which is a formal source of credit?', options: ['Moneylender', 'Bank', 'Employer', 'Relative'], ans: 1 }
  ]});

  // ═══════════════════════════════════════════════════════════
  // EXPANDED QUIZZES — Classes 11-12 (6-8 questions each)
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding EXPANDED quizzes for Classes 11–12...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Sets', questions: [
    { q: 'The set of natural numbers is:', options: ['Finite', 'Infinite', 'Empty', 'Singleton'], ans: 1 },
    { q: 'A ∪ A = ?', options: ['∅', 'A', 'U', 'A\''], ans: 1 },
    { q: 'A ∩ ∅ = ?', options: ['A', '∅', 'U', 'A\''], ans: 1 },
    { q: 'If A = {1,2,3} and B = {2,3,4}, then A ∩ B = ?', options: ['{1,2,3,4}', '{2,3}', '{1,4}', '∅'], ans: 1 },
    { q: 'n(A ∪ B) = n(A) + n(B) - ?', options: ['n(A)', 'n(B)', 'n(A ∩ B)', 'n(A × B)'], ans: 2 },
    { q: 'Power set of {a, b} has ___ elements', options: ['2', '3', '4', '8'], ans: 2 },
    { q: 'A - B means elements in ___ but not in ___', options: ['B, A', 'A, B', 'A ∩ B', 'A ∪ B'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Trigonometric Functions', questions: [
    { q: 'π radians = ___ degrees', options: ['90', '180', '270', '360'], ans: 1 },
    { q: 'sin(90° + θ) = ?', options: ['sinθ', '-sinθ', 'cosθ', '-cosθ'], ans: 2 },
    { q: 'The period of sin x is:', options: ['π', '2π', 'π/2', '4π'], ans: 1 },
    { q: 'cos²x - sin²x = ?', options: ['1', 'cos2x', 'sin2x', '2sinxcosx'], ans: 1 },
    { q: 'sin(A+B) = sinAcosB + ?', options: ['sinBcosA', 'cosAcosB', 'sinAsinB', '-sinBcosA'], ans: 0 },
    { q: 'tan45° = ?', options: ['0', '1', '√3', 'undefined'], ans: 1 },
    { q: 'The range of sinx is:', options: ['[0, 1]', '[-1, 1]', '(-∞, ∞)', '[0, ∞)'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Permutations and Combinations', questions: [
    { q: '5! = ?', options: ['20', '60', '100', '120'], ans: 3 },
    { q: '⁶P₂ = ?', options: ['12', '15', '30', '36'], ans: 2 },
    { q: '⁵C₃ = ?', options: ['6', '10', '20', '60'], ans: 1 },
    { q: '0! = ?', options: ['0', '1', 'Undefined', '∞'], ans: 1 },
    { q: 'ⁿCₙ = ?', options: ['0', '1', 'n', 'n!'], ans: 1 },
    { q: 'ⁿC₀ = ?', options: ['0', '1', 'n', 'Undefined'], ans: 1 },
    { q: 'The number of ways to arrange 4 books on a shelf:', options: ['4', '12', '16', '24'], ans: 3 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Limits and Derivatives', questions: [
    { q: 'lim(x→0) sin(x)/x = ?', options: ['0', '1', '∞', 'Undefined'], ans: 1 },
    { q: 'd/dx (x²) = ?', options: ['x', '2x', 'x²', '2'], ans: 1 },
    { q: 'd/dx (sin x) = ?', options: ['-sin x', 'cos x', '-cos x', 'tan x'], ans: 1 },
    { q: 'd/dx (eˣ) = ?', options: ['xeˣ⁻¹', 'eˣ', 'xeˣ', 'eˣ/x'], ans: 1 },
    { q: 'lim(x→2) (x²-4)/(x-2) = ?', options: ['0', '2', '4', '∞'], ans: 2 },
    { q: 'd/dx (constant) = ?', options: ['1', '0', 'constant', '∞'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Motion in a Straight Line', questions: [
    { q: 'A body at rest has velocity:', options: ['1 m/s', 'Infinite', '0', 'Negative'], ans: 2 },
    { q: 'The slope of a position-time graph gives:', options: ['Acceleration', 'Velocity', 'Displacement', 'Force'], ans: 1 },
    { q: 'The area under a v-t graph gives:', options: ['Velocity', 'Acceleration', 'Displacement', 'Force'], ans: 2 },
    { q: 'v = u + at is the ___ equation of motion', options: ['First', 'Second', 'Third', 'Fourth'], ans: 0 },
    { q: 'If u=0 and a=10, velocity after 5 seconds is:', options: ['10 m/s', '25 m/s', '50 m/s', '100 m/s'], ans: 2 },
    { q: 'Negative acceleration is called:', options: ['Speed', 'Retardation', 'Displacement', 'Velocity'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Work, Energy and Power', questions: [
    { q: 'Work done by a force perpendicular to displacement is:', options: ['Maximum', 'Minimum', 'Zero', 'Negative'], ans: 2 },
    { q: 'KE of a body of mass 2 kg moving at 3 m/s is:', options: ['3 J', '6 J', '9 J', '18 J'], ans: 2 },
    { q: 'In an elastic collision, ___ is conserved', options: ['Only momentum', 'Only KE', 'Both momentum and KE', 'Neither'], ans: 2 },
    { q: '1 HP = ___ watts', options: ['500', '746', '1000', '1500'], ans: 1 },
    { q: 'A spring stores ___ energy', options: ['Kinetic', 'Potential (elastic)', 'Chemical', 'Nuclear'], ans: 1 },
    { q: 'The work-energy theorem states: net work = change in ___', options: ['PE', 'KE', 'Total energy', 'Momentum'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Gravitation', questions: [
    { q: 'Kepler\'s second law deals with:', options: ['Elliptical orbits', 'Equal areas in equal times', 'T² ∝ R³', 'Gravitational force'], ans: 1 },
    { q: 'The escape velocity from Earth is approximately:', options: ['7.9 km/s', '11.2 km/s', '15 km/s', '3 × 10⁸ m/s'], ans: 1 },
    { q: 'g at the centre of Earth is:', options: ['9.8 m/s²', 'Infinite', '0', 'Maximum'], ans: 2 },
    { q: 'Geostationary satellites orbit with period:', options: ['12 hours', '24 hours', '48 hours', '7 days'], ans: 1 },
    { q: 'Gravitational PE = ?', options: ['½mv²', '-GMm/r', 'mgh only', 'GMm/r²'], ans: 1 },
    { q: 'The value of G is approximately:', options: ['6.67 × 10⁻¹¹ Nm²/kg²', '9.8 m/s²', '6.67 × 10¹¹', '3 × 10⁸'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Equilibrium', questions: [
    { q: 'At equilibrium, the rate of forward reaction is:', options: ['Zero', 'Maximum', 'Equal to reverse reaction', 'Infinite'], ans: 2 },
    { q: 'Le Chatelier\'s principle predicts the effect of:', options: ['Temperature only', 'Pressure only', 'Stress on equilibrium', 'Catalysts only'], ans: 2 },
    { q: 'pH of pure water is:', options: ['0', '7', '14', '1'], ans: 1 },
    { q: 'A buffer solution resists changes in:', options: ['Temperature', 'Pressure', 'pH', 'Volume'], ans: 2 },
    { q: 'Kw at 25°C is:', options: ['10⁻⁷', '10⁻¹⁴', '7', '14'], ans: 1 },
    { q: 'If Kc > 1, the equilibrium favours:', options: ['Reactants', 'Products', 'Neither', 'Both equally'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Structure of Atom', questions: [
    { q: 'Heisenberg\'s uncertainty principle states we cannot simultaneously know:', options: ['Mass and charge', 'Position and momentum', 'Spin and colour', 'Protons and neutrons'], ans: 1 },
    { q: 'The quantum number "l" defines:', options: ['Shell', 'Subshell (shape)', 'Orientation', 'Spin'], ans: 1 },
    { q: 'Maximum electrons in a subshell with l=2 is:', options: ['2', '6', '10', '14'], ans: 2 },
    { q: 'Aufbau principle states electrons fill:', options: ['Highest energy first', 'Lowest energy first', 'Randomly', 'All at once'], ans: 1 },
    { q: 'Hund\'s rule states electrons ___ before pairing', options: ['Pair up', 'Singly occupy orbitals', 'Leave orbitals empty', 'Fill s-orbital'], ans: 1 },
    { q: 'The electron configuration of Na (Z=11) is:', options: ['2,8,2', '2,8,1', '2,9', '1,8,2'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Biomolecules', questions: [
    { q: 'Enzymes are chemically:', options: ['Carbohydrates', 'Lipids', 'Proteins', 'Nucleic acids'], ans: 2 },
    { q: 'The monomer of proteins is:', options: ['Glucose', 'Amino acid', 'Fatty acid', 'Nucleotide'], ans: 1 },
    { q: 'DNA stands for:', options: ['Deoxyribose Nucleic Acid', 'Deoxyribonucleic Acid', 'Dinucleotide Acid', 'Dual Nucleic Acid'], ans: 1 },
    { q: 'Cellulose is a:', options: ['Protein', 'Lipid', 'Polysaccharide', 'Nucleic acid'], ans: 2 },
    { q: 'The bond between amino acids is called:', options: ['Glycosidic bond', 'Peptide bond', 'Phosphodiester bond', 'Hydrogen bond'], ans: 1 },
    { q: 'Starch is a polymer of:', options: ['Amino acids', 'Glucose', 'Fatty acids', 'Nucleotides'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Cell Cycle and Cell Division', questions: [
    { q: 'Mitosis produces ___ daughter cells', options: ['1', '2', '4', '8'], ans: 1 },
    { q: 'Meiosis produces ___ daughter cells', options: ['1', '2', '4', '8'], ans: 2 },
    { q: 'Crossing over occurs in ___ of meiosis', options: ['Prophase I', 'Metaphase I', 'Anaphase I', 'Telophase I'], ans: 0 },
    { q: 'The phase where DNA replication occurs is:', options: ['G1', 'S phase', 'G2', 'M phase'], ans: 1 },
    { q: 'Mitosis maintains the ___ number of chromosomes', options: ['Haploid', 'Diploid', 'Triploid', 'Aneuploid'], ans: 1 },
    { q: 'Meiosis is also called ___ division', options: ['Equational', 'Reductional', 'Amitotic', 'Binary'], ans: 1 }
  ]});

  // Class 12 expanded
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Matrices', questions: [
    { q: 'A matrix with m rows and n columns is called:', options: ['m×n matrix', 'n×m matrix', 'Square matrix', 'Identity matrix'], ans: 0 },
    { q: 'A square matrix with all diagonal elements 1 and rest 0 is:', options: ['Zero matrix', 'Identity matrix', 'Scalar matrix', 'Diagonal matrix'], ans: 1 },
    { q: 'If A is 3×2 and B is 2×4, then AB is:', options: ['3×4', '2×2', '3×2', 'Not possible'], ans: 0 },
    { q: '(AB)ᵀ = ?', options: ['AᵀBᵀ', 'BᵀAᵀ', 'AB', 'BA'], ans: 1 },
    { q: 'A + B = B + A is called ___ property', options: ['Associative', 'Commutative', 'Distributive', 'Identity'], ans: 1 },
    { q: 'A symmetric matrix satisfies:', options: ['A = -Aᵀ', 'A = Aᵀ', 'A = A²', 'A = A⁻¹'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Determinants', questions: [
    { q: 'The determinant of a 1×1 matrix [5] is:', options: ['0', '1', '5', 'Undefined'], ans: 2 },
    { q: 'If |A| = 0, the matrix is called:', options: ['Identity', 'Singular', 'Non-singular', 'Symmetric'], ans: 1 },
    { q: 'det(AB) = ?', options: ['det(A) + det(B)', 'det(A) × det(B)', 'det(A) - det(B)', 'det(A)/det(B)'], ans: 1 },
    { q: 'A⁻¹ exists only if:', options: ['|A| = 0', '|A| ≠ 0', 'A is square', 'Both B and C'], ans: 3 },
    { q: 'adj(A) is the transpose of the ___ matrix', options: ['Minor', 'Cofactor', 'Inverse', 'Identity'], ans: 1 },
    { q: 'A⁻¹ = (1/|A|) × ?', options: ['A', 'Aᵀ', 'adj(A)', '|A|'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Integrals', questions: [
    { q: '∫ xⁿ dx = ? (n ≠ -1)', options: ['xⁿ⁺¹ + C', 'xⁿ⁺¹/(n+1) + C', 'nxⁿ⁻¹ + C', 'xⁿ/n + C'], ans: 1 },
    { q: '∫ cos x dx = ?', options: ['-sin x + C', 'sin x + C', '-cos x + C', 'tan x + C'], ans: 1 },
    { q: '∫ eˣ dx = ?', options: ['xeˣ + C', 'eˣ + C', 'eˣ/x + C', 'eˣ⁻¹ + C'], ans: 1 },
    { q: '∫ 1/x dx = ?', options: ['x + C', 'ln|x| + C', '-1/x² + C', 'eˣ + C'], ans: 1 },
    { q: 'The fundamental theorem of calculus connects:', options: ['Limits and continuity', 'Differentiation and integration', 'Algebra and geometry', 'Sets and functions'], ans: 1 },
    { q: '∫₀¹ 2x dx = ?', options: ['0', '1', '2', '4'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Electromagnetic Induction', questions: [
    { q: 'Faraday\'s law relates induced EMF to:', options: ['Current', 'Rate of change of flux', 'Resistance', 'Charge'], ans: 1 },
    { q: 'Lenz\'s law is consistent with the law of conservation of:', options: ['Charge', 'Mass', 'Energy', 'Momentum'], ans: 2 },
    { q: 'Self-inductance is measured in:', options: ['Farad', 'Henry', 'Ohm', 'Weber'], ans: 1 },
    { q: 'Eddy currents can be minimized by:', options: ['Using solid cores', 'Using laminated cores', 'Increasing current', 'Using thicker wires'], ans: 1 },
    { q: 'The device that works on electromagnetic induction is:', options: ['Battery', 'Resistor', 'Generator', 'Capacitor'], ans: 2 },
    { q: 'Magnetic flux Φ = ?', options: ['B × A × cosθ', 'B × A × sinθ', 'B / A', 'B + A'], ans: 0 }
  ]});

  await upsertQuiz({ subjectName: 'Physics', chapterName: 'Semiconductor Electronics', questions: [
    { q: 'Silicon has ___ valence electrons', options: ['1', '2', '3', '4'], ans: 3 },
    { q: 'In a p-type semiconductor, the majority carriers are:', options: ['Electrons', 'Holes', 'Protons', 'Neutrons'], ans: 1 },
    { q: 'A diode allows current in ___ direction(s)', options: ['Both', 'One', 'No', 'All'], ans: 1 },
    { q: 'AND gate gives output 1 when:', options: ['Any input is 1', 'All inputs are 1', 'All inputs are 0', 'No input'], ans: 1 },
    { q: 'OR gate gives output 0 when:', options: ['Any input is 1', 'All inputs are 1', 'All inputs are 0', 'One input is 1'], ans: 2 },
    { q: 'NOT gate is also called:', options: ['Buffer', 'Inverter', 'Amplifier', 'Oscillator'], ans: 1 },
    { q: 'LED stands for:', options: ['Light Emitting Device', 'Light Emitting Diode', 'Low Energy Diode', 'Laser Emitting Diode'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Chemistry', chapterName: 'Chemical Kinetics', questions: [
    { q: 'Rate of reaction increases with:', options: ['Decrease in temperature', 'Increase in temperature', 'Decrease in concentration', 'Increase in volume'], ans: 1 },
    { q: 'A catalyst ___ the activation energy', options: ['Increases', 'Decreases', 'Does not change', 'Doubles'], ans: 1 },
    { q: 'The order of a reaction is determined by:', options: ['Balanced equation', 'Experiment', 'Molecular formula', 'Temperature'], ans: 1 },
    { q: 'For a first-order reaction, t₁/₂ = ?', options: ['0.693/k', '1/k', '2/k', 'k/0.693'], ans: 0 },
    { q: 'Molecularity of a reaction can be:', options: ['0', 'Fractional', '1, 2, or 3', 'Any number'], ans: 2 },
    { q: 'The Arrhenius equation relates rate constant to:', options: ['Pressure', 'Volume', 'Temperature', 'Concentration'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Principles of Inheritance and Variation', questions: [
    { q: 'Mendel worked with:', options: ['Fruit flies', 'Garden peas', 'Mice', 'Bacteria'], ans: 1 },
    { q: 'A test cross involves crossing with:', options: ['Dominant homozygous', 'Recessive homozygous', 'Heterozygous', 'Hybrid'], ans: 1 },
    { q: 'Blood group inheritance is an example of:', options: ['Dominance', 'Co-dominance', 'Incomplete dominance', 'Epistasis'], ans: 1 },
    { q: 'Down syndrome is due to trisomy of chromosome:', options: ['18', '21', '13', 'X'], ans: 1 },
    { q: 'Colour blindness is a ___ linked trait', options: ['Y', 'X', 'Autosomal', 'Mitochondrial'], ans: 1 },
    { q: 'The dihybrid ratio in F2 is:', options: ['3:1', '1:2:1', '9:3:3:1', '1:1:1:1'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Biology', chapterName: 'Ecosystem', questions: [
    { q: 'Producers in an ecosystem are:', options: ['Herbivores', 'Carnivores', 'Green plants', 'Decomposers'], ans: 2 },
    { q: 'Energy flow in an ecosystem is:', options: ['Bidirectional', 'Unidirectional', 'Circular', 'Random'], ans: 1 },
    { q: 'The 10% law was given by:', options: ['Odum', 'Lindeman', 'Tansley', 'Haeckel'], ans: 1 },
    { q: 'GPP - Respiration = ?', options: ['Total energy', 'NPP', 'Biomass', 'Entropy'], ans: 1 },
    { q: 'Detritivores feed on:', options: ['Living plants', 'Living animals', 'Dead organic matter', 'Minerals'], ans: 2 },
    { q: 'Which pyramid is always upright?', options: ['Pyramid of numbers', 'Pyramid of biomass', 'Pyramid of energy', 'All pyramids'], ans: 2 }
  ]});

  console.log('✅ All EXPANDED quizzes seeded!');

  // ═══════════════════════════════════════════════════════════
  // KNOWLEDGE GRAPH SEED DATA
  // ═══════════════════════════════════════════════════════════
  console.log('🧠 Seeding Knowledge Graphs...');

  // Class 10 Mathematics Knowledge Graph
  await upsertGraph({
    subjectName: 'Mathematics', std: 10, board: BOARD,
    nodes: [
      { chapterName: 'Real Numbers', concepts: ['Euclid\'s Division Lemma', 'Fundamental Theorem of Arithmetic', 'HCF and LCM', 'Irrational Numbers', 'Decimal Expansions'], prerequisites: [], difficulty: 2 },
      { chapterName: 'Polynomials', concepts: ['Zeroes of Polynomial', 'Relationship between zeroes and coefficients', 'Division Algorithm'], prerequisites: ['Real Numbers'], difficulty: 3 },
      { chapterName: 'Pair of Linear Equations in Two Variables', concepts: ['Graphical Method', 'Substitution', 'Elimination', 'Cross-multiplication', 'Consistency'], prerequisites: ['Polynomials'], difficulty: 3 },
      { chapterName: 'Quadratic Equations', concepts: ['Factorization', 'Completing the Square', 'Quadratic Formula', 'Discriminant', 'Nature of Roots'], prerequisites: ['Polynomials', 'Real Numbers'], difficulty: 4 },
      { chapterName: 'Arithmetic Progressions', concepts: ['Common Difference', 'nth Term Formula', 'Sum of n Terms', 'Applications'], prerequisites: ['Pair of Linear Equations in Two Variables'], difficulty: 3 },
      { chapterName: 'Triangles', concepts: ['Similarity Criteria', 'BPT', 'AAA, AA, SSS, SAS Similarity', 'Pythagoras Theorem'], prerequisites: [], difficulty: 3 },
      { chapterName: 'Coordinate Geometry', concepts: ['Distance Formula', 'Section Formula', 'Area of Triangle', 'Collinearity'], prerequisites: ['Pair of Linear Equations in Two Variables', 'Triangles'], difficulty: 3 },
      { chapterName: 'Introduction to Trigonometry', concepts: ['Trigonometric Ratios', 'Ratios of Standard Angles', 'Complementary Angles', 'Trigonometric Identities'], prerequisites: ['Triangles'], difficulty: 4 },
      { chapterName: 'Some Applications of Trigonometry', concepts: ['Heights and Distances', 'Angle of Elevation', 'Angle of Depression'], prerequisites: ['Introduction to Trigonometry'], difficulty: 4 },
      { chapterName: 'Circles', concepts: ['Tangent Properties', 'Number of Tangents from External Point', 'Length of Tangent'], prerequisites: ['Triangles'], difficulty: 3 },
      { chapterName: 'Areas Related to Circles', concepts: ['Sector Area', 'Segment Area', 'Combination of Figures'], prerequisites: ['Circles', 'Introduction to Trigonometry'], difficulty: 3 },
      { chapterName: 'Surface Areas and Volumes', concepts: ['Combination of Solids', 'Conversion of Shapes', 'Frustum of Cone'], prerequisites: ['Areas Related to Circles'], difficulty: 4 },
      { chapterName: 'Statistics', concepts: ['Mean of Grouped Data', 'Median of Grouped Data', 'Mode of Grouped Data', 'Ogive Curves'], prerequisites: ['Real Numbers'], difficulty: 3 },
      { chapterName: 'Probability', concepts: ['Classical Definition', 'Complementary Events', 'Elementary Events', 'Simple Problems'], prerequisites: ['Statistics', 'Real Numbers'], difficulty: 2 }
    ]
  });

  // Class 10 Science Knowledge Graph
  await upsertGraph({
    subjectName: 'Science', std: 10, board: BOARD,
    nodes: [
      { chapterName: 'Chemical Reactions and Equations', concepts: ['Balancing Equations', 'Types of Reactions', 'Oxidation and Reduction', 'Corrosion', 'Rancidity'], prerequisites: [], difficulty: 2 },
      { chapterName: 'Acids, Bases and Salts', concepts: ['Indicators', 'pH Scale', 'Neutralization', 'Salt Preparation', 'Baking Soda Uses'], prerequisites: ['Chemical Reactions and Equations'], difficulty: 3 },
      { chapterName: 'Metals and Non-Metals', concepts: ['Physical Properties', 'Chemical Properties', 'Reactivity Series', 'Ionic Bonding', 'Extraction', 'Corrosion'], prerequisites: ['Chemical Reactions and Equations'], difficulty: 3 },
      { chapterName: 'Carbon and its Compounds', concepts: ['Covalent Bonding', 'Versatile Nature of Carbon', 'Homologous Series', 'Functional Groups', 'Chemical Properties'], prerequisites: ['Chemical Reactions and Equations', 'Metals and Non-Metals'], difficulty: 4 },
      { chapterName: 'Life Processes', concepts: ['Autotrophic Nutrition', 'Heterotrophic Nutrition', 'Respiration', 'Transportation', 'Excretion'], prerequisites: [], difficulty: 3 },
      { chapterName: 'Control and Coordination', concepts: ['Nervous System', 'Reflex Arc', 'Brain Structure', 'Hormones in Animals', 'Plant Hormones'], prerequisites: ['Life Processes'], difficulty: 4 },
      { chapterName: 'How do Organisms Reproduce?', concepts: ['Asexual Reproduction', 'Sexual Reproduction', 'Reproductive Health', 'Contraception'], prerequisites: ['Life Processes', 'Control and Coordination'], difficulty: 3 },
      { chapterName: 'Heredity and Evolution', concepts: ['Mendel\'s Laws', 'Sex Determination', 'Evolution Theories', 'Natural Selection', 'Speciation'], prerequisites: ['How do Organisms Reproduce?'], difficulty: 5 },
      { chapterName: 'Light — Reflection and Refraction', concepts: ['Laws of Reflection', 'Mirror Formula', 'Laws of Refraction', 'Lens Formula', 'Sign Convention', 'Magnification'], prerequisites: [], difficulty: 4 },
      { chapterName: 'The Human Eye and the Colourful World', concepts: ['Eye Defects', 'Atmospheric Refraction', 'Dispersion', 'Scattering of Light'], prerequisites: ['Light — Reflection and Refraction'], difficulty: 3 },
      { chapterName: 'Electricity', concepts: ['Ohm\'s Law', 'Resistance', 'Series and Parallel', 'Electric Power', 'Energy Calculations'], prerequisites: [], difficulty: 4 },
      { chapterName: 'Magnetic Effects of Electric Current', concepts: ['Magnetic Field', 'Fleming\'s Rules', 'Electromagnets', 'Electric Motor', 'Generator', 'Domestic Circuits'], prerequisites: ['Electricity'], difficulty: 4 },
      { chapterName: 'Our Environment', concepts: ['Ecosystems', 'Food Chains', 'Food Webs', 'Ozone Layer', 'Biodegradable Waste'], prerequisites: ['Life Processes'], difficulty: 2 }
    ]
  });

  // Class 9 Science Knowledge Graph
  await upsertGraph({
    subjectName: 'Science', std: 9, board: BOARD,
    nodes: [
      { chapterName: 'Matter in Our Surroundings', concepts: ['States of Matter', 'Change of State', 'Evaporation', 'Latent Heat'], prerequisites: [], difficulty: 2 },
      { chapterName: 'Is Matter Around Us Pure', concepts: ['Mixtures', 'Solutions', 'Separation Techniques', 'Compounds vs Mixtures'], prerequisites: ['Matter in Our Surroundings'], difficulty: 3 },
      { chapterName: 'Atoms and Molecules', concepts: ['Dalton\'s Theory', 'Atomic Mass', 'Molecular Mass', 'Mole Concept', 'Chemical Formula'], prerequisites: ['Is Matter Around Us Pure'], difficulty: 4 },
      { chapterName: 'Structure of the Atom', concepts: ['Thomson Model', 'Rutherford Model', 'Bohr Model', 'Electron Configuration', 'Valency'], prerequisites: ['Atoms and Molecules'], difficulty: 4 },
      { chapterName: 'The Fundamental Unit of Life', concepts: ['Cell Structure', 'Organelles', 'Prokaryotic vs Eukaryotic', 'Cell Theory'], prerequisites: [], difficulty: 3 },
      { chapterName: 'Tissues', concepts: ['Plant Tissues', 'Animal Tissues', 'Meristematic', 'Permanent Tissues'], prerequisites: ['The Fundamental Unit of Life'], difficulty: 3 },
      { chapterName: 'Diversity in Living Organisms', concepts: ['Five Kingdom Classification', 'Nomenclature', 'Taxonomic Hierarchy'], prerequisites: ['The Fundamental Unit of Life', 'Tissues'], difficulty: 3 },
      { chapterName: 'Motion', concepts: ['Distance vs Displacement', 'Speed vs Velocity', 'Acceleration', 'Equations of Motion', 'Graphs'], prerequisites: [], difficulty: 3 },
      { chapterName: 'Force and Laws of Motion', concepts: ['Newton\'s First Law', 'Second Law', 'Third Law', 'Momentum', 'Conservation of Momentum'], prerequisites: ['Motion'], difficulty: 4 },
      { chapterName: 'Gravitation', concepts: ['Universal Gravitation', 'Free Fall', 'Weight vs Mass', 'Kepler\'s Laws'], prerequisites: ['Force and Laws of Motion'], difficulty: 4 },
      { chapterName: 'Work and Energy', concepts: ['Work', 'Kinetic Energy', 'Potential Energy', 'Conservation of Energy', 'Power'], prerequisites: ['Force and Laws of Motion'], difficulty: 3 },
      { chapterName: 'Sound', concepts: ['Production', 'Propagation', 'Speed of Sound', 'Echo', 'Human Ear', 'Ultrasound'], prerequisites: ['Motion'], difficulty: 3 }
    ]
  });

  // Class 9 Mathematics Knowledge Graph
  await upsertGraph({
    subjectName: 'Mathematics', std: 9, board: BOARD,
    nodes: [
      { chapterName: 'Number Systems', concepts: ['Rational Numbers', 'Irrational Numbers', 'Real Numbers', 'Number Line', 'Laws of Exponents'], prerequisites: [], difficulty: 3 },
      { chapterName: 'Polynomials', concepts: ['Degree', 'Zeroes', 'Remainder Theorem', 'Factor Theorem', 'Algebraic Identities'], prerequisites: ['Number Systems'], difficulty: 3 },
      { chapterName: 'Coordinate Geometry', concepts: ['Cartesian Plane', 'Quadrants', 'Plotting Points', 'Axes'], prerequisites: ['Number Systems'], difficulty: 2 },
      { chapterName: 'Linear Equations in Two Variables', concepts: ['Writing Equations', 'Solutions', 'Graphing Lines'], prerequisites: ['Polynomials', 'Coordinate Geometry'], difficulty: 3 },
      { chapterName: 'Introduction to Euclid\'s Geometry', concepts: ['Axioms', 'Postulates', 'Theorems', 'Euclid\'s Five Postulates'], prerequisites: [], difficulty: 2 },
      { chapterName: 'Lines and Angles', concepts: ['Types of Angles', 'Parallel Lines', 'Transversal', 'Angle Sum Property'], prerequisites: ['Introduction to Euclid\'s Geometry'], difficulty: 2 },
      { chapterName: 'Triangles', concepts: ['Congruence Criteria', 'SAS', 'ASA', 'SSS', 'RHS', 'Inequalities'], prerequisites: ['Lines and Angles'], difficulty: 3 },
      { chapterName: 'Quadrilaterals', concepts: ['Properties', 'Parallelogram Theorems', 'Mid-Point Theorem'], prerequisites: ['Triangles'], difficulty: 3 },
      { chapterName: 'Circles', concepts: ['Chords', 'Arcs', 'Inscribed Angles', 'Cyclic Quadrilaterals'], prerequisites: ['Triangles', 'Lines and Angles'], difficulty: 4 },
      { chapterName: 'Heron\'s Formula', concepts: ['Semi-perimeter', 'Area of Triangle', 'Application to Quadrilaterals'], prerequisites: ['Triangles'], difficulty: 2 },
      { chapterName: 'Surface Areas and Volumes', concepts: ['Cube', 'Cuboid', 'Cylinder', 'Cone', 'Sphere'], prerequisites: ['Heron\'s Formula'], difficulty: 3 },
      { chapterName: 'Statistics', concepts: ['Data Collection', 'Frequency Distribution', 'Mean', 'Median', 'Mode', 'Histograms'], prerequisites: ['Number Systems'], difficulty: 2 }
    ]
  });

  console.log('✅ Knowledge Graphs seeded!');

  await mongoose.disconnect();
  console.log('🎉 Comprehensive seed complete! Disconnected from MongoDB.');
}

seedAll().catch(err => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
