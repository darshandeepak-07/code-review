const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const {
  registerUser,
  userLogin,
} = require("../../controller/authentication/authControl");

router.post("/register", registerUser);

router.post("/login", userLogin);

module.exports = router;
