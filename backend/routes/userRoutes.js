const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const usersSchema=require('../models/usersModel');
const productsSchema=require('../models/productsModel')
const {generateToken}=require('../utils/generateToken')
const responseFunction=require('../utils/responseFunction');
const checkAuth=require('../middlewares/isLoggedIn');
const stripe = require("stripe") ("sk_test_51RGNYtFV6iYOcZncsfztzxi99mB9pdssL7sp87GSPWB40gZwYPbXx4RriJfG3EK4JHSPDXjjR96Hy8tx6X1ofV7R00hqPk4plK")



router.post('/signup', (req,res)=>{

    try{
    const {email,password}=req.body;
    
    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
         try{   
            const user=await usersSchema.findOne({email:email});
    if(user){
        return responseFunction(res,400,"User already exists.Please login",null,false);
    }
    else{
        const user=new usersSchema({
            email,
            password:hash,
            role:"user"
        })
        await user.save();
        const token=generateToken(user);
        res.cookie('token',token);
        return responseFunction(res,200,"Signup successfull",user,true);
    }
    }
    catch(err){
        return responseFunction(res,500,"Internal servery error",err,false);
        
    }
        });
    })

}
catch(err){
    return responseFunction(res,500,"Internal server error",err,false);
    
}
    

})


router.post('/login',async(req,res)=>{
    try{
    const {email,password,role}=req.body;
    const user=await usersSchema.findOne({email:email})
    if(!user){
        return responseFunction(res,400,"Wrong email or password",null,false);
    }

    if(user.role!=role){
        return responseFunction(res,400,"Dont have a user with this role",null,false);
    }
    else{
        bcrypt.compare(password, user.password, function(err, result) {
            try{
            if(!result){
                return responseFunction(res,400,"Wrong email or password",null,false);
            }
            else{
                const token=generateToken(user);
                res.cookie('token',token);
                return responseFunction(res,200,"Successfully logged in",user,true);
            }
        }
        catch(err){
            return responseFunction(res,500,"Internal server error",err,false);
            
        }
        });

    }
}
catch(err){
    return responseFunction(res,500,"internal server error",err,false);
}
})

router.post('/logout',checkAuth,(req,res)=>{
    try{
    res.clearCookie('token');
    return responseFunction(res,200,"Logout successful",null,true);
    }
    catch(err){
        return responseFunction(res,500,"Internal server error",null,false);
    }
})

router.get('/cart', checkAuth, async (req, res) => {
    try {
        const userId = req.userid;
        const user = await usersSchema.findOne({ _id: userId });

        if (!user) {
            return responseFunction(res, 400, "User not found", null, false);
        }

        const cartItems = user.cart || [];

        // Get all product details from cart
        const cart = await productsSchema.find({
            _id: { $in: cartItems.map(item => item.productId) }
        });

        // Format the response with product details + cart quantity
        const formattedData = cart.map((product) => {
            const cartItem = cartItems.find(item => item.productId.toString() === product._id.toString());

            return {
                _id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                stock: product.stock,
                discount: product.discount,
                category: product.category,
                quantity: cartItem?.quantity || 1, // Correct quantity from cart
                cartItemId: cartItem?._id, // Optional: include the cart item's _id
                imageUrl: `http://localhost:3000/products/${product._id}/image`
            };
        });

        return responseFunction(res, 200, "Here are your cart items", formattedData, true);

    } catch (error) {
        console.error("Cart error:", error);
        return responseFunction(res, 500, "Internal server error", null, false);
    }
});



router.post("/cart/add", checkAuth, async (req, res) => {
    try {
        const userId = req.userid; // Extract userId from middleware
        const { id, quantity } = req.body;
        if (!id || !quantity) {
            return responseFunction(res, 400, "id or quantity are missing", null, false);
          }

        // Check if product exists
        const product = await productsSchema.findById(id);
        if (!product) {
            return responseFunction(res, 400, "Product not found", null, false);
        }

        // Fetch user from DB
        const user = await usersSchema.findById(userId);
        if (!user) {
            return responseFunction(res, 400, "User not found", null, false);
        }

        // Check if the product is already in the cart
        const existingItem = user.cart.find(item => item.productId.toString() === id);

        if (existingItem) {
            // If product is already in cart, update quantity
            existingItem.quantity += quantity;
        } else {
            // If not, add new product to cart
            user.cart.push({ productId: id, quantity });
        }

        // Save updated cart
        await user.save();

        return responseFunction(res, 200, "Product added to cart", user.cart, true);

    } catch (error) {
        console.error("Error adding to cart:", error);
        return responseFunction(res, 500, "Internal server error", null, false);
    }
});

router.post('/cart/remove', checkAuth, async (req, res) => {
    try {
      const userId = req.userid;
      const { productId } = req.body;
      const user = await usersSchema.findById(userId);
      
      if (!user) {
        return responseFunction(res, 404, "User not found", null, false);
      }
  
      // Find the cart item
      const cartItem = user.cart.find(item => item.productId.toString() === productId);
  
      if (!cartItem) {
        return responseFunction(res, 404, "Item not found in cart", null, false);
      }
  
      // Decrease quantity if more than 1
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        // Optional: If quantity is 1, remove it from cart
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
      }
  
      await user.save();
  
      responseFunction(res, 200, "Quantity updated", user.cart, true);
    } catch (err) {
      console.log(err.message);
      responseFunction(res, 500, "Server error", null, false);
    }
  });


  router.post("/create-checkout",async (req,res)=>{
    const {products,quantity}=req.body;
    const lineItem={
        price_data:{
            currency:"usd",
            product_data:{
                name:products.name
            },
            unit_amount:products.price * 100
        },
        quantity:quantity

    }
    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:[lineItem],
        mode:"payment",
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/cancel"
    })

    res.json({id:session.id})
    
  })
  


module.exports = router;