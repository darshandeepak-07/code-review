const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
  console.log("connected successfuly");
});
module.exports = db;
