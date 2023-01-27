const request = require("supertest");
const jwtDecode = require("jwt-decode");

module.exports.createAndLoginCustomer = async function (server) {
  payload = {
    firstname: "Andrew",
    lastname: "Peterson",
    email: "peterson@gmail.com",
    password: "98762123",
  };
  const response = await request(server).post("/api/users/").send(payload);
  const decode = jwtDecode(response.headers["x-auth-token"]);
  return {
    token: response.headers["x-auth-token"],
    payload,
    decode,
  };
};
