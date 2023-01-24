const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models/user");

const URL = "/api/users/";
let server;
let token;
let payload;
describe("api/users", () => {
  beforeAll(() => {
    server = require("../../index");
    token = new User().generateAuthToken();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });
  beforeEach(async () => {
    payload = {
      firstname: "Andrew",
      lastname: "Peterson",
      email: "andrew@gmail.com",
      password: "12345678",
    };
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("GET /", () => {
    it("should return user details if logged in", async () => {
      const { firstname, lastname, email } = payload;
      const response1 = await request(server).post(URL).send(payload);
      const response2 = await request(server)
        .get(URL)
        .set("x-auth-token", response1.headers["x-auth-token"]);

      expect(response2.status).toBe(200);
      expect(response2.body).toMatchObject({
        firstname,
        lastname,
        email,
      });
    });
  });

  describe("POST /", () => {
    it("should return 400 if user is already registered", async () => {
      const user = await new User(payload).save();
      const response = await request(server).post(URL).send(payload);
      expect(response.status).toBe(400);
    });

    it("should return a jwt token when a user is succefully registered", async () => {
      const response = await request(server).post(URL).send(payload);
      expect(response.status).toBe(200);
      expect(response.header).toHaveProperty("x-auth-token");
    });

    it("should save the user when the payload is valid", async () => {
      await request(server).post(URL).send(payload);
      const user = await User.findOne({ email: payload.email });
      expect(user).not.toBeNull();
    });

    it("should save the user with encrypted password when the payload is valid", async () => {
      await request(server).post(URL).send(payload);
      const user = await User.findOne({ email: payload.email });
      expect(user.password).not.toBeNull();
    });
  });
});
