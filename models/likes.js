const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const LikeSchema = new mongoose.Schema({

user:{

    type:mongoose.Schema.ObjectId,
},

likeable:{

    type:mongoose.Schema.ObjectId,
    required:true,
    refPath: "onModel"
},

onModel:{

type:String,
required:true,
enum:['Post','Comment']
}

},

{

timestamps:true

}

);

const Like = mongoose.model('Like',LikeSchema);

module.exports = Like;