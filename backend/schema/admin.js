const admindata = require('mongoose');

module.exports = new admindata.Schema({
    userName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
});