const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boycottSchema = new Schema({
  titre: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  
  resume: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
},
   { timestamps: true }
);

module.exports = mongoose.model('boycott', boycottSchema);