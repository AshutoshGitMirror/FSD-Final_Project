require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aitutor';

async function seedAdmin() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@tisd.app';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    console.log(`Admin account already exists: ${adminEmail}`);
    await mongoose.disconnect();
    return;
  }

  const hashed = await bcrypt.hash(adminPassword, 10);
  await User.create({
    fullName: 'Platform Admin',
    email: adminEmail,
    password: hashed,
    std: 10,
    board: 'CBSE',
    role: 'admin'
  });

  console.log(`✅ Admin account created: ${adminEmail}`);
  if (!process.env.ADMIN_PASSWORD) {
    console.log(`   ⚠️  Using default password (admin123) — set ADMIN_PASSWORD env var for production!`);
  }

  await mongoose.disconnect();
}

seedAdmin().catch(err => { console.error(err); process.exit(1); });
