const mongoose = require("mongoose");

const Roles = ["admin", "user"];

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, enum: Roles, default: "user" },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
});

module.exports = mongoose.model("User", userSchema);
