const Utilisateur = require("../model/utilisateur");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const client = require("./");
const { ObjectID } = require("bson");

//Pour ajouter un utilisateur //signup
 exports.ajouterUtilisateur = async (req, res, next) => {
       
           const pseudo = req.body.pseudo;
           const email = req.body.email; 
           const password = req.body.password;
           const isAdmin =  req.body.isAdmin;
            
      bcrypt
        password.hash(12)
        .then(hashedPw => {
            const utilisateur = new Utilisateur({
              email: email,
              password: hashedPw,
              pseudo: pseudo
            });
        
        utilisateur.save()
        .then(result => {
            res.status(201).json({ 
              message: 'Utilisateur créé !', 
              utilisateurId: result._id 
            });           
        })
        .catch (error=> {
        console.log(error);
        res.status(500).json(error);
    },
    next(error)
);},
//Pour recuperer tous les utilisateurs
exports.getTousUtilisateurs = async(req, res, next) =>{
    try{
      let cursor = Utilisateur.env().collection("utilisateurs").find();
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
    next(error)
},
//Pour recuperer un utilisateur 
/* exports.getUtilisateur = async(req, res, next) =>{
    try{
      let id = new ObjectID(req.params.id);  
      let cursor = utilisateur.env().collection("utilisateurs").findOne({_id : id});
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
    next(error) 
},*/
//Pour recuperer un utilisateur//login
exports.getUtilisateur = (req, res, next) => {
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
  },
//Pour modifier un utilisateur
exports.modifierUtilisateur = async (req, res) =>{
    try{
        let id = new ObjectID(req.params.id);
        let nPseudo = req.body.pseudo;
        let nEmail = req.body.email;
        let nPassword = req.body.password;
        let nIsAdmin = req.body.isAdmin;

        let result = await client
        .env()
        .collection("utilisateurs")
        .updateOne({_id : id},
        {$set : {pseudo : nPseudo, email : nEmail, password : nPassword, isAdmin : nIsAdmin}}
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
    next(error)
},
//Pour supprimer un utilisateur
exports.supprimerUtilisateur = async (req, res) =>{
    try{
        let id = new ObjectID(req.params.id);

        let result = await client
        .env()
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
        res.status(500).json(error)}

    })
 }
