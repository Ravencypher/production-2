const Utilisateur = require("../model/utilisateur");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const {ObjectID} = require("bson");
const boycott = require("../model/boycott");
const UtilisateurBoycottJunction = require("../model/UtilisateurBoycottJunction");

//Pour ajouter un utilisateur //signup
exports.ajouterUtilisateur = async (req, res, next) => {          
  bcrypt.hash(req.body.password, 12)
    .then(hashedPw => {
        const utilisateur = new Utilisateur({
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hashedPw,          
          isAdmin: req.body.isAdmin
        });        
        return utilisateur.save();
      }).then(result => {
          res.status(201).json({ 
            message: 'Utilisateur créé !', 
            utilisateurId: result._id 
          });           
      })
      .catch (error=> {

        if(!error.statusCode){
          res.status(500).json(error);
        }                
        next(error)
      });
          
}
//Pour recuperer tous les utilisateurs
exports.getTousUtilisateurs = async(req, res, next) =>{
    Utilisateur.find()
    .then(utilisateurs => {
      if(utilisateurs){
        res.status(200).json(utilisateurs);
      }else{
        res.status(404).json({msg:"Aucun utilisateur trouvé"});
      }
    })
    .catch (error=> {
      if(!error.statusCode){
        res.status(500).json(error);
      }                
      next(error)
    });    
}
//Pour recuperer un utilisateur 
 exports.getUtilisateur = async(req, res, next) =>{
    Utilisateur.findById(req.params.id)
    .then(utilisateur => {
      if(utilisateur){
        res.status(200).json(utilisateur);
      }else{
        res.status(404).json({msg:"Cet utilisateur n'existe pas"});
      }
    })
    .catch (error=> {
      if(!error.statusCode){
        res.status(500).json(error);
      }                
      next(error)
    });  
  } 

  //Pour recuperer tous les boycotts d'un utilisateur 
 exports.getUtilisateurBoycotts = async(req, res, next) =>{
  UtilisateurBoycottJunction.find({idUtilisateur: req.params.id})
  .then(Junctions => {
    if(Junctions){
      //console.log(Junctions);
      //console.log(Junctions.map(j => j.idBoycott));
      // Map extrait l'id de boycott de la jonction
      // $in sert à filtrer toute les _id qui sont à l'intérieur du tableau d'id;
      boycott.find({ _id : { $in : Junctions.map(j => j.idBoycott)}})
      .then(Boycotts => {
        res.status(200).json(Boycotts);
      })      
    }else{
      res.status(404).json({msg:"Cet utilisateur n'a aucun boycott"});
    }
  })
  .catch (error=> {
    if(!error.statusCode){
      res.status(500).json(error);
    }                
    next(error)
  });  
} 
  
//Pour recuperer un utilisateur//login
exports.getUtilisateurLogin= (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUtilisateur;
    Utilisateur.findOne({ email: email })
      .then(utilisateur => {
        if (!utilisateur) {
          const error = new Error('Utilisateur non trouvé');
          error.statusCode = 401;
          throw error;
        }
        loadedUtilisateur = utilisateur;
        return bcrypt.compare(password, utilisateur.password);
      })
      .then(isEqual => {
        if (!isEqual) {
          const error = new Error('Mot de passe incorrect');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
          {
            email: loadedUtilisateur.email,
            utilisateurId: loadedUtilisateur._id.toString()
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, utilisateurId: loadedUtilisateur._id.toString() });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
//Pour modifier un utilisateur
exports.modifierUtilisateur = async (req, res) =>{
   
  const id = new ObjectID(req.params.id);
  const nPseudo = req.body.pseudo;
  const nEmail = req.body.email;
  const nPassword = req.body.password;
  const nIsAdmin = req.body.isAdmin;

       Utilisateur.updateOne({_id : id},
        {$set : {pseudo : nPseudo, email : nEmail, password : nPassword, isAdmin : nIsAdmin}}
        )
        .then(id =>{
          if(id.modifiedCount == 1){
            res.status(200).json({msg : "Modification réussie"});   
        }else{
            res.status(404).json({msg : "Cet utilisateur n'existe pas"});
        }
        })
        .catch(error =>{
        console.log(error);
        res.status(500).json(error);
         });
  }
//Pour supprimer un utilisateur
exports.supprimerUtilisateur = async (req, res) =>{
    
  const id = new ObjectID(req.params.id);

        Utilisateur.deleteOne({_id : id},)
        .then(id =>{     
          if(id.deletedCount == 1){
            res.status(200).json({msg :"Suppression réussie"}); 
         }else{
      res.status(404).json({msg : "Cet utilisateur n'existe pas"});
         }
         })
        .catch(error =>{
        console.log(error);
        res.status(500).json(error);
      });
  }
 