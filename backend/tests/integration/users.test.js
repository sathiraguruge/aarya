const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models/user");
const { createAndLoginCustomer } = require("../util/loginCustomer");

const URL = "/api/users/";
let server;
let payload;
describe("api/users", () => {
  beforeAll(() => {
    server = require("../../index");
    token = new User().generateAuthToken();
    payload = {
      firstname: "Andrew",
      lastname: "Peterson",
      email: "andrew@gmail.com",
      password: "12345678",
    };
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

    it("should return 400 when the payload is invalid", async () => {
      payload = {
        firstname: "",
        lastname: "Peterson",
        email: "andrew@gmail.com",
        password: "12345678",
      };
      const response = await request(server).post(URL).send(payload);
      expect(response.status).toBe(400);
    });
  });

  describe("PUT /:id", () => {
    let loginResponse;
    let updatePayload;
    beforeEach(async () => {
      loginResponse = await createAndLoginCustomer(server);
      updatePayload = {
        firstname: "Andrew",
        lastname: "Peterson",
        email: "andrew@gmail.com",
        password: "12345678",
      };
    });

    it("should a update user when the payload is valid", async () => {
      const response = await request(server)
        .put(`${URL}${loginResponse.decode._id}`)
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatePayload);
    });

    it("should return 400 when order ID is invalid", async () => {
      const response = await request(server)
        .put(URL + 123)
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(400);
    });

    it("should return 404 when item ID is not found", async () => {
      const response = await request(server)
        .put(URL + mongoose.Types.ObjectId())
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(404);
    });

    it("should return 400 when the upload payload is invalid", async () => {
      updatePayload = {
        firstname: "",
        lastname: "Peterson",
        email: "andrew@gmail.com",
        password: "12345678",
      };
      const response = await request(server)
        .put(`${URL}${loginResponse.decode._id}`)
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(400);
      expect(response.text).not.toBeNull();
    });
  });

  describe("DELETE /:id", () => {
    let loginResponse;
    beforeEach(async () => {
      loginResponse = await createAndLoginCustomer(server);
    });

    it("should delete a user when the id is valid", async () => {
      const response = await request(server)
        .delete(`${URL}${loginResponse.decode._id}`)
        .set("x-auth-token", loginResponse.token);
      expect(response.status).toBe(200);
    });

    it("should return 400 when user ID is invalid", async () => {
      const response = await request(server)
        .delete(URL + 12)
        .set("x-auth-token", loginResponse.token);
      expect(response.status).toBe(400);
    });

    it("should return 404 when item is not found", async () => {
      const response = await request(server)
        .delete(URL + mongoose.Types.ObjectId())
        .set("x-auth-token", loginResponse.token);
      expect(response.status).toBe(404);
    });
  });
});
