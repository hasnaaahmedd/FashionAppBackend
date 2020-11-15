//handling product requests
let express = require("express");
let productRouter=express.Router();
let mongoose=require("mongoose");

require('../models/productModel');
require('../models/categoryModel');
let productSchema=mongoose.model('product');
let categorySchema=mongoose.model('category');


//getting all products
productRouter.get("/all",(request,response)=>{

    productSchema.find({}).then((allproducts)=>{

        console.log(allproducts);
        response.status(201).json({message:"send products", prods:allproducts});
    })
    .catch((error)=>{
        response.status(404).json({message:"cancel product",prods:[]});
    })
});

//Add product
productRouter.post("/add", (request, response)=>{

    console.log(request.body);
    const productRequestObject=request.body;

    categorySchema.findOne({_id:productRequestObject.CategoryId})
                  .then((data)=>{
                      console.log(data)

                      let productObject = new productSchema({
                        _id: productRequestObject._id,
                        CategoryId:data._id,
                        ProductName: productRequestObject.ProductName,
                        Details: productRequestObject.Details,
                        Price: productRequestObject.Price
                
                    });
                
                    console.log(productObject);

                    //still workin on creating new product
                    productObject.save()
                    .then((data)=>{response.status(201).json({message:"New product Added"});})
                    .catch((error)=>{response.status(201).json({message:"Cancel product"});})
                
                });

});

//Delete product

productRouter.delete("/delete/:Id",(request,response)=>{

    productSchema.deleteOne({_id:request.params.Id})
    .then((data)=>{console.log(data)})
    .catch((error)=>{console.log(error)})

    productSchema.find({}).then((allproducts)=>{

        console.log(allproducts);
        response.status(201).json({message:"product deleted", prods:allproducts});
    })
    .catch((error)=>{
        response.status(404).json({message:"cancel delete",prods:[]});
    })
    
});

module.exports=productRouter;