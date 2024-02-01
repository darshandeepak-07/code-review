const express = require("express");
const app = express();
const userRoutes = require("./routes/user/user");
require("dotenv").config();
const authRouter = require("./routes/authentication/authentication");
const adminRoute = require("./routes/admin/admin");
const codeReviewRoute = require("./routes/codereview/codereview");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

//middlwares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(authRouter);
app.use("/users", userRoutes);
app.use("/admin", adminRoute);
app.use("/reviews", codeReviewRoute);

app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log(`server started... ${PORT}`);
});
