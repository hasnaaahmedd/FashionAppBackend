let mongoose = require("mongoose");

//User Schema
let userSchema = new mongoose.Schema({

    _id:Number,
    UserName:{type:String, required:true},
    Email:{type:String, required:true},
    Password:{type:String, required:true}
});

//Mapping
mongoose.model("user",userSchema);