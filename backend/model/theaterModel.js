const mongoose = require('mongoose');
const theater = require("../schema/theater");

module.exports = mongoose.model('theater', theater);