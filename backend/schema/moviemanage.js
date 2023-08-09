const data = require('mongoose');

module.exports = new data.Schema({
    movieId: {
      type: String,
      required: true
    },
    movieName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
      },
      releaseDate: {
        type: String,
        required: true
      },
      cast: {
        type: String,
        required: true
      },
      crew: {
        type: String,
        required: true
      }
            
});