const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
require('dotenv').config();

// REGISTER
router.post('/register', async (req, res) => {
    const { username, password, categories } = req.body;
  
    try {
      const hashed = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashed,
        categories: categories || [] 
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Username already exists or registration failed' });
    }
  });

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });


    const token = jwt.sign(
      { userId: user._id , username: user.username},
      process.env.JWT_SECRET,
      { expiresIn: '7d' } 
    );

    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Login error' });
  }
});


router.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      res.json({ username: user.username, categories: user.categories });
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  });
  

module.exports = router;
