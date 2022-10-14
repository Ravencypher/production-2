const { MongoClient, Db } = require("mongodb");

var client = null;

//pour connecter l'appli a la base db
function connecter(url, callback){
    if(client == null){
        client = new MongoClient(url);

        client.connect((erreur) => {
            if(erreur){
                client = null;
                callback(erreur);
            }else{//si il n'y a pas d'erreur
                callback()
            }
        });//si la connection etait deja etablie
    }else{
        callback();
    }
}
function bd(){
    return new Db(client, "dbOk")
}
function fermerConnexion(){
    if(client){
        client.close();
        client = null;
    }
}
module.exports = {connecter, bd, fermerConnexion}
