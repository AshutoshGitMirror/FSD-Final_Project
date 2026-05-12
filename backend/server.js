require('dotenv').config();
const { createApp, connectDatabase } = require('./src/app');

const PORT = process.env.PORT || 5000;
const app = createApp();

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
