const mongoose  = require('mongoose');
require('dotenv').config();
const connectionString = process.env.MONGO_CLIENT1;

mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('open', ()=>{
    console.log("Connected to Database")
});

db.on('error',()=>{
    console.log("Error occured while connecting to the database")
});

module.exports = db;