const express = require('express');
const router = express.Router();

const auth = require("./api/auth");
const film = require("./api/film");
const add = require("./api/add");
const theatre = require("./api/theater");
const bookshow = require("./api/bookshow");
const pay=require("./api/pay");
const availableticket=require("./api/availableticket");
const allOther=require("./api/allOther");
const ticket = require("./api/ticket")

function initRouter() {
  auth(router);
  film(router);
  add(router);
  theatre(router);
  bookshow(router);
  pay(router);
  availableticket(router);
  allOther(router);
  ticket(router)

  router.get('/', (req, res) => {
    res.send({ message: "Movie Booking API works 🤩!" });
  });
}

initRouter();

module.exports = router;