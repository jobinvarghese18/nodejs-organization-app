const User = require("../models/user");
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

    const newUser = await User.create({
      username,
      password,
      role,
      organization,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.send({ error: true, message: "Internal server error" });
  }
};

module.exports = { signUp };
