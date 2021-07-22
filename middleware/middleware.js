const middleware = {
    checkForAuth: function (req, res, next) {
        if (req.headers.apptoken === process.env.AUTH) {
            next()
        } else {
            res.status(403).end()
        }
    },
    checkForJSON: function (req, res, next) {
        if (req.is('application/json') === 'application/json') {
            next()
        } else {
            res.status(400).send('Content-Type must be application/json');
        }
    }
}

module.exports = middleware;