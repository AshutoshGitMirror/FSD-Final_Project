const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Curriculum = require('./models/Curriculum');
const Progress = require('./models/Progress');
const Leaderboard = require('./models/Leaderboard');
const SavedLinks = require('./models/SavedLinks');
const Quiz = require('./models/Quiz');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Curriculum.deleteMany({});
  await Progress.deleteMany({});
  await Leaderboard.deleteMany({});
  await SavedLinks.deleteMany({});
  await Quiz.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // ── 1. Users ──────────────────────────────────────────────
  const hash = await bcrypt.hash('1234', 10);
  const users = await User.insertMany([
    { fullName: 'Bhavesh Sharma', email: 'bhavesh@example.com', password: hash, std: 10, board: 'CBSE' },
    { fullName: 'Priya Kapoor',   email: 'priya@example.com',   password: hash, std: 9,  board: 'ICSE' },
  ]);
  console.log('👤 Users seeded:', users.length);

  // ── 2. Curriculum ─────────────────────────────────────────
  await Curriculum.insertMany([
    {
      subjectName: 'Science', std: 10, board: 'CBSE',
      chapters: [
        { chapterName: 'Chemical Reactions and Equations', description: 'Balancing equations and types of reactions' },
        { chapterName: 'Acids, Bases and Salts',           description: 'Properties, pH scale and indicators' },
        { chapterName: 'Metals and Non-Metals',            description: 'Physical and chemical properties' },
      ]
    },
    {
      subjectName: 'Mathematics', std: 10, board: 'CBSE',
      chapters: [
        { chapterName: 'Real Numbers',  description: 'Euclid\'s division lemma and the fundamental theorem of arithmetic' },
        { chapterName: 'Polynomials',   description: 'Zeroes, coefficients and division algorithm for polynomials' },
        { chapterName: 'Trigonometry',  description: 'Introduction to trigonometric ratios and identities' },
      ]
    },
    {
      subjectName: 'Environmental Studies (EVS)', std: 3, board: 'State Board',
      chapters: [
        { chapterName: 'Our Surroundings', description: 'Understanding the local environment and nature' },
        { chapterName: 'Water for Life',   description: 'Importance of water and conservation' },
        { chapterName: 'Food We Eat',      description: 'Types of food and healthy eating habits' },
      ]
    },
    {
      subjectName: 'English', std: 3, board: 'State Board',
      chapters: [
        { chapterName: 'Alphabet Fun',           description: 'Learning letters and simple words' },
        { chapterName: 'Story Time: The Kind Ant', description: 'Reading comprehension and moral values' },
      ]
    },
  ]);
  console.log('📚 Curriculum seeded');

  // ── 3. Progress ────────────────────────────────────────────
  await Progress.insertMany([
    { userId: users[0]._id, subjectName: 'Science',     chapterName: 'Chemical Reactions and Equations', quizScore: 9,  totalQuestions: 10, isCompleted: true },
    { userId: users[0]._id, subjectName: 'Mathematics', chapterName: 'Real Numbers',                     quizScore: 7,  totalQuestions: 10, isCompleted: true },
  ]);
  console.log('📈 Progress seeded');

  // ── 4. Leaderboard ────────────────────────────────────────
  await Leaderboard.insertMany([
    { userId: users[0]._id, averageScore: 92, totalChaptersCompleted: 2 },
    { userId: users[1]._id, averageScore: 85, totalChaptersCompleted: 1 },
  ]);
  console.log('🏆 Leaderboard seeded');

  // ── 5. Saved Links ────────────────────────────────────────
  await SavedLinks.insertMany([
    { userId: users[0]._id, url: 'https://www.youtube.com/watch?v=Lqf2hy3Mop4', title: 'Chemical Reactions Explained - Class 10 CBSE', source: 'youtube' },
    { userId: users[0]._id, url: 'https://www.youtube.com/watch?v=yJYY6JlD0sU', title: 'Real Numbers - Euclid Division Lemma Trick',    source: 'youtube' },
  ]);
  console.log('🔗 Saved Links seeded');

  // ── 6. Quizzes ─────────────────────────────────────────────
  await Quiz.insertMany([
    {
      subjectName: 'Science',
      chapterName: 'Chemical Reactions and Equations',
      questions: [
        { q: 'Which of the following is a physical change?', options: ['Rusting of iron', 'Burning of wood', 'Melting of ice', 'Cooking food'], ans: 2 },
        { q: 'What is the color of Magnesium Oxide?', options: ['Black', 'White', 'Yellow', 'Blue'], ans: 1 },
        { q: 'What type of reaction is the burning of coal?', options: ['Combination', 'Decomposition', 'Displacement', 'Double Displacement'], ans: 0 }
      ]
    },
    {
      subjectName: 'Environmental Studies (EVS)',
      chapterName: 'Our Surroundings',
      questions: [
        { q: 'What do trees give us to breathe?', options: ['Water', 'Oxygen', 'Chocolate', 'Dirt'], ans: 1 },
        { q: 'Is a cat a living thing?', options: ['Yes', 'No', 'Maybe', 'I don\'t know'], ans: 0 },
        { q: 'Where do we live?', options: ['In the ocean', 'On land', 'On top of a cloud', 'Underground'], ans: 1 }
      ]
    }
  ]);
  console.log('📝 Quizzes seeded');
  await mongoose.disconnect();
}

seed().catch(err => { console.error('❌ Seed error:', err); process.exit(1); });
