var express = require('express');
var Router = express.Router();
const middleware = require('../middleware/middleware');
const Location = require('../models/location');
Router.get('/location', middleware.checkForAuth, async (req, res,) => {
    res.send(await Location.find({}));
});

Router.get('/location/:id', middleware.checkForAuth, async (req, res,) => {
    res.send(await Location.findById(req.params.id));
});


Router.post('/location', middleware.checkForJSON, middleware.checkForAuth, async (req, res,) => {
    const content = {
        name: 'test'
    }
    const location = new Location(content);
    location.save()
    res.status(200).end()

});
Router.put('/location/:id', middleware.checkForAuth, async (req, res,) => {
    Location.findByIdAndUpdate(req.params.id, function () {
        res.status(200).end()
    });
});

Router.delete('/location', middleware.checkForAuth, async (req, res,) => {
    Location.deleteMany({}, function (err) {
        if (err) {
            res.status(501).send(err)
        } else {
            res.status(200).end()
        }

    });
});
Router.delete('/location/:id', middleware.checkForAuth, async (req, res,) => {
    Location.findByIdAndDelete(req.params.id, function () {
        res.status(200).end()
    });
});

module.exports = Router;