require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://leon:${process.env.MONGO_KEY}@cluster0.umurs.mongodb.net/dog-black-box?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}
);
const locationSchema = new mongoose.Schema({
  name: String
});
const Location = mongoose.model('Location', locationSchema);
const auth = process.env.AUTH;

app.get('/location', checkForAuth, async (req, res,) => {
  res.send(await Location.find({}));
});

app.get('/location/:id', checkForAuth, async (req, res,) => {
  res.send(await Location.findById(req.params.id));
});


app.post('/location',checkForAuth, async (req, res,) => {
  const content = {
    name: 'test'
  }
  const location = new Location(content);
  location.save()
  res.status(200).end()

});
app.put('/location/:id', checkForAuth, async (req, res,) => {
   Location.findByIdAndUpdate(req.params.id,function(){
    res.status(200).end()
   });
  

});

app.delete('/location/:id', checkForAuth, async (req, res,) => {
  Location.findByIdAndDelete(req.params.id, function(){
    res.status(200).end()
   });


});


app.get('*', checkForAuth, (req, res,) => {

  res.send('404');
});

function checkForAuth(req, res, next) {

  if (req.headers.apptoken === auth) {
    next()
  } else {
    res.status(403).end()
   

  }
}
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});