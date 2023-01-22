const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models/user");

let server;
let token;
describe("api/users", () => {
  beforeAll(() => {
    server = require("../../index");
    token = new User().generateAuthToken();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("GET /", () => {
    it("should return user details if logged in", async () => {
      const payload = {
        firstname: "Andrew",
        lastname: "Peterson",
        email: "andrew1@gmail.com",
        password: "12345678",
      };
      const response1 = await request(server).post("/api/users/").send(payload);

      const response2 = await request(server)
        .get("/api/users/")
        .set("x-auth-token", response1.headers["x-auth-token"]);

      expect(response2.status).toBe(200);
      expect(response2.body).toMatchObject({
        firstname: "Andrew",
        lastname: "Peterson",
        email: "andrew1@gmail.com",
      });
    });
  });

  describe("POST /", () => {
    it("should return 400 if user is already registered", async () => {
      const payload = {
        firstname: "Andrew",
        lastname: "Peterson",
        email: "andrew@gmail.com",
        password: "12345678",
      };
      const user = await new User(payload).save();

      const response = await request(server).post("/api/users/").send(payload);
      expect(response.status).toBe(400);
    });

    it("should return a jwt token when a user is succefully registered", async () => {
      const payload = {
        firstname: "Andrew",
        lastname: "Peterson",
        email: "andrew1@gmail.com",
        password: "12345678",
      };
      const response = await request(server).post("/api/users/").send(payload);
      expect(response.status).toBe(200);
      expect(response.header).toHaveProperty("x-auth-token");
    });

    it("should save the user when the payload is valid", async () => {
      const payload = {
        firstname: "Andrew",
        lastname: "Peterson",
        email: "andrew1@gmail.com",
        password: "12345678",
      };
      await request(server).post("/api/users/").send(payload);

      const user = await User.findOne({ email: payload.email });

      expect(user).not.toBeNull();
    });

    it("should save the user with encrypted password when the payload is valid", async () => {
      const payload = {
        firstname: "Andrew",
        lastname: "Peterson",
        email: "andrew1@gmail.com",
        password: "12345678",
      };
      await request(server).post("/api/users/").send(payload);

      const user = await User.findOne({ email: payload.email });

      expect(user.password).not.toBeNull();
    });
  });
});
