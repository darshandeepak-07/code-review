const db = require("../../config/db");
const User = require("../../model/user/User");
const bcrypt = require("bcrypt");

//for creating hash
const createHash = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

//registration
const registerUser = async (request, response) => {
  if (request.body) {
    const registerDate = new Date().toISOString();
    const totalRevision = 0;
    try {
      const hash = await createHash(request.body.password);
      request.body.password = hash;
      const user = new User({
        ...request.body,
        registerDate,
        totalRevision,
      });
      await user.save();
      response.send("data saved");
    } catch (error) {
      if (error.code === 11000) response.send("user already present");
      else response.send("not success");
    }
  } else {
    response.status(404).send("data not received");
  }
};

//login
const userLogin = async (request, response) => {
  try {
    if (request.body) {
      const user = await User.findOne({ email: request.body.email });
      console.log(user);
      console.log(user.password);
      const auth = await bcrypt.compare(request.body.password, user.password);
      if (auth) {
        response.send("authenticated");
      } else {
        response.status(400).send("user not authenticated");
      }
    } else {
      response.status(404).send("data not received");
    }
  } catch (error) {
    console.log(error);
    response.status(404).send("error in authenticaion");
  }
};

module.exports = {
  registerUser,
  userLogin,
};
