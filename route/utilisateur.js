const express = require('express');
const controller = require('../controller/utilisateur');
const authController = require('../middleware/is-auth');
const router = express.Router();

router.post("/utilisateur", authController, controller.ajouterUtilisateur);
router.get("/utilisateurs", authController, controller.getTousUtilisateurs);
router.get("/utilisateur/:id", authController, controller.getUtilisateur);
router.get("/utilisateur/:id/Boycotts", authController, controller.getUtilisateurBoycotts);
router.post("/login:id", controller.getUtilisateurLogin);
router.put("/utilisateur/:id", authController, controller.modifierUtilisateur);
router.delete("/utilisateur/:id", authController,controller.supprimerUtilisateur);
module.exports = router;