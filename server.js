const { response, request } = require("express");
const express = require("express");
const server = express();
const bodyParser=require("body-parser");
let mongoose=require("mongoose");
let jwt = require("jsonwebtoken");

const productRouter = require("./api/routers/productRouter");
const categoryRouter = require("./api/routers/categoryRouter");
const authenticationRouter= require("./api/routers/authenticationRouter");
const adminRouter=require("./api/routers/adminRouter");



//connect to database
mongoose.connect("mongodb://localhost:27017/fashionDB",{useNewUrlParser:true,useUnifiedTopology:true})
                .then(()=>{console.log("database connected");})
                .catch((error)=>{console.log(error+"");});

//settings
server.use(bodyParser.json());
//server.use(express.urlencoded({extended:false})); // parseing http body




//cors issue
server.use((request,response,next)=>{

    console.log("set headers");

    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    response.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, DELETE, PATCH"
        );    

        next();
});

//verfying a token function
function authenticateToken(request,response,next){

    console.log("authenticateToken");
    
    const token = request.headers.authorization.split(" ")[1];
    
    console.log(token);

    if(token == 'null'){
        return response.status(401).send("unauthorized request");

    }

    jwt.verify(token,"privatekey",(error,user)=>{
        if(error){
        return response.status(403).send("not allowed request");

        }
        request.user=user;
        next();
    });
}

//Request definition MiddleWare for testing
server.use("/home",(request,response,next)=>{

    response.send("home");
    console.log(request.url,request.method);
    next();
});

//Authentication MiddleWare
server.use(authenticationRouter);

//Admin Access
server.use("/admin",authenticateToken,adminRouter);

//Category Access
server.use("/category",categoryRouter);

//Product Access
server.use("/product",productRouter);




let port = process.env.port || 3030
server.listen(port, ()=>{

    console.log("IM LISTENING ON "+port);
});