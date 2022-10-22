const express = require('express');
const controller= require('../controller/boycott');
const router = express.Router();

router.post("/boycott", controller.ajouterBoycott);
router.get("/boycotts", controller.getTousBoycotts);
router.get("/boycott/:id", controller.getBoycott);
router.put("/boycott/:id", controller.modifierBoycott);
router.delete("/boycott/:id", controller.supprimerBoycott);

module.exports = router;
