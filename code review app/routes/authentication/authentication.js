const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const {
  registerUser,
  userLogin,
} = require("../../controller/authentication/authControl");

router.post("/register", registerUser);

router.post("/login", userLogin);

module.exports = router;
