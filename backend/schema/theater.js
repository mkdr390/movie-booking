const mongoose = require('mongoose');
const { Schema } = require('mongoose');

module.exports = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    film: {
      type: Schema.Types.ObjectId,
      ref: 'film',
      required: false
    },
    seats: [{
      date: {
        type: String,
        required: false
      },
      '12PM': {
        totalSeats: {
          type: Number,
          required: false
        }
      },
      '6PM': {
        totalSeats: {
          type: Number,
          required: false
        }
      },
      '11PM': {
        totalSeats: {
          type: Number,
          required: false
        }
      }
    }]
});