let mongoose = require("mongoose");

//Product Schema
let productSchema = new mongoose.Schema({

    _id:Number,
    CategoryId:{type:Number, ref:'category'},
    ProductName:{type:String, required:true},
    Details:{type:String},
    Price:{type:String},
});

//Mapping
mongoose.model("product",productSchema);