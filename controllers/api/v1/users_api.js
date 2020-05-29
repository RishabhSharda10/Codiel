const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/enviroment');


module.exports.createSession = async function(req,res){

    
        
let user = await User.findOne({email:req.body.email}); 
   
    if (!user ||  user.password != req.body.password ){

    return res.json(422,{
        message:"Invalid username or password"
        });
        
    }

    return res.json(200,{
        message:"sign in successfully, here is your user",
        data:{
            token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:'100000'})

        }
        });


    
}
    

