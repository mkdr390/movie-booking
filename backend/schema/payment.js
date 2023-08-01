const payment = require('mongoose');

module.exports = new payment.Schema({
    viewerName: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    cardNumber: {
      type: String,
      required: true
    },
    expiryDate: {
      type: String,
      required: true
    },
    cvv: {
        type: String,
        required: true
      }
});