require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware/middleware');
const locationRoutes = require('./routes/location');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT;


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const mongoose = require("mongoose");
app.set('view engine', 'ejs');
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@${process.env.MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(locationRoutes);
app.use(dashboardRoutes);
app.use(authRoutes);

app.get('*', middleware.checkForAuth, (req, res,) => {
  res.status(404).send('404');
});


app.listen(port, () => {
  console.log(`dog-black-box-api listening at http://localhost:${port}`)
});