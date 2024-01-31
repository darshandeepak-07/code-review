const Role = require("../models/role/role");
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

module.exports = {
  createRole,
  findRole,
};
