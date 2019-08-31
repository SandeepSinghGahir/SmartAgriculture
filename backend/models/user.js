var mongoose = require('mongoose');

var User = mongoose.model('User',{
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email :{
        type : String
    },
    password : {
        type : String
    },
    role:{
        type:String
    },
    phoneNumber :{
        type:String
    }

},"User");

module.exports = {User};