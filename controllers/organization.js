const Organization = require("../models/organization");

const findOrganization = async (req, res) => {
  try {
    const result = await Organization.find();
    return res
      .status(200)
      .send({ message: "Organization data fetch successful", data: result });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: true, message: "Internal server error" });
  }
};

const createOrganization = async (req, res) => {
  try {
    const { name, address } = req.body;
    const organization = new Organization({ name, address });
    const result = await organization.save();
    return res.status(200).send({
      message: "Organization data saved",
      data: { createdAt: result.createdAt },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: true, message: "Internal server error" });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, address } = req.body;
    const result = await Organization.findByIdAndUpdate(
      id,
      { name, address },
      { new: true }
    );
    return res.status(200).send({
      message: "Organization data updated",
      data: { updatedAt: result.updatedAt },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: true, message: "Internal server error" });
  }
};

const removeOrganization = async (req, res) => {
  try {
    const id = req.params.id;
    await Organization.findByIdAndDelete(id);
    return res.status(200).send({ message: "Organization data deleted" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: true, message: "Internal server error" });
  }
};

module.exports = {
  findOrganization,
  createOrganization,
  updateOrganization,
  removeOrganization,
};
