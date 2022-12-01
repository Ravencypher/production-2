const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUtilisateur = require("./route/utilisateur");
const routesBoycott = require("./route/boycott");
const routesAuth = require("./route/is-auth");

const app = express();
dotenv.config();

//middleware qui permet de convertir les input encodés a la req
//app.use(express.urlencoded({extended : true}));
//converti en jason
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/api/v1", routesUtilisateur)
app.use("/api/v1", routesBoycott)
app.use("/api/v1", routesAuth)

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Attente des requêtes au port 3000");
    });
  })
  .catch(err => console.log(err));
