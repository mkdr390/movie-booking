const bookmovie = require('mongoose');

module.exports = new bookmovie.Schema({
    viewerName: {
      type: String,
      required: true
    },
    movieName: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
});