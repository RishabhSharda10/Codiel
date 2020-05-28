const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'rishab.sharda06@gmail.com', // generated gmail user
      pass: 'bloodymonu', // generated gmail password
    },
  });

  let renderTemplate = (data,relativePath) => {

    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){

            if(err){
console.log("error in rendering the template");
return;

            }

mailHTML = template;


        }

         
    )
return mailHTML;

  }



  module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate


  }