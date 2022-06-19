const mongoose= require("mongoose");

var schema= new mongoose.Schema({

name: {

    type: String,
    required: true,
},

email: {

    type: String,
    required: true,
    unique: true,
},

gender: String,
status: String,


})

const Userdb= mongoose.model('userdb',schema);   // userdb= "document name", schema= default structure of document


module.exports= Userdb;