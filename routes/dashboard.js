var express = require('express');
var Router = express.Router();
const middleware = require('../middleware/middleware');
const Location = require('../models/location');
Router.get('/dashboard', async (req, res,) => {
    res.render('../views/dashboard',{ data: await Location.find({})});
});


module.exports = Router;