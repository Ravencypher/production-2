const express = require('express');
const controller= require('../controller/boycott');
const authController = require('../middleware/is-auth');
const telechImages = require('../middleware/telechImages');
const router = express.Router();

router.post("/boycott",authController, telechImages.single("image"), controller.ajouterBoycott);
router.get("/boycotts", authController, controller.getTousBoycotts);
router.get("/boycott/:id", authController, controller.getBoycott);
router.get("/boycott/:id/utilisateur", authController, controller.getBoycottUtilisateur);
router.put("/boycott/:id", authController, controller.modifierBoycott);
router.delete("/boycott/:id", authController, controller.supprimerBoycott);

module.exports = router;
