const bookmovie = require('mongoose');
const bookmoviepage= require("../schema/bookmoviepage");

module.exports = bookmovie.model('bookmoviepage',bookmoviepage );