const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const user = process.env.MAIL_AUTH_USER;
const pass = process.env.MAIL_AUTH_PASS;
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const mail_sender = process.env.MAIL_SENDER;

var transport = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: user,
    pass: pass
  },
});

module.exports.sendEmail = (pseudo, email, confirmationUrl)=> {
    transport.sendMail({
        from: mail_sender,
        to: email,
        subject: "Bienvenue sur les boycotts d'ADN",
         html: `<h1>Merci de confirmer votre courriel</h1>
              <h2>${pseudo}</h2>
              <p>Merci de confirmer votre courriel en cliquant sur le lien ci-dessous ou en le copiant dans votre navigateur</p>
              <a href=${confirmationUrl}>${confirmationUrl}</a>` 
    })
    .catch(err => console.log(err))
}