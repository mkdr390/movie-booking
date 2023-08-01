const tickets = require('mongoose');

module.exports = new tickets.Schema({
    movieId: {
        type: String,
        required: true
      },
      
    movieName: {
      type: String,
      required: true
    },
    numberOfSeats: {
      type: String,
      required: true
    }
});