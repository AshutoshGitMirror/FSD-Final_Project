const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Replace with your MongoDB connection string if deploying. For local testing, we use standard local URI.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB via Mongoose'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/curriculum', require('./routes/curriculum'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/links', require('./routes/links'));
app.use('/api/quiz', require('./routes/quiz'));

app.get('/', (req, res) => {
  res.send('AI Tutor Backend is running with Neubrutalism power!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
