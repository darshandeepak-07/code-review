const db = require("../../config/db");
const User = require("../../models/user/user");
const { findRole } = require("../../middlewares/authMiddleware");
const { createHash, compareHash } = require("../../middlewares/bcrypt");

//registration
const registerUser = async (request, response) => {
  if (request.body) {
    const registerDate = new Date().toISOString();
    const totalRevision = 0;
    try {
      const hash = await createHash(request.body.password);
      const role = await findRole(request.body.role);
      if (role) {
        request.body.role = role._id;
      }
      request.body.password = hash;
      const user = new User({
        ...request.body,
        registerDate,
        totalRevision,
      });
      await user.save();
      response.send("data saved");
    } catch (error) {
      console.log(error);
      if (error.code === 11000) response.send("user already present");
      else response.send(JSON.stringify(error.message));
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
      const auth = await compareHash(request.body.password, user.password);
      if (auth) {
        response.send("authenticated");
      } else {
        response.status(401).send("user not authenticated");
      }
    } else {
      response.status(404).send("data not received");
    }
  } catch (error) {
    console.log(error);
    response.status(400).send("error in authenticaion");
  }
};

module.exports = {
  registerUser,
  userLogin,
};
