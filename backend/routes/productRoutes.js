const express = require("express");
const router = express.Router();
const productsSchema = require("../models/productsModel");
const responseFunction = require("../utils/responseFunction");

router.get("/", async (req, res) => {
    try {
        const data = await productsSchema.find({});

        // ✅ Convert binary image data to a URL
        const formattedData = data.map((product) => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            discount: product.discount,
            category: product.category,
            imageUrl: `http://localhost:3000/products/${product._id}/image` // ✅ New image URL
        }));

        return responseFunction(res, 200, "Data is fetched", formattedData, true);
    } catch (err) {
        return responseFunction(res, 400, "Internal server error", null, false);
    }
});

// ✅ Add Route to Serve Image
router.get("/:id/image", async (req, res) => {
    try {
        const product = await productsSchema.findById(req.params.id);

        if (!product || !product.file || !product.file.data) {
            return res.status(404).json({ error: "Image not found" });
        }

        res.set("Content-Type", product.file.contentType); // ✅ Set correct image type
        return res.send(product.file.data); // ✅ Send binary image data
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



router.get('/checkout/:id',async(req,res)=>{
    try{
    const product=await productsSchema.findOne({_id:req.params.id});
    const formattedData={
        _id:product._id,
        name: product.name,
        price: product.price,
        description: product.description,                                
        stock: product.stock,
        discount: product.discount,
        category: product.category,
        imgUrl:`http://localhost:3000/products/${product._id}/image`
    }
    return responseFunction(res,200,"Here is your product",formattedData,true)
    }
    catch{
       return responseFunction(res,500,"Internal server error",null,false);
    }
})


router.get("/categories/:id", async (req, res) => {
    try {
        const Category=req.params.id
        const category=Category.toLowerCase();
        const data = await productsSchema.find({category});

        // ✅ Convert binary image data to a URL
        const formattedData = data.map((product) => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            discount: product.discount,
            category: product.category,
            imageUrl: `http://localhost:3000/products/${product._id}/image` // ✅ New image URL
        }));

        return responseFunction(res, 200, "Data is fetched", formattedData, true);
    } catch (err) {
        return responseFunction(res, 400, "Internal server error", null, false);
    }
});

module.exports = router;
