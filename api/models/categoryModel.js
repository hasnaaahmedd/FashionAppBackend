let mongoose = require("mongoose");

//Category Schema
let categorySchema = new mongoose.Schema({

    _id:Number,
    CategoryName:{type:String, required:true},
    Details:{type:String, required:true},
    Product:[{type:Number, ref:'product'}]

    // SubCategory:[{type:String, ref:'subcategory'}]
});

//Mapping
mongoose.model("category",categorySchema);