const payment = require('mongoose');
const paymentpage= require("../schema/payment");

module.exports = payment.model('payment',paymentpage );