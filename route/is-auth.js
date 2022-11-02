const express = require('express');

const authController = require('../controller/utilisateur');
                                
const router = express.Router();

// /auth/login/ => POST
router.post("/utilisateur/:id", authController.getUtilisateurLogin);

// /auth/signup/ => POST
router.post("/utilisateur", authController.ajouterUtilisateur)

module.exports = router;