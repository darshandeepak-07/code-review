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
