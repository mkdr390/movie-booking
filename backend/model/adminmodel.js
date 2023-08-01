const admindata = require('mongoose');
const admin = require("../schema/admin");

module.exports = admindata.model('admin', admin);