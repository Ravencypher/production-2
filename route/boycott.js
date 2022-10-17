const express = require('express');
const { ajouterBoycott } = require('../controller/boycott');
const router = express.Router();

router.route("/boycott").post(ajouterBoycott);

module.exports = router;
