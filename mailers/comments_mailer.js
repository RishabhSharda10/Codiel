const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment) => {


let htmlString = nodeMailer.renderTemplate({comment:comment},'comments/new_comments.ejs');
console.log(comment);

 nodeMailer.transporter.sendMail({
    from: 'rishab.sharda06@gmail.com', // sender address
    to: comment.user.email, // list of receivers
    subject: "New Comment Published", // Subject line
    html: htmlString, // html body
  },
  (err,info)=>{

if (err){

console.log("Error in sending mail",err);
return;
}

console.log('message sent',info);
return;
  
}
  
  );


}