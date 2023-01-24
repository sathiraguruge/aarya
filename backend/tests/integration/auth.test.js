const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models/user");

const URL = "/api/login/";
let server;
let payload;
describe("api/login", () => {
  beforeAll(() => {
    server = require("../../index");
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("GET /", () => {
    beforeEach(async () => {
      payload = {
        firstname: "Andrew",
        lastname: "Peterson",
        email: "andrew1@gmail.com",
        password: "12345678",
      };
      await request(server).post("/api/users/").send(payload);
    });

    it("should return 400 when username is invalid", async () => {
      const response = await request(server).post(URL).send({
        email: "",
        password: payload.password,
      });
      expect(response.status).toBe(400);
    });

    it("should return 400 when password is invalid", async () => {
      const response = await request(server).post(URL).send({
        email: payload.email,
        password: "",
      });
      expect(response.status).toBe(400);
    });

    it("should return 200 when user credentials are valid", async () => {
      const response = await request(server).post(URL).send({
        email: payload.email,
        password: payload.password,
      });
      expect(response.status).toBe(200);
      expect(response.header).toHaveProperty("x-auth-token");
    });
  });
});
