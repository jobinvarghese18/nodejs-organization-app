const Organization = require("../models/organization");
const Joi = require("joi");
const mongoose = require("mongoose");
const createOrganizationSchema = Joi.object({
  name: Joi.string().required().description("Organization name"),
  address: Joi.string().required().description("Organization address"),
});

const updateOrganizationParams = Joi.object({
  id: Joi.string().required().description("Organization id"),
});

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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ error: true, message: "Invalid organization ID" });
    }
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
    const id = mongoose.Types.ObjectId(req.params.id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ error: true, message: "Invalid organization ID" });
    }
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
  createOrganizationSchema,
  updateOrganizationParams,
};
