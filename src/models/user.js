const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin",'user'],
        default:"user",
    },
    
});


//Export the model
module.exports = mongoose.model('User', userSchema);