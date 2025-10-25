// routes/index.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/public', (req, res) => {
  res.status(200).send('This is a public route. No authentication required.');
});

router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).send('You have accessed a protected route with a valid Bearer token!');
});

module.exports = router;
