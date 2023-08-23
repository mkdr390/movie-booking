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
        required: true
    },
    movieLength: {
      type: String,
      required: true
    },
    movieDescription: {
      type: String,
      required: true
    },
    cast: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true }
      }
    ],
    crew: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true }
      }
    ]
});