const data = require('mongoose');
const moviemanage = require("../schema/movie manage");


module.exports = data.model('movie manage', moviemanage);