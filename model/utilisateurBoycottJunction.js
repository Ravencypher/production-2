const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UtilisateurBoycottSchema = mongoose.Schema({
        idBoycott : {
            type: Schema.Types.ObjectId,
            ref: 'boycott',
            required: true
        },
        idUtilisateur:{
            type: Schema.Types.ObjectId,
            ref: 'utilisateur',
            required: true
        }
    }
);
module.exports = mongoose.model('UtilisateurBoycott', UtilisateurBoycottSchema);