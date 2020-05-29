const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname,'../production_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('acesss.log',{

interval:'1d',
path:logDirectory

});

const development = {

    name:'development',
    asset_path:'assets',
    session_cookie_key:"blahsomething",
    db:'codiel_development',
    smtp:{
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'rishab.sharda06@gmail.com', // generated gmail user
      pass: 'bloodymonu', // generated gmail password
            }
        },
        google_client_id:'430938549612-8jgilqm01hu0ingj4hqfcq1v7p8gptrl.apps.googleusercontent.com',
        google_client_secret:'QDE2Qe3OL-Xt0W04dFAQz9Cs',
        google_call_back_url:"http://localhost:8000/user/auth/google/callback",
        jwt_secret:"codiel",
        morgan:{
          mode:'dev',
          options:{stream:accessLogStream}
        }


}

const production = {

    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:"KK93HCrh6gOxXoGvUg01a74wyvU5OqKZ",
    db:'codiel_production',
    smtp:{
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'rishab.sharda06@gmail.com', // generated gmail user
      pass: 'bloodymonu', // generated gmail password
            }
        },
        google_client_id:'430938549612-8jgilqm01hu0ingj4hqfcq1v7p8gptrl.apps.googleusercontent.com',
        google_client_secret:'QDE2Qe3OL-Xt0W04dFAQz9Cs',
        google_call_back_url:"http://localhost:8000/user/auth/google/callback",
        jwt_secret:"dXBCV3bJuGkRcMwxDJIxzO8tdU8hTNtJ",
        morgan:{
          mode:'combined',
          options:{stream:accessLogStream}
        }   

}

  //module.exports = eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT)
 module.exports = development;