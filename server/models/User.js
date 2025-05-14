const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  categories: { type: [String], default: [] } 
});

module.exports = mongoose.model('User', userSchema);
