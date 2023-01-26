const request = require("supertest");

module.exports.loginCustomer = async function (server) {
  payload = {
    firstname: "Andrew",
    lastname: "Peterson",
    email: "peterson@gmail.com",
    password: "98762123",
  };
  const response = await request(server).post("/api/users/").send(payload);
  return {
    token: response.headers["x-auth-token"],
    payload,
  };
};
