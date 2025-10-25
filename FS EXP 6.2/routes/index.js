// routes/index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const SECRET_KEY = 'mysecretkey';
let balance = 1000;

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'user1' && password === 'password123') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// Balance route (protected)
router.get('/balance', authMiddleware, (req, res) => {
  res.status(200).json({ balance });
});

// Deposit route (protected)
router.post('/deposit', authMiddleware, (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }
  balance += amount;
  res.status(200).json({ message: `Deposited $${amount}`, newBalance: balance });
});

// Withdraw route (protected)
router.post('/withdraw', authMiddleware, (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }
  if (amount > balance) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }
  balance -= amount;
  res.status(200).json({ message: `Withdrew $${amount}`, newBalance: balance });
});

module.exports = router;
