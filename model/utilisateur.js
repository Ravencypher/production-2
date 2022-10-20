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
  isAdmin: {
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

module.exports = mongoose.model('utilisateur', utilisateurSchema);