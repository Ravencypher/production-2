const Boycott = require("../model/boycott");
const boycott = require("../model/boycott");
const utilisateur = require("../model/utilisateur");
const { ObjectID } = require("bson");
const dotenv = require('dotenv');
const nodeFetch = require('node-fetch');
const FormData = require('form-data');
const sharp = require('sharp');
dotenv.config();

//Pour ajouter un boycott
exports.ajouterBoycott = async (req, res, next) => {
   
   if(!req.file){
      res.status(400).json({error: "Veuillez fournir une image"})
      }
    const image = req.file;
    const resize = sharp(image.buffer).resize({width:500}).jpeg({quality: 80}); 
    const formdata = new FormData();

    formdata.append("image", resize, {
      contentType: image.mimetype,
      filename: image.originalname,
    });

    nodeFetch("https://images.kalanso.top/image/?api=PO65UYR",{
      method: "POST",
      body: formdata,
    })
   .then((response) => response.json())
   .then((data) => {
      if(data.status === "success"){
        const boycott = new Boycott({
        titre: req.body.titre,
        idUtilisateur: new ObjectID(req.body.idUtilisateur),
        image: data.filename,
        resume: req.body.resume,
        description: req.body.description
      })
      return boycott.save()
        .then(result => {
            res.status(200).json({ 
              message: 'Boycott créé !', 
              idBoycott: result._id
            });
        })              
        .catch (error=> {
          if(!error.statusCode){
            res.status(500).json(error);
          }                
          next(error)
        });
      }
    })
  },

exports.suivreBoycott = async (req, res, next) => {
  const id = new ObjectID(req.params.id);
  const idUtilisateur = new ObjectID(req.body.idUtilisateur);

  Boycott.findById(id)
  .then(boycott => {
    if(boycott){
      if(boycott.followers.includes(idUtilisateur)){
        res.status(202).json({msg : "Vous suivez déjà ce boycott"});  
      }
      else{
        boycott.followers.push(idUtilisateur);
      
        Boycott.updateOne({_id : id},
          {$set : {followers : boycott.followers}}
          )
          .then(id =>{
            if(id.modifiedCount == 1){
                res.status(200).json({msg : "Vous suivez maintenant ce boycott"});   
            }else{
                res.status(404).json({msg : "Ce boycott n'existe pas"});
            }
          })
          .catch(error =>{
              console.log(error);
              res.status(500).json(error);
           });
      }

    }else{
      res.status(404).json({msg:"Aucun boycott trouvé"});
    }
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
      if(boycotts.length > 0){
        res.status(200).json(boycotts);
      }else{
        res.status(404).json({msg:"Aucun boycott trouvé"});
      }
    })
    .catch (error=> {
      if(!error.statusCode){
        res.status(500).json(error);
      }                
      next(error)
    });    
},

//Pour recuperer un boycott
exports.getBoycott = async(req, res, next) =>{
    Boycott.findById(req.params.id)
    .populate("followers")
    .then(boycott => {
      if(boycott){
        res.status(200).json(boycott);
      }else{
        res.status(404).json({msg:"Aucun boycott trouvé"});
      }
    })
    .catch (error=> {
      if(!error.statusCode){
        res.status(500).json(error);
      }                
      next(error)
    });
},

//Afficher l'utilisateur d'un boycott 
exports.getBoycottUtilisateur = async(req, res, next) =>{
  Boycott.findById(req.params.id)
  .then(boycott => {
    if(boycott){
      utilisateur.findById(boycott.idUtilisateur)
      .then(utilisateur => {
        if(utilisateur){
          res.status(200).json(utilisateur);
        }
        else {
          res.status(404).json({msg:"Ce boycott n'a aucun utilisateur"});
        }
      })      
    }else{
      res.status(404).json({msg:"Aucun boycott trouvé"});
    }
  })
  .catch (error=> {
    if(!error.statusCode){
      res.status(500).json(error);
    }                
    next(error)
  });
}, 

//Pour modifier un boycott
exports.modifierBoycott = async (req, res) =>{
    const id = new ObjectID(req.params.id);
    const nTitre = req.body.titre;
    const nImg = req.body.img;
    const nResume = req.body.resume;
    const nDescription = req.body.description

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
},

//Pour supprimer un boycott
exports.supprimerBoycott = async (req, res) =>{

    const id = new ObjectID(req.params.id);

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