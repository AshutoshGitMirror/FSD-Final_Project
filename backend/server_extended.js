require('dotenv').config();
const { createApp, connectDatabase } = require('./src/app');

// Fail fast on missing JWT secret — don't start with broken auth
if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable is not set. Refusing to start.');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
const app = createApp();

connectDatabase().catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Extended server alias listening on port ${PORT}`);
});
