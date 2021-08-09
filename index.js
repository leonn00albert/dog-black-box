require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware/middleware');
const locationRoutes = require('./routes/location');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const Net = require('net');

const tcpPort = process.env.TCPPORT;
const server = new Net.Server();

server.listen(tcpPort, function() {
    console.log(`Server listening for connection requests on socket localhost:${tcpPort}`);
});

// When a client requests a connection with the server, the server creates a new
// socket dedicated to that client.
server.on('connection', function(socket) {
    console.log('A new connection has been established.');

    // Now that a TCP connection has been established, the server can send data to
    // the client by writing to its socket.
    socket.write('Hello, client.');

    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function(chunk) {
        console.log(`Data received from client: ${chunk.toString()}`);
    });

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    // Don't forget to catch error, for your own sake.
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});

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