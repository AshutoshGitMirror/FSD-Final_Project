const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./config/database');
const { registerRoutes, routeRegistry } = require('./routes');

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  registerRoutes(app);

  app.get('/', (req, res) => {
    res.send('AI Tutor Backend is running with curriculum, quiz, progress, graph, review, links, and Feynman APIs.');
  });

  return app;
};

module.exports = {
  createApp,
  connectDatabase,
  routes: routeRegistry
};
