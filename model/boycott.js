const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boycottSchema = mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  
  resume: {
    type: String
  },
  description: {
    type: String
  }
},
   { timestamps: true }
);

module.exports = mongoose.model('boycott', boycottSchema);