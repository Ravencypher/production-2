const express = require("express");
const { connecter } = require("./db/connect");
const app = express();

//création de point de terminaison
app.get("/", (req, res) => {
    console.log("Salut les filles!")
});

connecter("mongodb://localhost:27017/", (erreur) => {
    if(erreur){
      console.log("Erreur lors de la connexion avec la base de données");
      process.exit(-1);  
    }else{
        console.log("Connexion avec la base de données établie");
        //création du serveur
        app.listen(3000);
        console.log("Attente des requêtes au port 3000");
    }
});

