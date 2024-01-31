const db = require("../../config/db");
const User = require("../../models/user/user");
const bcrypt = require("bcrypt");
const Role = require("../../models/role/role");
//for creating hash
const createHash = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const findRole = async (role) => {
  try {
    const data = await Role.findOne({ name: role });
    if (data) {
      return data;
    }
  } catch (error) {
    return error;
  }
};
//registration
const registerUser = async (request, response) => {
  if (request.body) {
    const registerDate = new Date().toISOString();
    const totalRevision = 0;
    try {
      const hash = await createHash(request.body.password);
      const role = await findRole(request.body.role);
      console.log(role);
      if (role) {
        request.body.role = role._id;
      }
      request.body.password = hash;
      console.log(request.body);
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
