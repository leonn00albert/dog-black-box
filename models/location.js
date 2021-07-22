const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
  coord: {
    lon: String,
    lat: String
  },
  createdAt: { type: Date, default: Date.now },


});


module.exports = mongoose.model('Location', locationSchema);