let mongoose = require("mongoose");

//Admin Schema
 let adminSchema= new mongoose.Schema({

    _id:Number,
    UserName:{type:String, required:true},
    Email:{type:String, required:true},
    Password:{type:String, required:true}
 });

 //Mapping
mongoose.model("admin",adminSchema);