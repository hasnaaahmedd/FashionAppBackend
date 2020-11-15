//handling login and registration requests

let express = require("express");
let authenticationRouter = express.Router();
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");

require("../models/adminModel");
let adminSchema=mongoose.model("admin");

//test
authenticationRouter.get("/login",(request,response)=>{

    response.send("get login");
    
});

//checking if the username and password exist in db
authenticationRouter.post("/login",(request,response)=>{

    const adminRequestObject=request.body;
    console.log("api post login mw!");
    console.log(adminRequestObject);

    const adminObject= adminSchema.findOne({"UserName":adminRequestObject.UserName})
               .then((object)=>{
                    console.log(object);

                    //generating jason web token and send it to the client
                    let payload = { subject:object._id }
                    let token = jwt.sign(payload,"privatekey");

                    console.log(token);

                    response.status(201).json({admin:object, usertoken:token});
               })
               .catch((error)=>{
                   
                   console.log(error);
                   response.status(201).json({admin:null, usertoken:null});

                });
});

module.exports=authenticationRouter;