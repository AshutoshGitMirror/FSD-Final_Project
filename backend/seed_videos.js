require('dotenv').config();
const mongoose = require('mongoose');
const Video = require('./src/models/Video');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

const VIDEOS = [
  // Class 10 Science
  { std: 10, subjectName: 'Science', chapterName: 'Chemical Reactions and Equations', conceptName: 'balancing equations', youtubeUrl: 'https://www.youtube.com/watch?v=Lqf2hy3Mop4', title: 'Balancing Chemical Equations Class 10', duration: '25:46' },
  { std: 10, subjectName: 'Science', chapterName: 'Chemical Reactions and Equations', conceptName: 'types of reactions', youtubeUrl: 'https://www.youtube.com/watch?v=CkacNyElGzY', title: 'Types of Chemical Reactions', duration: '20:53' },
  { std: 10, subjectName: 'Science', chapterName: 'Acids, Bases and Salts', conceptName: 'pH scale', youtubeUrl: 'https://www.youtube.com/watch?v=JN1x0Djs7sA', title: 'pH Scale Explained', duration: '15:30' },
  { std: 10, subjectName: 'Science', chapterName: 'Metals and Non-Metals', conceptName: 'physical properties', youtubeUrl: 'https://www.youtube.com/watch?v=BsvWqy3WlF0', title: 'Metals and Non Metals Class 10', duration: '52:15' },
  { std: 10, subjectName: 'Science', chapterName: 'Carbon and its Compounds', conceptName: 'covalent bonding', youtubeUrl: 'https://www.youtube.com/watch?v=JBRTmFkRQqw', title: 'Carbon and its Compounds Class 10', duration: '47:14' },
  // Class 10 Mathematics
  { std: 10, subjectName: 'Mathematics', chapterName: 'Real Numbers', conceptName: 'euclid division lemma', youtubeUrl: 'https://www.youtube.com/watch?v=yJYY6JlD0sU', title: 'Real Numbers - Euclid Division Lemma', duration: '22:10' },
  { std: 10, subjectName: 'Mathematics', chapterName: 'Polynomials', conceptName: 'zeroes of polynomial', youtubeUrl: 'https://www.youtube.com/watch?v=8BcU80pW7Fs', title: 'Polynomials Class 10', duration: '51:34' },
  { std: 10, subjectName: 'Mathematics', chapterName: 'Trigonometry', conceptName: 'trigonometric ratios', youtubeUrl: 'https://www.youtube.com/watch?v=9QhXUoOYJLg', title: 'Trigonometry Class 10', duration: '52:26' },
  // Class 9 Science
  { std: 9, subjectName: 'Science', chapterName: 'Matter in Our Surroundings', conceptName: 'states of matter', youtubeUrl: 'https://www.youtube.com/watch?v=fPQ4L6oFgTY', title: 'Matter in Our Surroundings Class 9', duration: '31:32' },
  { std: 9, subjectName: 'Science', chapterName: 'Atoms and Molecules', conceptName: 'dalton atomic theory', youtubeUrl: 'https://www.youtube.com/watch?v=JPCyJGiQY7g', title: 'Atoms and Molecules Class 9', duration: '37:12' },
  { std: 9, subjectName: 'Science', chapterName: 'Structure of the Atom', conceptName: 'atomic models', youtubeUrl: 'https://www.youtube.com/watch?v=JQcZIXCwA_Y', title: 'Structure of the Atom Class 9', duration: '55:11' },
  // Class 9 Mathematics
  { std: 9, subjectName: 'Mathematics', chapterName: 'Number Systems', conceptName: 'irrational numbers', youtubeUrl: 'https://www.youtube.com/watch?v=20JO_QK_kSU', title: 'Number System Class 9', duration: '54:24' },
  { std: 9, subjectName: 'Mathematics', chapterName: 'Coordinate Geometry', conceptName: 'cartesian plane', youtubeUrl: 'https://www.youtube.com/watch?v=f9QTHhY4U0g', title: 'Coordinate Geometry Class 9', duration: '49:50' },
];

async function seedVideos() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  for (const video of VIDEOS) {
    await Video.findOneAndUpdate(
      { youtubeUrl: video.youtubeUrl },
      { ...video, board: 'CBSE' },
      { upsert: true, new: true }
    );
    console.log(`  ✓ ${video.title}`);
  }

  await mongoose.disconnect();
  console.log('Done seeding videos');
}

seedVideos().catch(err => { console.error(err); process.exit(1); });
