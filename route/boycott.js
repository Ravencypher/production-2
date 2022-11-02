const express = require('express');
const controller= require('../controller/boycott');
const telechImages = require('../middleware/telechImages');
const router = express.Router();

router.post("/boycott", controller.ajouterBoycott, telechImages.single("img"));
router.get("/boycotts", controller.getTousBoycotts);
router.get("/boycott/:id", controller.getBoycott);
router.get("/boycott/:id/utilisateur", controller.getBoycottUtilisateur);
router.put("/boycott/:id", controller.modifierBoycott);
router.delete("/boycott/:id", controller.supprimerBoycott);

module.exports = router;
