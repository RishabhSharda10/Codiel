module.exports.home = function(req,res){


    console.log(req.cookies);

    var contactlist = [
        {
            name:'Rishabh',
            phone:'999999999'
        },
        {
            name:'Rishu',
            phone:'555555555'
        
        
        }
            
        ];


 return  res.render('home',{
title:"Oye kake pra",
contact_Lists:contactlist


 });

}

