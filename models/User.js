const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: String,
  name: String,
  language: String,
  points: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
