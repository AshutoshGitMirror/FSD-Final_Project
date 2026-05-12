const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./config/database');
const { registerRoutes, routeRegistry } = require('./routes');

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('AI Tutor Backend is running with curriculum, quiz, progress, graph, review, links, and Feynman APIs.');
  });

  registerRoutes(app);

  app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({
      error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
  });

  return app;
};

module.exports = {
  createApp,
  connectDatabase,
  routes: routeRegistry
};
