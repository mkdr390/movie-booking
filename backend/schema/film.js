const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    trailerLink: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    releaseDate: {
        type: String,
        requiredL: true
    }
});