const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    fullName: {
      type: String,
      required: true
    },
    emailId: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
});