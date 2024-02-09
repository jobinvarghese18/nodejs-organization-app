const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Roles = ["admin", "user"];

const setPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, set: setPassword },
  role: { type: String, enum: Roles, default: "user" },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
});

module.exports = mongoose.model("User", userSchema);
