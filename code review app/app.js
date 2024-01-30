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