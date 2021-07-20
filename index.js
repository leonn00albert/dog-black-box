require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware/middleware');
const locationRoutes = require('./routes/location');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://leon:${process.env.MONGO_KEY}@cluster0.umurs.mongodb.net/dog-black-box?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }
);

const auth = process.env.AUTH;

app.use(locationRoutes)

app.get('*', middleware.checkForAuth, (req, res,) => {
  res.status(404).send('404');
});


app.listen(port, () => {
  console.log(`dog-black-box-api listening at http://localhost:${port}`)
});