const data = require('mongoose');
const moviemanage = require("../schema/moviemanage");


module.exports = data.model('moviemanage', moviemanage);