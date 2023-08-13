const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'film',
    required: true
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'theater',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  seats: [
    {
      type: String,
      required: true
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    required: true
  }
});