const express = require("express");
const app = express();
require("dotenv").config();
const authRouter = require("./routes/authentication/authentication");
const adminRoute = require("./routes/admin/admin");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");

//middlwares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRouter);
app.use("/admin", adminRoute);

app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log("server started...");
});
