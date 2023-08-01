require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./backend');

// MONGO DB connection
mongoose.connect(process.env.MONGO_CLUSTER, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

////////// DB ends here

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('frontend'));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html')
})

const port = process.env.PORT;


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});