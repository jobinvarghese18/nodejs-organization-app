const mongoose = require("mongoose");
const state = { client: null };

exports.connect = async () => {
  try {
    state.client = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connected");
  } catch (err) {
    console.error(err);
  }
};

exports.close = async () => {
  await state.client.close();
  return false;
};
