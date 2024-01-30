const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const router = express.Router();
const { registerUser, userLogin } = require("./authControl");

router.post("/register", registerUser);

router.post("/login", userLogin);

module.exports = router;
