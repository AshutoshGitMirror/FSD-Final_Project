require('dotenv').config();
const { createApp, connectDatabase } = require('./src/app');

const PORT = process.env.PORT || 5000;
const app = createApp();

connectDatabase().catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Extended server alias listening on port ${PORT}`);
});
