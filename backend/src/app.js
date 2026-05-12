const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const { connectDatabase } = require('./config/database');
const { registerRoutes, routeRegistry } = require('./routes');
const { authLimiter } = require('./middleware/rateLimiter');

const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(morgan('short'));
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',').map(s => s.trim()) || 'http://localhost:5173',
    credentials: true
  }));
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('AI Tutor Backend is running with curriculum, quiz, progress, graph, review, links, and Feynman APIs.');
  });

  app.use('/api/auth', authLimiter);

  registerRoutes(app);

  app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.statusCode || err.status || 500).json({
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
