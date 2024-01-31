const mongoose = require("mongoose");

//role schema
const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
});

//model
const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
