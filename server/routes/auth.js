// Aswanth Sreekumar

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userrs.model.js');

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validate user input
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User logout (optional)
router.post('/logout', (req, res) => {
  // Implement logout logic (e.g., invalidate token)
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
