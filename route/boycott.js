const express = require('express');
const controller= require('../controller/boycott');
const authController = require('../middleware/is-auth');
const telechImages = require('../middleware/telechImages');
const router = express.Router();

router.post("/boycott",authController, telechImages.single("image"), controller.ajouterBoycott);
router.get("/boycotts", controller.getTousBoycotts);
router.get("/boycott/:id", controller.getBoycott);
router.get("/boycott/:id/utilisateur", authController, controller.getBoycottUtilisateur);
router.post("/boycott/:id/suivre", authController, controller.suivreBoycott);
router.post("/boycott/:id/alerte", authController, controller.alerteBoycott);
router.put("/boycott/:id", authController, controller.modifierBoycott);
router.delete("/boycott/:id", authController, controller.supprimerBoycott);

module.exports = router;
