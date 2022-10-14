const { Utilisateur } = require("../model/utilisateur")
const client = require("../db/connect");
const { ObjectID } = require("bson");

//Pour ajouter un utilisateur
const ajouterUtilisateur = async (req, res) => {
    try {
        let utilisateur = new Utilisateur(
            req.body.pseudo,
            req.body.email, 
            req.body.passeword
        );

        let result = await client
        .bd()
        .collection("utilisateurs")
        .insertOne(utilisateur);//retourne la valeur dans la variable result

        res.status(200).json(result);//format jason

    }catch (error) {
        console.log(error);
        res.status(500).json(error);

    }
};
//Pour recuperer tous les utilisateurs
const getTousUtilisateurs = async(req, res) =>{
    try{
      let cursor = client.bd().collection("utilisateurs").find();
      let result = await cursor.toArray();
      //Test
      if(result.length > 0){
        res.status(200).json(result);
      }else{
        res.status(204).json({msg:"Aucun utilisateur trouvé"});
      }
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}
//Pour recuperer un utilisateur
const getUtilisateur = async(req, res) =>{
    try{
      let id = new ObjectID(req.parms.id);  
      let cursor = client.bd().collection("utilisateurs").find({_id : id});
      let result = await cursor.toArray();
      //Test
      if(result.length > 0){
        res.status(200).json(result[0]);
      }else{
        res.status(404).json({msg:"Cet utilisateur n'existe pas"});
      }
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};
//Pour modifier un utilisateur
const modifierUtilisateur = async (req, res) =>{
    try{
        let id = new ObjectID(req.parms.id);
        let nPseudo = req.body.pseudo;
        let nEmail = req.body.email;
        let nPassword = req.body.passeword;

        let result = await client
        .bd()
        .collection("utilisateurs")
        .updateOne({_id : id},
        {$set : {pseudo : nPseudo, email : nEmail, password : nPassword}}
        );

    //Test 
    if(result.modifiedCount == 1){
        res.status(200).json({msg : "Modification réussie"});   
    }else{
        res.status(404).json({msg : "Cet utilisateur n'existe pas"});
    }

    }catch(error){
        console.log(error);
        res.status(500).json(error);

    }
};
//Pour supprimer un utilisateur
const supprimerUtilisateur = async (req, res) =>{
    try{
        let id = new ObjectID(req.parms.id);

        let result = await client
        .bd()
        .collection("utilisateurs")
        .deleteOne({_id : id},);
    //Test
    if(result.deletedCount == 1){
        res.status(200).json({msg :"Suppression réussie"}); 
    }else{
        res.status(404).json({msg : "Cet utilisateur n'existe pas"});
    }

    }catch(error){
        console.log(error);
        res.status(500).json(error);

    }
};

module.exports = {ajouterUtilisateur, getTousUtilisateurs, getUtilisateur, modifierUtilisateur, supprimerUtilisateur};