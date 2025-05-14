const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
require('dotenv').config();


const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

