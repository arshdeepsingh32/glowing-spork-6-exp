// server.js
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const routes = require('./routes');

const PORT = 3000;

// Global logging middleware
app.use(logger);

// Routes
app.use('/', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
