const User = require("../../models/user/user");
const Role = require("../../models/role/role");
const { findRole } = require("../../middlewares/authMiddleware");

const getUsers = async (request, response) => {
  try {
    const userData = await User.find()
      .select([
        "name",
        "role",
        "userId",
        "email",
        "registerDate",
        "totalRevision",
      ])
      .populate("role");
    response.send(userData);
  } catch (error) {
    response.status(404).send("user not found");
  }
};

const editUser = async (request, response) => {
  try {
    const oldRole = await User.findOne({ userId: request.params.id }).select([
      "role",
    ]);
    if (oldRole.role !== request.body.role) {
      const role = await findRole(request.body.role);
      if (role) request.body.role = role._id;
      else throw new Error("no role found");
    }
    const currentUser = await User.findOneAndUpdate(
      { userId: request.params.id },
      { name: request.body.name, role: request.body.role },
      { new: true }
    );
    if (currentUser) {
      response.send("user edited");
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    console.log(error);
    response.status(404).send("user not found");
  }
};

const deleteUser = async (request, response) => {
  try {
    const user = await User.findOneAndDelete({
      userId: request.params.id,
    });
    if (!user) {
      throw new Error("user not found");
    }
    response.send("deleted");
  } catch (error) {
    response.status(404).send("user not found");
  }
};

module.exports = {
  getUsers,
  editUser,
  deleteUser,
};
