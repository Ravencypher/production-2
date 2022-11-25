verifyUser = (req, res, next) => {
    Utilisateur.findOne({
      confirmationCode: req.params.confirmationCode,
    })
      .then((utilisateur) => {
        if (!utilisateur) {
          return res.status(404).send({ message: "Utilisateur non trouvé." });
        }
  
        utilisateur.status = "Active";
        utilisateur.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
      })
      .catch((e) => console.log("erreur", e));
  };