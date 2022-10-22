const express = require('express');
const controller = require('../controller/utilisateur');
const authController = require('../middleware/is-auth');
const router = express.Router();

router.post("/utilisateur", controller.ajouterUtilisateur);
router.get("/utilisateurs", controller.getTousUtilisateurs);
router.get("/utilisateur/:id", controller.getUtilisateur);
router.put("/utilisateur/:id", controller.modifierUtilisateur);
router.delete("/utilisateur/:id", controller.supprimerUtilisateur);

router.post("/utilisateur", authController.ajouterUtilisateur);
router.post("/utilisateur", authController.getUtilisateur)
module.exports = router;