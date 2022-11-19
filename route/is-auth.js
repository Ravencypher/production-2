const express = require('express');

const authController = require('../controller/utilisateur');
                               
const router = express.Router();

// /auth/login/ => POST
router.post('/login', authController.getUtilisateurLogin);

module.exports = router;