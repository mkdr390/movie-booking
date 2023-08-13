const mongoose = require('mongoose');
const ticket = require("../schema/ticket");

module.exports = mongoose.model('ticket', ticket);