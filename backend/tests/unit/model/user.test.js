const { User } = require("../../../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

describe("user.generateAuthToken", () => {
  it("should return a valid jwt web token", () => {
    const userPayload = {
      _id: mongoose.Types.ObjectId(),
      firstname: "Andrew",
      lastname: "Peterson",
      email: "andrew@gmail.com",
    };
    const newUser = new User(userPayload);
    const token = newUser.generateAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    expect(decoded).toMatchObject({ _id: userPayload._id });
  });
});
