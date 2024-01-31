const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, default: uuidv4, required: true, unique: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registerDate: { type: String, required: true },
  totalRevision: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
