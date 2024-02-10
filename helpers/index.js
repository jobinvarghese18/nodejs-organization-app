const faker = require("faker");
const bcrypt = require("bcryptjs");
const setPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
const generateFakeUsers = (count) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    const password = faker.internet.password();
    // console.log("Password >>>", password);
    const user = {
      username: faker.internet.userName(),
      role: "user",
      organization: "65c53ab9b555c6a0535f2ad7",
      password: setPassword(password),
    };
    users.push(user);
  }
  //   console.log("Users >>>", users);
  return users;
};

module.exports = { setPassword, generateFakeUsers };
