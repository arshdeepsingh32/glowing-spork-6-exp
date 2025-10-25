// routes/index.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create initial users
router.post('/create-users', async (req, res) => {
  try {
    await User.deleteMany({}); // clear existing users

    const users = await User.insertMany([
      { name: 'Alice', balance: 1000 },
      { name: 'Bob', balance: 500 }
    ]);

    res.status(201).json({ message: 'Users created.', users });
  } catch (error) {
    res.status(500).json({ message: 'Error creating users', error: error.message });
  }
});

// Transfer route
router.post('/transfer', async (req, res) => {
  try {
    const { fromUserId, toUserId, amount } = req.body;

    if (!fromUserId || !toUserId || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const sender = await User.findById(fromUserId);
    const receiver = await User.findById(toUserId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    res.status(200).json({
      message: `Transferred $${amount} from ${sender.name} to ${receiver.name}.`,
      senderBalance: sender.balance,
      receiverBalance: receiver.balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Transfer failed', error: error.message });
  }
});

module.exports = router;
