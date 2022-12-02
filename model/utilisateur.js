const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utilisateurSchema = new Schema({
  pseudo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ville: {
    type: String,
    required: true
  },
  pays: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  status: {
    type: String, 
    enum: ['En attente', 'Active'],
    default: 'En attente'
  },
  confirmationCode: { 
    type: String, 
    unique: true },
  
},
  { timestamps: true }
);

module.exports = mongoose.model('utilisateur', utilisateurSchema);