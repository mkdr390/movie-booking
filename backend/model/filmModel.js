const mongoose = require('mongoose');
const film = require("../schema/film");

module.exports = mongoose.model('film', film);