const mongoose = require("mongoose");
const auth = require("../../../middleware/auth");
const { User } = require("../../../models/user");

describe("auth middleware", () => {
  it("should populate req.user with the payload of a valid JWT", () => {
    const user = { _id: mongoose.Types.ObjectId() };
    const token = new User(user).generateAuthToken();

    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toBeDefined();
    expect(req.user).toMatchObject(user);
  });

  it("should return 401 if the token is not provided", () => {
    const req = {
      header: jest.fn().mockReturnValue(),
    };
    const res = {
      status: jest.fn(function () {
        this.status = 401;
        return this;
      }),
      send: jest.fn().mockReturnValue(),
    };
    const next = jest.fn();

    auth(req, res, next);
    expect(res.status).toBe(401);
  });

  it("should return 400 if the token is invalid", () => {
    const token = "a";
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {
      status: jest.fn(function () {
        this.status = 400;
        return this;
      }),
      send: jest.fn().mockReturnValue(),
    };
    const next = jest.fn();

    auth(req, res, next);
    expect(res.status).toBe(400);
  });
});
