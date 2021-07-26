var express = require('express');
var Router = express.Router();
const middleware = require('../middleware/middleware');
const Location = require('../models/location');
const {
    createHash
} = require('crypto');

const secret = process.env.SECRET;
const hash = createHash('sha256');
hash.update(secret);


Router.get('/login', async (req, res,) => {
    res.render('../views/login');
});

Router.post('/login', async (req, res) => {
    console.log(req.body)
    const hashDigest = hash.copy().digest('hex').toString();
    if (req.body.password === hashDigest){
        res.cookie(`auth`, hashDigest, {
            maxAge: 5000,
            httpOnly: true,
            sameSite: 'lax'
        });

    res.redirect('/dashboard');
    }
    else {
        res.redirect('/login');
    }
})


module.exports = Router;