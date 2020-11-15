//handling category requests
let express = require("express");
let categoryRouter=express.Router();
let mongoose=require("mongoose");

require('../models/categoryModel');
let categorySchema=mongoose.model('category');

//getting all categories
categoryRouter.get("/all",(request,response)=>{

    categorySchema.find({}).then((allcategories)=>{

        console.log(allcategories);
        response.status(201).json({message:"send all categories", cats:allcategories});
    })
    .catch((error)=>{
        response.status(404).json({message:"no categories",cats:[]});
    })
});

//Add Category
categoryRouter.post("/add", (request, response)=>{

    console.log(request.body);
    const categoryRequestObject=request.body;

    let categoryObject = new categorySchema({
        _id: categoryRequestObject._id,
        CategoryName: categoryRequestObject.CategoryName,
        Details: categoryRequestObject.Details
    });

    categoryObject.save()
    .then((data)=>{response.status(201).json({message:"New Category Added"});})
    .catch((error)=>{response.status(201).json({message:"Cancel Category"});});
});

//Delete Category
categoryRouter.delete("/delete/:Id",(request,response)=>{

    categorySchema.deleteOne({_id:request.params.Id})
    .then((data)=>{console.log(data)})
    .catch((error)=>{console.log(error)})

    categorySchema.find({}).then((allcategories)=>{

        console.log(allcategories);
        response.status(201).json({message:"Category deleted", cats:allcategories});
    })
    .catch((error)=>{
        response.status(404).json({message:"cancel delete",cats:[]});
    })
    
});

module.exports=categoryRouter;