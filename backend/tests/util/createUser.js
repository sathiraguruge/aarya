const { User } = require("../../models/user");

async function createUser(firstname, lastname, email, password) {
  const payload = {
    firstname,
    lastname,
    email,
    password,
  };
  const user = await new User(payload).save();
  return user;
}

module.exports.createUser = createUser;
