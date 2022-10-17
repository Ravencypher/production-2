const express = require("express");
const { connecter } = require("./db/connect");
const routesUtilisateur = require("./route/utilisateur");
const routesBoycott = require("./route/boycott");
const app = express();

//middleware qui permet de convertir les input encodés a la req
app.use(express.urlencoded({extend : true}));
//converti en jason
app.use(express.json());

app.use("/api/v1", routesUtilisateur)
app.use("/api/v1", routesBoycott)

connecter("mongodb://localhost:27017/", (erreur) => {
    if(erreur){
      console.log("Erreur lors de la connexion avec la base de données");
      process.exit(-1);  
    }else{
        console.log("Connexion avec la base de données établie");
        app.listen(3000);
        console.log("Attente des requêtes au port 3000");
    }
});

