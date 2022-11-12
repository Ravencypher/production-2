const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boycottSchema = mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  
  resume: {
    type: String
  },
  description: {
    type: String
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'utilisateur',
    required: true
  }]
},
   { timestamps: true }
);

module.exports = mongoose.model('boycott', boycottSchema);