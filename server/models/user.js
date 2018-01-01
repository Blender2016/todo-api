const mongoose = require("mongoose");
var User = mongoose.model('User',{
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    }
});

module.exports={User};