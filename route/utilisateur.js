const express = require('express');
const { ajouterUtilisateur, getTousUtilisateurs, getUtilisateur, modifierUtilisateur, supprimerUtilisateur } = require('../controller/utilisateur');
const router = express.Router();

router.route("/utilisateur").post(ajouterUtilisateur);
router.route("/utilisateurs").get(getTousUtilisateurs);
router.route("/utilisateur/:id").get(getUtilisateur);
router.route("/utilisateur/:id").put(modifierUtilisateur);
router.route("/utilisateur/:id").delete(supprimerUtilisateur);

module.exports = router;