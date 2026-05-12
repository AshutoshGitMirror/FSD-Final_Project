const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

const connectDatabase = () => (
  mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB via Mongoose'))
    .catch((err) => console.error('MongoDB Connection Error:', err))
);

module.exports = {
  connectDatabase,
  MONGO_URI
};
