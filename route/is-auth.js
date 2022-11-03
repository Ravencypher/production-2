const express = require('express');

const authController = require('../controller/utilisateur');
                               
const router = express.Router();

// /auth/login/ => POST
router.post('/login', authController.getUtilisateurLogin);

// /auth/signup/ => POST
router.post('/signup', authController.ajouterUtilisateur)

module.exports = router;