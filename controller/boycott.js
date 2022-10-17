const { Boycott } = require("../model/boycott")
const client = require("../db/connect");
const { ObjectID } = require("bson");

//Pour ajouter un boycott
const ajouterBoycott = async (req, res) => {
    try {
        let boycott = new Boycott(
            req.body.titre,
            req.body.img, 
            req.body.resume,
            req.body.description
        );

        let result = await client
        .bd()
        .collection("boycott")
        .insertOne(boycott);//retourne la valeur dans la variable result

        res.status(200).json(result);//format jason

    }catch (error) {
        console.log(error);
        res.status(500).json(error);

    }
};

module.exports = {ajouterBoycott};