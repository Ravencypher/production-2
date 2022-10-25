const Boycott = require("../model/boycott")
const UtilisateurBoycottJunction = require("../model/UtilisateurBoycottJunction")
const { ObjectID } = require("bson");
const dotenv = require('dotenv');
const boycott = require("../model/boycott");
dotenv.config();

//Pour ajouter un boycott
exports.ajouterBoycott = async (req, res, next) => {
   
        const boycott = new Boycott({
            titre: req.body.titre,
            img: req.body.img,
            resume: req.body.resume,
            description: req.body.description
        });
        return boycott.save()
        .then(result => {
            let utilisateurBoycott = new UtilisateurBoycottJunction ({
                idBoycott: result._id,
                idUtilisateur: new ObjectID(req.body.idUtilisateur),           
            });
            utilisateurBoycott.save()
        .then(result => {
                res.status(200).json({ 
                  message: 'Boycott créé !', 
                  idBoycott: result.idBoycott,
                  idUtilisateur: result.idUtilisateur,
                });//format jason
            })
        })              
        .catch (error=> {
          if(!error.statusCode){
            res.status(500).json(error);
          }                
          next(error)
        });
       }

     

//Pour recuperer tous les boycotts
exports.getTousBoycotts = async(req, res, next) =>{
    Boycott.find()
    .then(boycotts => {
      if(boycotts){
        res.status(200).json(boycotts);
      }else{
        res.status(204).json({msg:"Aucun boycott trouvé"});
      }
    })
    .catch (error=> {
      if(!error.statusCode){
        res.status(500).json(error);
      }                
      next(error)
    });    
}

//Pour recuperer un boycott
exports.getBoycott = async(req, res, next) =>{

    Boycott.findById(req.params.id)
    .then(boycott => {
      if(boycott){
        res.status(200).json(boycott);
      }else{
        res.status(204).json({msg:"Aucun boycott trouvé"});
      }
    })
    .catch (error=> {
      if(!error.statusCode){
        res.status(500).json(error);
      }                
      next(error)
    });
};

//Pour modifier un boycott
exports.modifierBoycott = async (req, res) =>{
    let id = new ObjectID(req.params.id);
    let nTitre = req.body.titre;
    let nImg = req.body.img;
    let nResume = req.body.resume;
    let nDescription = req.body.description

   Boycott.updateOne({_id : id},
    {$set : {titre : nTitre, img : nImg, resume : nResume, description : nDescription}}
    )
    .then(id =>{
      if(id.modifiedCount == 1){
        res.status(200).json({msg : "Modification réussie"});   
    }else{
        res.status(404).json({msg : "Ce boycott n'existe pas"});
    }
    })
    .catch(error =>{
    console.log(error);
    res.status(500).json(error);
     });
}

//Pour supprimer un boycott
exports.supprimerBoycott = async (req, res) =>{

    let id = new ObjectID(req.params.id);

    Boycott.deleteOne({_id : id},)
    .then(id =>{     
      if(id.deletedCount == 1){
        res.status(200).json({msg :"Suppression réussie"}); 
     }else{
  res.status(404).json({msg : "Ce boycott n'existe pas"});
     }
     })
    .catch(error =>{
    console.log(error);
    res.status(500).json(error);
  });
}