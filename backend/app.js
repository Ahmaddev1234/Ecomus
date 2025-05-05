const express=require('express');
var cors = require('cors')
const app=express();
const connection=require('./config/db_connection');
const users=require("./routes/userRoutes")
const owners=require("./routes/ownerRoutes")
const products=require("./routes/productRoutes")
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
dotenv.config();


app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true  
  }))



app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users",users);
app.use("/products",products);
app.use("/owners",owners);


app.listen(3000);


