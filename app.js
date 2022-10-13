const express = require("express");
const app = express();

//création de point de terminaison
app.get("/", (req, res) => {
    console.log("Salut les filles!")
});

//création du serveur
app.listen(3000);
console.log("Attente des requêtes au port 3000");