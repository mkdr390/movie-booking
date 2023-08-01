const mongoose = require('mongoose');
const user = require("../schema/user");


module.exports = mongoose.model('user', user);
