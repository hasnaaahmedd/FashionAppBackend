//handling admin
let express = require("express");
let adminRouter=express.Router();
let mongoose=require("mongoose");

require("../models/adminModel");
let adminSchema=mongoose.model("admin");

//creating new admin
adminRouter.post("/add",(request,response)=>{

    const adminRequestObject=request.body;
    
    console.log("add admin MW!");
    console.log(adminRequestObject);


    let adminObject= new adminSchema({
        _id:adminRequestObject._id,    
        UserName:adminRequestObject.UserName,
        Email:adminRequestObject.Email,
        Password:adminRequestObject.Password
    });

    adminObject.save()
                .then((data)=>{response.status(201).json({message:"New Admin Added"});})
                .catch((error)=>{response.status(201).json({message:"Cancel Creation"});});

});



module.exports=adminRouter;