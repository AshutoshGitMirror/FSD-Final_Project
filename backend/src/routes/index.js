const routeRegistry = [
  ['/api/auth', require('./auth')],
  ['/api/curriculum', require('./curriculum')],
  ['/api/chat', require('./chat')],
  ['/api/progress', require('./progress')],
  ['/api/leaderboard', require('./leaderboard')],
  ['/api/links', require('./links')],
  ['/api/quiz', require('./quiz')],
  ['/api/knowledge-graph', require('./knowledgeGraph')],
  ['/api/spaced-repetition', require('./spacedRepetition')],
  ['/api/feynman', require('./feynman')]
];

const registerRoutes = (app) => {
  routeRegistry.forEach(([path, router]) => {
    app.use(path, router);
  });
};

module.exports = {
  registerRoutes,
  routeRegistry
};
