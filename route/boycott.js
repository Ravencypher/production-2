const express = require('express');
const { ajouterBoycott, getTousBoycotts, getBoycott, modifierBoycott, supprimerBoycott } = require('../controller/boycott');
const router = express.Router();

router.route("/boycott").post(ajouterBoycott);
router.route("/boycotts").get(getTousBoycotts);
router.route("/boycott/:id").get(getBoycott);
router.route("/boycott/:id").put(modifierBoycott);
router.route("/boycott/:id").delete(supprimerBoycott);

module.exports = router;
