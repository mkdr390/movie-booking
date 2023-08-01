const tickets = require('mongoose');
const ticket = require("../schema/tickets");

module.exports = tickets.model('ticket', ticket);