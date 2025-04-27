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
    origin: "http://localhost:5173",  // ✅ Replace with your frontend URL
    credentials: true  // ✅ Allow cookies and credentials
  }))

// app.use(cors({
//   origin: "*",  // Allows all origins (for development purposes)
//   credentials: true,
// }));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users",users);
app.use("/products",products);
app.use("/owners",owners);


app.listen(3000);

// app.listen(3000, '0.0.0.0', () => {
//   console.log("Server is running on http://0.0.0.0:3000");
// });
