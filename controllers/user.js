const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Organization = require("../models/organization");
const mongoose = require("mongoose");

signUp = async (req, res) => {
  const { username, password, role, organization } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(organization)) {
      return res
        .status(400)
        .send({ error: true, message: "Invalid organization ID" });
    }
    const organizationExist = await Organization.findOne({ _id: organization });
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send({ error: true, message: "Username already exists" });
    }
    if (!organizationExist) {
      return res
        .status(400)
        .send({ error: true, message: "Organization does not exist" });
    }

    await User.create({
      username,
      password,
      role,
      organization,
    });
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ error: true, message: "Internal server error" });
  }
};

const singIn = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    const token = await jwt.sign({ user }, process.env.JWT_SECRET);
    res.status(200).json({ data: { access_token: token } });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ error: true, message: "Internal server error" });
  }
};

module.exports = { signUp, singIn };
