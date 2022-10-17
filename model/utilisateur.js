class Utilisateur{
    _id
    constructor(pseudo, email, password, isAdmin){
        this.pseudo = pseudo;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}
module.exports = {Utilisateur}