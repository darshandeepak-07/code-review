const db = require("../../config/db");
const User = require("../../models/user/user");
const bcrypt = require("bcrypt");
const Role = require("../../models/role/role");
const { json } = require("body-parser");

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
    } else {
      const newData = await createRole(role);
      return newData;
    }
  } catch (error) {
    return error;
  }
};

const createRole = async (roleName) => {
  let description = "";
  try {
    if (roleName === "admin") {
      description =
        "im a admin and i have all the master controls over the application";
    } else if (roleName === "submitter") {
      description = "im a submitter i submit my code for review.";
    } else if (roleName === "reviewer") {
      description =
        " im a reviewer i review the codes submitted by the submitter, and i add comments.";
    } else {
      return new Error("invalid role");
    }
    const role = new Role({ name: roleName, description });
    const data = await role.save();
    return data;
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
