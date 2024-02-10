const { generateFakeUsers } = require("../helpers/index");

module.exports = {
  async up(db, client) {
    try {
      const users = generateFakeUsers(5);
      await db.collection("users").insertMany(users);
    } catch (err) {
      console.error(err);
    }
  },

  async down(db, client) {
    try {
      await db.collection("users").deleteMany({});
    } catch (err) {
      console.error(err);
    }
  },
};
