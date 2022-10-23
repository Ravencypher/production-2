const Boycott = require("../model/boycott")
const UtilisateurBoycottJunction = require("../model/UtilisateurBoycottJunction")
const { ObjectID } = require("bson");

//Pour ajouter un boycott
const ajouterBoycott = async (req, res) => {
    try {
        let boycott = new Boycott({
            titre: req.body.titre,
            img: req.body.img,
            resume: req.body.resume,
            description: req.body.description,
        });
        boycott.save()
        .then(result => {
            console.log(result);
            let utilisateurBoycott = new UtilisateurBoycottJunction ({
                idBoycott: result._id,
                idUtilisateur: new ObjectID(req.body.idUtilisateur),           
            });
            utilisateurBoycott.save()
            .then(result => {
                res.status(200).json(result);//format jason
            })
        });
    }catch (error) {
        console.log(error);
        res.status(500).json(error);

    }
};

//Pour recuperer tous les boycotts
const getTousBoycotts = async(req, res) =>{
    try{
      let cursor = client.bd().collection("boycotts").find();
      let result = await cursor.toArray();
      //Test
      if(result.length > 0){
        res.status(200).json(result);
      }else{
        res.status(204).json({msg:"Aucun boycotts trouvé"});
      }
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}
//Pour recuperer un boycott
const getBoycott = async(req, res) =>{
    try{
      let id = new ObjectID(req.params.id);  
      let cursor = client.bd().collection("boycotts").find({_id : id});
      let result = await cursor.toArray();
      //Test
      if(result.length > 0){
        res.status(200).json(result[0]);
      }else{
        res.status(404).json({msg:"Cet boycott n'existe pas"});
      }
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};
//Pour modifier un boycott
const modifierBoycott = async (req, res) =>{
    try{
        let id = new ObjectID(req.params.id);
        let nTitre = req.body.titre;
        let nImg = req.body.img;
        let nResume = req.body.resume;

        let result = await client
        .bd()
        .collection("boycotts")
        .updateOne({_id : id},
        {$set : {titre : nTitre, img : nImg, resume : nResume}}
        );

    //Test 
    if(result.modifiedCount == 1){
        res.status(200).json({msg : "Modification réussie"});   
    }else{
        res.status(404).json({msg : "Cet boycott n'existe pas"});
    }

    }catch(error){
        console.log(error);
        res.status(500).json(error);

    }
};
//Pour supprimer un boycott
const supprimerBoycott = async (req, res) =>{
    try{
        let id = new ObjectID(req.params.id);

        let result = await client
        .bd()
        .collection("boycotts")
        .deleteOne({_id : id},);
    //Test
    if(result.deletedCount == 1){
        res.status(200).json({msg :"Suppression réussie"}); 
    }else{
        res.status(404).json({msg : "Cet boycott n'existe pas"});
    }

    }catch(error){
        console.log(error);
        res.status(500).json(error);

    }
};

module.exports = {ajouterBoycott, getTousBoycotts, getBoycott, modifierBoycott, supprimerBoycott};