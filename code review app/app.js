<<<<<<< HEAD
const express = require("express");
const app = express();
const authRouter = require("./routes/authentication/authentication");
require("dotenv").config();
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRouter);
app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log("server started...");
});
=======
const express = require('express');
require('dotenv').config();
const app = express();


// Declaring routes
const userRoutes = require('./routes/users/user')
const authRoutes = require('./routes/authentication/authentication')

app.get('/',(req,res)=>{
    
})
// Using Routes
app.use('/users',userRoutes);



const PORT = process.env.PORT || 8055;
app.listen(PORT,()=>{
    console.log("Server is live on 8000")
})
>>>>>>> 1b61622a3389f3188424136e4fc0ad77ea57e494
